import React from 'react';
import Label from '@/components/atoms/Label';
import Select from '@/components/atoms/Select';
import { UseFormRegisterReturn } from 'react-hook-form';

interface LabeledSelectProps {
  label: string;
  children: React.ReactNode;
  register: UseFormRegisterReturn;
  errors?: string | undefined;
  className?: string;
}

const LabeledSelect: React.FC<LabeledSelectProps> = ({ label, children, register, errors, className }) => {
  return (
    <div className={className}>
      <Label htmlFor={register.name}>{label}</Label>
      <Select register={register}>{children}</Select>
      {typeof errors === 'string' && <p className="text-red-500 text-xs italic">{errors}</p>}
    </div>
  );
};

export default LabeledSelect;
