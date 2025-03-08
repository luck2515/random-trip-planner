import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  closeOnOverlayClick = true,
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* オーバーレイ */}
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* モーダル本体 */}
      <div
        ref={modalRef}
        className={`relative z-50 w-full max-w-lg mx-4 bg-white dark:bg-dark-bg-secondary rounded-lg shadow-xl transition-all ${className}`}
        role="document"
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-border">
          <div>
            <h2
              id="modal-title"
              className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors"
            aria-label="閉じる"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-dark-text-secondary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* コンテンツ */}
        <div className="p-6 text-gray-900 dark:text-dark-text-primary">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
