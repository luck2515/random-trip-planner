import React from 'react';
import Label from '@/components/atoms/Label';
import Select from '@/components/atoms/Select';
import { UseFormRegisterReturn } from 'react-hook-form';

interface LabeledSelectProps {
  label: string;
  children: React.ReactNode;
  register: UseFormRegisterReturn;
  errors?: any;
  className?: string;
}

const LabeledSelect: React.FC<LabeledSelectProps> = ({ label, children, register, errors, className }) => {
  return (
    <div className={className}>
      <Label htmlFor={register.name}>{label}</Label>
      <Select register={register}>{children}</Select>
      {errors && <p className="text-red-500 text-xs italic">{errors.message}</p>}
    </div>
  );
};

export default LabeledSelect;
