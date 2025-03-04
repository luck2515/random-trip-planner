import React from 'react';
import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';
import { UseFormRegisterReturn } from 'react-hook-form';

interface LabeledInputProps {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  errors?: any;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, placeholder, register, errors }) => {
  return (
    <div>
      <Label htmlFor={register.name}>{label}</Label>
      <Input placeholder={placeholder} register={register} errors={errors} />
    </div>
  );
};

export default LabeledInput;
