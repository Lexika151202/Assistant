import { Outlet } from 'react-router-dom';
import { Sidebar, type SidebarItem } from '../components/shared';

const navItems: SidebarItem[] = [
  { to: '/', label: 'Dashboard' },
  { to: '/bao-cao-cua-toi', label: 'Báo cáo đã nộp của tôi' },
  { to: '/bao-cao-ndt', label: 'Báo cáo NĐT/địa phương nộp' },
  { to: '/mau-bao-cao', label: 'Mẫu báo cáo' },
  { to: '/feature-3', label: 'Quản lý xúc tiến đầu tư' },
  { to: '/feature-33', label: 'Báo cáo định kỳ năm (I.16)' },
  { to: '/feature-34', label: 'Báo cáo năm tài chính (I.17)' },
  { to: '/feature-42', label: 'Tình hình thu hút đầu tư vào KCN' },
  { to: '/feature-52', label: 'Thu hút ĐT XD & KD KCHT trong KKT' },
];

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar items={navItems} />
      <main className="flex-1 min-w-0 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
