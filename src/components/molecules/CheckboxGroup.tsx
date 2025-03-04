import React from 'react';
import Label from '@/components/atoms/Label';
import Checkbox from '@/components/atoms/Checkbox';
import { UseFormRegisterReturn } from 'react-hook-form';

interface CheckboxGroupProps {
  label: string;
  options: string[];
  register: UseFormRegisterReturn;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options, register }) => {
  return (
    <div>
      <Label htmlFor={register.name}>{label}</Label>
      <div className="flex flex-col">
        {options.map((option) => (
          <label key={option}>
            <Checkbox value={option} register={register} />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
