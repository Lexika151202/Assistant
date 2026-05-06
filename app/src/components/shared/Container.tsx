import type { HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ children, className = '', ...rest }: ContainerProps) {
  return (
    <div className={`w-full px-8 pt-8 pb-6 ${className}`} {...rest}>
      {children}
    </div>
  );
}
