import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectProps {
  children: React.ReactNode;
  register: UseFormRegisterReturn;
}

const Select: React.FC<SelectProps> = ({ children, register }) => {
  return (
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register}>
      {children}
    </select>
  );
};

export default Select;
