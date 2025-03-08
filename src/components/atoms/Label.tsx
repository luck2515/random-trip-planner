import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  required = false,
  className = '',
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium ${className}`}
    >
      {children}
      {required && (
        <span className="text-red-500 dark:text-red-400 ml-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
};

export default Label;
