interface RetryProgressProps {
  retryCount: number;
  maxRetries: number;
  nextRetryIn?: number;
}

export default function RetryProgress({ retryCount, maxRetries, nextRetryIn }: RetryProgressProps) {
  return (
    <div 
      role="alert" 
      aria-live="polite" 
      className="text-sm text-gray-600 mt-2"
    >
      <div className="flex items-center justify-start space-x-2">
        <svg
          className="animate-spin h-4 w-4 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>
          通信エラーが発生しました。リトライ中... ({retryCount}/{maxRetries})
          {nextRetryIn !== undefined && (
            <span className="ml-2">
              次のリトライまで {Math.ceil(nextRetryIn / 1000)} 秒
            </span>
          )}
        </span>
      </div>
      <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(retryCount / maxRetries) * 100}%` }}
        />
      </div>
    </div>
  );
}
