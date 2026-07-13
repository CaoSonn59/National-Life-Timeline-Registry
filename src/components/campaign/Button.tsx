import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'red' | 'pink';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClass = variant === 'primary' ? 'registry-btn' : variant === 'red' ? 'registry-btn-red' : 'registry-btn-pink';
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button 
      className={`${baseClass} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
