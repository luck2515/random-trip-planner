import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, disabled }) => {
  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
