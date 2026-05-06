import type { ReactNode } from 'react';

interface HeaderProps {
  title?: string;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
}

export function Header({ title, breadcrumbs, actions }: HeaderProps) {
  return (
    <header className="h-16 px-6 bg-white border-b border-[#e5e7eb] flex items-center justify-between">
      <div className="flex flex-col">
        {breadcrumbs && <div className="text-[12px] text-[#6a7282]">{breadcrumbs}</div>}
        {title && <h1 className="text-[16px] font-semibold text-[#101828]">{title}</h1>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
