import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <nav className="text-[13px] text-[#6a7282] mb-2 flex items-center gap-1 flex-wrap">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className="flex items-center gap-1">
            {idx > 0 && <span className="mx-0.5">/</span>}
            {isLast || !item.to ? (
              <span className={isLast ? 'text-[#0a0a0a]' : ''}>{item.label}</span>
            ) : (
              <span
                className="cursor-pointer hover:text-[#a50000]"
                onClick={() => navigate(item.to!)}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export const featureNames: Record<string, string> = {
  'feature-3': 'Quản lý báo cáo xúc tiến đầu tư',
  'feature-4': 'Biểu tổng hợp xúc tiến đầu tư',
  'feature-5': 'Báo cáo cam kết/thỏa thuận đầu tư',
  'feature-6': 'Báo cáo dự án đầu tư nước ngoài tại Việt Nam',
  'feature-33': 'Báo cáo định kỳ năm tình hình hoạt động dự án đầu tư tại nước ngoài',
  'feature-34': 'Báo cáo tình hình hoạt động đầu tư ra nước ngoài cho năm tài chính',
  'feature-42': 'Tình hình thu hút đầu tư vào khu công nghiệp',
  'feature-52': 'Tình hình thu hút dự án đầu tư xây dựng và kinh doanh kết cấu hạ tầng trong khu kinh tế',
};
