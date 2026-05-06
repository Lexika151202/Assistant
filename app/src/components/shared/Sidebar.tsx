import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export interface SidebarItem {
  to: string;
  label: string;
  icon?: ReactNode;
}

export interface SidebarGroup {
  title?: string;
  items: SidebarItem[];
}

interface SidebarProps {
  groups: SidebarGroup[];
  header?: {
    initials: string;
    title: string;
    subtitle: string;
  };
  footer?: {
    label: string;
    value: string;
  };
}

export function Sidebar({ groups, header, footer }: SidebarProps) {
  return (
    <aside className="w-[320px] shrink-0 h-screen sticky top-0 bg-[#f8f9fa] border-r border-[#e5e7eb] flex flex-col">
      {header && (
        <div className="px-6 pt-6 pb-4 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#a50000] flex items-center justify-center shrink-0">
              <span className="text-white text-[16px] font-semibold leading-6">
                {header.initials}
              </span>
            </div>
            <div className="min-w-0">
              <h1 className="text-[24px] font-semibold leading-9 text-[#101828] truncate">
                {header.title}
              </h1>
              <p className="text-[14px] text-[#4a5565] leading-5">
                {header.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-4 pt-4">
        {groups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-4' : ''}>
            {group.title && (
              <div className="px-4 py-2">
                <span className="text-[14px] font-semibold uppercase tracking-[0.35px] text-[#6a7282]">
                  {group.title}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `flex items-start gap-3 px-4 py-[10px] rounded-[10px] text-[14px] leading-[17.5px] transition-colors ${
                      isActive
                        ? 'bg-[#a50000] text-white'
                        : 'text-[#364153] hover:bg-[#e5e7eb]/50'
                    }`
                  }
                >
                  {item.icon && <span className="shrink-0 mt-[1px]">{item.icon}</span>}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {footer && (
        <div className="px-4 pt-4 pb-4 border-t border-[#e5e7eb]">
          <div className="border border-[#e5e7eb] bg-white rounded-[10px] px-[17px] pt-[13px] pb-3">
            <p className="text-[12px] text-[#4a5565] leading-4">{footer.label}</p>
            <p className="text-[14px] font-semibold text-[#101828] leading-5 mt-1">
              {footer.value}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
