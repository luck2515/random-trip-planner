import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Label from '@/components/atoms/Label';
import Select from '@/components/atoms/Select';

interface Option {
  value: string;
  label: string;
}

interface LabeledSelectProps {
  id: string;
  label: string;
  options: Option[];
  register: UseFormRegisterReturn;
  required?: boolean;
  errors?: string;
  description?: string;
}

const LabeledSelect: React.FC<LabeledSelectProps> = ({
  id,
  label,
  options,
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
        <Select
          id={id}
          options={options}
          register={register}
          errors={errors}
          required={required}
          aria-describedby={descriptionId}
        />
      </div>
    </div>
  );
};

export default LabeledSelect;
