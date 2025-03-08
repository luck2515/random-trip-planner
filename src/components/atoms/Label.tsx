import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  id?: string;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, id, required }) => {
  return (
    <label 
      htmlFor={htmlFor} 
      id={id}
      className="block text-gray-700 text-sm font-bold mb-2"
    >
      {children}
      {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
    </label>
  );
};

export default Label;
