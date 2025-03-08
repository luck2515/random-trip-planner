import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectProps {
  children: React.ReactNode;
  register: UseFormRegisterReturn;
  'aria-describedby'?: string;
  'aria-required'?: boolean;
  'aria-invalid'?: 'true' | 'false';
}

const Select: React.FC<SelectProps> = ({ 
  children, 
  register, 
  'aria-describedby': ariaDescribedby,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid
}) => {
  return (
    <select 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      {...register}
      aria-describedby={ariaDescribedby}
      aria-required={ariaRequired}
      aria-invalid={ariaInvalid}
    >
      {children}
    </select>
  );
};

export default Select;
