import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface CheckboxProps {
  value: string;
  register: UseFormRegisterReturn;
}

const Checkbox: React.FC<CheckboxProps> = ({ value, register }) => {
  return (
    <input type="checkbox" value={value} className="mr-2" {...register} />
  );
};

export default Checkbox;
