import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'number';
  placeholder?: string;
  register: UseFormRegisterReturn;
  errors?: string | undefined;
  id?: string;
  'aria-label'?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ 
  type = 'text',
  placeholder, 
  register, 
  errors,
  id,
  'aria-label': ariaLabel,
  required
}) => {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 
          bg-white dark:bg-dark-bg-secondary 
          text-gray-900 dark:text-dark-text-primary 
          border border-gray-300 dark:border-dark-border 
          rounded-lg
          focus:outline-none focus:ring-2 
          focus:ring-primary dark:focus:ring-primary-dark 
          focus:border-primary dark:focus:border-primary-dark
          transition-colors duration-200
          ${errors ? 'border-red-500 dark:border-red-400' : ''}
        `}
        aria-invalid={errors ? 'true' : 'false'}
        aria-describedby={errors ? errorId : undefined}
        aria-label={ariaLabel}
        aria-required={required}
        {...register}
      />
      {errors && (
        <p 
          id={errorId}
          role="alert"
          className="text-red-500 dark:text-red-400 text-xs mt-1"
        >
          {errors}
        </p>
      )}
    </>
  );
};

export default Input;
