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
  description?: string;
  required?: boolean;
}

const LabeledSelect: React.FC<LabeledSelectProps> = ({ 
  label, 
  children, 
  register, 
  errors, 
  className,
  description,
  required 
}) => {
  const descriptionId = description ? `${register.name}-description` : undefined;
  const errorId = errors ? `${register.name}-error` : undefined;

  return (
    <div className={className}>
      <Label htmlFor={register.name} required={required}>{label}</Label>
      {description && (
        <p 
          id={descriptionId} 
          className="text-sm text-gray-600 mt-1 mb-2"
        >
          {description}
        </p>
      )}
      <Select 
        register={register} 
        aria-describedby={`${descriptionId || ''} ${errorId || ''}`}
        aria-required={required}
        aria-invalid={errors ? 'true' : 'false'}
      >
        {children}
      </Select>
      {typeof errors === 'string' && (
        <p 
          id={errorId}
          className="text-red-500 text-xs italic" 
          role="alert"
        >
          {errors}
        </p>
      )}
    </div>
  );
};

export default LabeledSelect;
