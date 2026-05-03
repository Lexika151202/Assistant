import type { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ required, className = '', children, ...rest }: LabelProps) {
  return (
    <label className={`text-[14px] font-medium text-[#364153] ${className}`} {...rest}>
      {children}
      {required && <span className="text-[#c10007] ml-0.5">*</span>}
    </label>
  );
}
