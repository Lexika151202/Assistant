import type { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function Checkbox({ label, className = '', id, ...rest }: CheckboxProps) {
  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded-[4px] border border-[#e5e7eb] accent-[#a50000]"
        {...rest}
      />
      {label && <span className="text-[14px] text-[#364153]">{label}</span>}
    </label>
  );
}
