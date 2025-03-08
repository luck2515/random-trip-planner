import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';

interface LabeledInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'number';
  placeholder?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
  errors?: string;
  description?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  required,
  errors,
  description,
}) => {
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className="mb-4">
      <Label
        htmlFor={id}
        required={required}
        className="text-gray-900 dark:text-dark-text-primary"
      >
        {label}
      </Label>
      {description && (
        <p
          id={descriptionId}
          className="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary"
        >
          {description}
        </p>
      )}
      <div className="mt-2">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          register={register}
          errors={errors}
          required={required}
          aria-describedby={descriptionId}
        />
      </div>
    </div>
  );
};

export default LabeledInput;
