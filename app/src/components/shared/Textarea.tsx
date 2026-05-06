import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function Textarea({ invalid, className = '', ...rest }: TextareaProps) {
  const borderCls = invalid ? 'border-[#ffc9c9]' : 'border-[#e5e7eb]';
  return (
    <textarea
      className={`w-full min-h-24 bg-white rounded-[8px] border ${borderCls} px-3 py-2 text-[14px] text-[#0a0a0a] placeholder:text-[#717182] outline-none focus:ring-2 focus:ring-[#bedbff] ${className}`}
      {...rest}
    />
  );
}
