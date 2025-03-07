/**
 * リトライの設定インターフェース
 */
interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  factor: number;
}

/**
 * フェッチのオプションインターフェース
 */
interface FetchWithRetryOptions {
  retryConfig?: Partial<RetryConfig>;
  onRetry?: (retryCount: number, error: Error) => void;
  init?: RequestInit;
}

/**
 * デフォルトのリトライ設定
 */
const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelay: 1000, // 1秒
  maxDelay: 5000,     // 5秒
  factor: 2,
};

/**
 * 指定時間待機する
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * エクスポネンシャルバックオフの待機時間を計算
 */
const calculateBackoff = (retryCount: number, config: RetryConfig): number => {
  const exponentialDelay = config.initialDelay * Math.pow(config.factor, retryCount);
  return Math.min(exponentialDelay, config.maxDelay);
};

/**
 * リトライ可能なエラーかどうかを判定
 */
const isRetryableError = (error: unknown): boolean => {
  if (error instanceof Error) {
    // ネットワークエラー
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      return true;
    }
    // タイムアウトエラー
    if (error.name === 'TimeoutError' || error.message.includes('timeout')) {
      return true;
    }
    // その他のネットワーク関連エラー
    if (error.message.includes('network') || error.message.includes('connection')) {
      return true;
    }
  }
  return false;
};

/**
 * リトライ可能なステータスコードかどうかを判定
 */
const isRetryableStatus = (status: number): boolean => {
  return (
    status === 408 || // Request Timeout
    status === 429 || // Too Many Requests
    status === 500 || // Internal Server Error
    status === 502 || // Bad Gateway
    status === 503 || // Service Unavailable
    status === 504    // Gateway Timeout
  );
};

/**
 * リトライ機能付きのfetch
 */
export async function fetchWithRetry(
  url: string,
  options: FetchWithRetryOptions = {}
): Promise<Response> {
  const { init = {} } = options;
  const config: RetryConfig = {
    ...DEFAULT_RETRY_CONFIG,
    ...options.retryConfig,
  };

  let lastError: unknown;
  
  for (let retryCount = 0; retryCount <= config.maxRetries; retryCount++) {
    try {
      const response = await fetch(url, init);
      
      if (!response.ok) {
        if (!isRetryableStatus(response.status) || retryCount === config.maxRetries) {
          return response;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      lastError = error;
      
      if (!isRetryableError(error) || retryCount === config.maxRetries) {
        throw error;
      }

      // リトライコールバックの呼び出し
      options.onRetry?.(retryCount + 1, error instanceof Error ? error : new Error(String(error)));

      // 待機時間の計算と待機
      const backoffDelay = calculateBackoff(retryCount, config);
      await delay(backoffDelay);
    }
  }

  throw lastError;
}

/**
 * APIクライアントの設定インターフェース
 */
interface ApiClientConfig {
  baseUrl?: string;
  retryConfig?: Partial<RetryConfig>;
  onRetry?: (retryCount: number, error: Error) => void;
}

/**
 * APIレスポンスの型
 */
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code: string;
  };
}

/**
 * APIクライアント
 */
export class ApiClient {
  private baseUrl: string;
  private retryConfig: Partial<RetryConfig>;
  private onRetry?: (retryCount: number, error: Error) => void;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl || '';
    this.retryConfig = config.retryConfig || {};
    this.onRetry = config.onRetry;
  }

  /**
   * POSTリクエストを送信
   */
  async post<T>(
    path: string, 
    data: unknown, 
    options: {
      init?: RequestInit;
      onRetry?: (retryCount: number, error: Error) => void;
    } = {}
  ): Promise<ApiResponse<T>> {
    const url = this.baseUrl + path;
    try {
      const response = await fetchWithRetry(url, {
        init: {
          ...options.init,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...options.init?.headers,
          },
          body: JSON.stringify(data),
        },
        retryConfig: this.retryConfig,
        onRetry: options.onRetry || this.onRetry,
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          error: {
            message: responseData.message || 'エラーが発生しました',
            code: responseData.code || 'UNKNOWN_ERROR',
          },
        };
      }

      return { data: responseData };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'エラーが発生しました',
          code: 'NETWORK_ERROR',
        },
      };
    }
  }
}

/**
 * APIクライアントのインスタンスを作成
 */
export const apiClient = new ApiClient({
  retryConfig: {
    maxRetries: 2,
    initialDelay: 1000,
    maxDelay: 3000,
  },
});
