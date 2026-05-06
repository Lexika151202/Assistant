import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  invalid?: boolean;
}

export function Input({ leftIcon, rightIcon, invalid, className = '', ...rest }: InputProps) {
  const borderCls = invalid ? 'border-[#ffc9c9]' : 'border-[#e5e7eb]';
  return (
    <div className={`flex items-center h-10 bg-white rounded-[8px] border ${borderCls} px-3 gap-2 focus-within:ring-2 focus-within:ring-[#bedbff] ${className}`}>
      {leftIcon && <span className="text-[#717182]">{leftIcon}</span>}
      <input
        className="flex-1 bg-transparent outline-none text-[14px] text-[#0a0a0a] placeholder:text-[#717182]"
        {...rest}
      />
      {rightIcon && <span className="text-[#717182]">{rightIcon}</span>}
    </div>
  );
}
