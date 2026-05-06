import { Outlet } from 'react-router-dom';
import { Sidebar, type SidebarGroup } from '../components/shared';

const DocumentIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.333 1.333H4a1.333 1.333 0 0 0-1.333 1.334v10.666A1.333 1.333 0 0 0 4 14.667h8a1.333 1.333 0 0 0 1.333-1.334V5.333l-4-4Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.333 1.333v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const navGroups: SidebarGroup[] = [
  {
    items: [
      { to: '/', label: 'Dashboard' },
      { to: '/feature-2', label: 'Tổng hợp báo cáo theo phân hệ', icon: <DocumentIcon /> },
    ],
  },
];

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar
        groups={navGroups}
        header={{
          initials: 'HC',
          title: 'Hệ thống Báo cáo',
          subtitle: 'Đầu tư Quốc gia',
        }}
        footer={{
          label: 'Đơn vị quản lý',
          value: 'Bộ Kế hoạch và Đầu tư',
        }}
      />
      <main className="flex-1 min-w-0 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
