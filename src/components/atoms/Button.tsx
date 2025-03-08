import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'submit' | 'button' | 'reset';
  'aria-label'?: string;
  'aria-busy'?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  disabled, 
  className, 
  type = 'submit',
  'aria-label': ariaLabel,
  'aria-busy': ariaBusy,
  onClick 
}) => {
  return (
    <button
      type={type}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-busy={ariaBusy}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
