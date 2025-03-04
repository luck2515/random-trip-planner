import React from 'react';
import Label from '@/components/atoms/Label';
import Select from '@/components/atoms/Select';
import { UseFormRegisterReturn } from 'react-hook-form';

interface LabeledSelectProps {
  label: string;
  children: React.ReactNode;
  register: UseFormRegisterReturn;
}

const LabeledSelect: React.FC<LabeledSelectProps> = ({ label, children, register }) => {
  return (
    <div>
      <Label htmlFor={register.name}>{label}</Label>
      <Select register={register}>{children}</Select>
    </div>
  );
};

export default LabeledSelect;
