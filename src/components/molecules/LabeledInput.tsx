import React from 'react';
import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';
import { UseFormRegisterReturn } from 'react-hook-form';

interface LabeledInputProps {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  errors?: string | undefined;
  type?: 'text' | 'email' | 'tel' | 'number';
  required?: boolean;
  description?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  placeholder,
  register,
  errors,
  type = 'text',
  required = false,
  description
}) => {
  const inputId = `${register.name}-input`;
  const labelId = `${register.name}-label`;
  const descriptionId = description ? `${register.name}-description` : undefined;

  return (
    <div role="group" aria-labelledby={labelId}>
      <Label htmlFor={inputId} id={labelId}>
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </Label>
      {description && (
        <p id={descriptionId} className="text-sm text-gray-600 mt-1 mb-2">
          {description}
        </p>
      )}
      <Input
        type={type}
        id={inputId}
        placeholder={placeholder}
        register={register}
        errors={errors}
        required={required}
        aria-describedby={descriptionId}
      />
    </div>
  );
};

export default LabeledInput;
