import type { HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ children, className = '', ...rest }: ContainerProps) {
  return (
    <div className={`w-full px-6 py-6 ${className}`} {...rest}>
      {children}
    </div>
  );
}
