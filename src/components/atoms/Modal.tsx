import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import FocusTrap from 'focus-trap-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  className,
  title,
  description
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useRef(`modal-title-${Math.random().toString(36).substr(2, 9)}`).current;
  const descriptionId = useRef(`modal-description-${Math.random().toString(36).substr(2, 9)}`).current;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // モーダル表示時のスクロール制御とaria-hidden
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // モーダル以外の要素にaria-hiddenを設定
      document.querySelectorAll('body > *:not([role="dialog"])').forEach((el) => {
        if (el instanceof HTMLElement && !el.contains(modalRef.current)) {
          el.setAttribute('aria-hidden', 'true');
          el.setAttribute('inert', '');
        }
      });
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      // aria-hiddenとinertを解除
      document.querySelectorAll('[aria-hidden="true"][inert]').forEach((el) => {
        el.removeAttribute('aria-hidden');
        el.removeAttribute('inert');
      });
    };
  }, [isOpen, onClose]);
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50"
          role="presentation"
        >
          <FocusTrap active={isOpen}>
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
              onClick={onClose}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={description ? descriptionId : undefined}
              ref={modalRef}
            >
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                onClick={(e) => e.stopPropagation()}
                className={`bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-xl w-[95%] sm:w-11/12 max-h-[90vh] overflow-y-auto relative ${className || 'max-w-2xl'}`}
              >
            {/* 閉じるボタン */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="モーダルを閉じる"
            >
              <X size={24} />
            </button>

                {/* タイトルと説明 */}
                {title && <h2 id={titleId} className="text-xl font-bold mb-4">{title}</h2>}
                {description && <p id={descriptionId} className="text-gray-600 mb-4">{description}</p>}

                {/* コンテンツ */}
                <div className="text-gray-800 dark:text-gray-200 mt-4">{children}</div>
              </motion.div>
            </div>
          </FocusTrap>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
