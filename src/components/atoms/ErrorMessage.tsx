import { XCircleIcon } from '@heroicons/react/24/solid';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onClose?: () => void;
}

export default function ErrorMessage({ title = 'エラーが発生しました', message, onClose }: ErrorMessageProps) {
  return (
    <div 
      className="rounded-md bg-red-50 p-4 mb-4 w-full"
      role="alert"
      aria-labelledby="error-title"
      aria-describedby="error-message"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <h3 
            className="text-sm font-medium text-red-800"
            id="error-title"
          >
            {title}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p id="error-message">{message}</p>
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                onClick={onClose}
                aria-label="エラーメッセージを閉じる"
              >
                <XCircleIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
