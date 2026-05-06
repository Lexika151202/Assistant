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
      { to: '/bao-cao-cua-toi', label: 'Báo cáo đã nộp của tôi' },
      { to: '/feature-2', label: 'Tổng hợp báo cáo theo phân hệ', icon: <DocumentIcon /> },
    ],
  },
  {
    title: 'Danh sách báo cáo',
    items: [
      { to: '/bao-cao-ndt', label: '1. Báo cáo NĐT/địa phương nộp', icon: <DocumentIcon /> },
      { to: '/mau-bao-cao', label: '2. Mẫu báo cáo', icon: <DocumentIcon /> },
      { to: '/feature-3', label: '3. Quản lý báo cáo xúc tiến đầu tư', icon: <DocumentIcon /> },
      { to: '/feature-33', label: '4. Báo cáo định kỳ năm tình hình hoạt động dự án đầu tư tại nước ngoài', icon: <DocumentIcon /> },
      { to: '/feature-34', label: '5. Báo cáo tình hình hoạt động đầu tư ra nước ngoài cho năm tài chính', icon: <DocumentIcon /> },
      { to: '/feature-42', label: '6. Tình hình thu hút đầu tư vào khu công nghiệp', icon: <DocumentIcon /> },
      { to: '/feature-52', label: '7. Tình hình thu hút dự án đầu tư xây dựng và kinh doanh kết cấu hạ tầng trong khu kinh tế', icon: <DocumentIcon /> },
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
