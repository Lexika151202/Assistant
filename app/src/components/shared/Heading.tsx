import type { HTMLAttributes, ReactNode } from 'react';

type Level = 1 | 2 | 3 | 4;

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  children: ReactNode;
}

const levelClasses: Record<Level, string> = {
  1: 'text-[30px] leading-[36px] font-bold text-[#101828]',
  2: 'text-[24px] leading-[32px] font-semibold text-[#101828]',
  3: 'text-[18px] leading-[28px] font-semibold text-[#101828]',
  4: 'text-[16px] leading-[24px] font-semibold text-[#101828]',
};

export function Heading({ level = 1, children, className = '', ...rest }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
  return (
    <Tag className={`${levelClasses[level]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function Paragraph({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-[14px] leading-[20px] text-[#4a5565] ${className}`}>{children}</p>;
}
