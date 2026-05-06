import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[#a50000] text-white hover:bg-[#c10007]',
  secondary: 'bg-[#f3f3f5] text-[#0a0a0a] hover:bg-[#e5e7eb]',
  outline: 'bg-white text-[#364153] border border-[#e5e7eb] hover:bg-[#f9fafb]',
  ghost: 'bg-transparent text-[#364153] hover:bg-[#f3f3f5]',
  danger: 'bg-[#fef2f2] text-[#c10007] border border-[#ffc9c9] hover:bg-[#ffc9c9]',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-[12px] rounded-[4px] gap-1.5',
  md: 'h-10 px-4 text-[14px] rounded-[8px] gap-2',
  lg: 'h-12 px-6 text-[16px] rounded-[8px] gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
