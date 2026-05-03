import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export interface SidebarItem {
  to: string;
  label: string;
  icon?: ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  footer?: ReactNode;
}

export function Sidebar({ items, title = 'Cổng đầu tư QG', footer }: SidebarProps) {
  return (
    <aside className="w-[320px] shrink-0 h-screen sticky top-0 bg-white border-r border-[#e5e7eb] flex flex-col">
      <div className="h-16 px-6 flex items-center border-b border-[#e5e7eb]">
        <span className="text-[16px] font-semibold text-[#101828]">{title}</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-[8px] text-[14px] transition-colors ${
                isActive
                  ? 'bg-[#a50000] text-white'
                  : 'text-[#364153] hover:bg-[#f3f3f5]'
              }`
            }
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      {footer && <div className="p-3 border-t border-[#e5e7eb]">{footer}</div>}
    </aside>
  );
}
