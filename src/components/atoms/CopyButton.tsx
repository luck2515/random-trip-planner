"use client";

import React, { useState } from 'react';
import { copyToClipboard } from '@/utils/clipboard';

interface CopyButtonProps {
  /**
   * コピーするテキストの内容
   */
  text: string;
  /**
   * カスタムクラス名
   */
  className?: string;
  /**
   * コピー成功時のコールバック
   */
  onCopySuccess?: () => void;
  /**
   * コピー失敗時のコールバック
   */
  onCopyError?: (error: unknown) => void;
}

/**
 * テキストをクリップボードにコピーするボタンコンポーネント
 */
const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  className,
  onCopySuccess,
  onCopyError
}) => {
  const [copying, setCopying] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      setCopying(true);
      const success = await copyToClipboard(text);
      
      if (success) {
        setCopySuccess(true);
        onCopySuccess?.();
        // 2秒後に成功表示をリセット
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      } else {
        throw new Error('コピーに失敗しました');
      }
    } catch (error) {
      console.error('Copy failed:', error);
      onCopyError?.(error);
    } finally {
      setCopying(false);
    }
  };

  return (
    <button
      className={`w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 ${className}`}
      onClick={handleCopy}
      disabled={copying}
      aria-label={copySuccess ? 'コピーしました' : 'プランをクリップボードにコピー'}
      aria-live="polite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${copySuccess ? 'text-green-400' : 'text-white'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {copySuccess ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        )}
      </svg>
      <span>{copySuccess ? 'コピーしました' : 'コピー'}</span>
    </button>
  );
};

export default CopyButton;
