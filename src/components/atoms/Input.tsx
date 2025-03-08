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
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2 ${errors ? 'border-red-500' : ''}`}
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
          className="text-red-500 text-xs italic mt-1"
        >
          {errors}
        </p>
      )}
    </>
  );
};

export default Input;
