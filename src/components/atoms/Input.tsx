import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
  errors?: string | undefined;
}

const Input: React.FC<InputProps> = ({ placeholder, register, errors }) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
        {...register}
      />
      {errors && <p className="text-red-500 text-xs italic">{errors}</p>}
    </>
  );
};

export default Input;
