// Feature: 2 - Tổng hợp báo cáo theo phân hệ
// Screen: Danh sách báo cáo nhóm theo phân hệ
// Figma Node: 3876:996

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/shared/Container';
import { Input } from '../../components/shared/Input';

// ---- Icons (inline SVG) ----

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 14L10.667 10.667M12 6.667A5.333 5.333 0 1 1 1.333 6.667a5.333 5.333 0 0 1 10.667 0Z"
        stroke="#717182"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon({ rotated }: { rotated?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: 'transform 0.2s', transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.333 1.333H4A1.333 1.333 0 0 0 2.667 2.667v10.666A1.333 1.333 0 0 0 4 14.667h8A1.333 1.333 0 0 0 13.333 13.333V5.333l-4-4Z"
        stroke="#364153"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.333 1.333v4h4" stroke="#364153" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4l4 4-4 4" stroke="#364153" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 4h12M4.667 8h6.666M7.333 12h1.334"
        stroke="#0a0a0a"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---- Data ----

interface ReportItem {
  id: string;
  name: string;
  period?: string;
  path?: string;
  designed?: boolean;
}

interface ModuleGroup {
  id: string;
  name: string;
  code: string;
  reports: ReportItem[];
}

const moduleGroups: ModuleGroup[] = [
  {
    id: 'prom',
    name: 'Xúc tiến đầu tư',
    code: 'PROM',
    reports: [
      {
        id: 'prom-1',
        name: 'Báo cáo kết quả thực hiện chương trình xúc tiến đầu tư',
        path: '/feature-3',
        designed: true,
      },
      {
        id: 'prom-2',
        name: 'Biểu tổng hợp tình hình thực hiện chương trình XTĐT',
        path: '/feature-4',
        designed: true,
      },
      {
        id: 'prom-3',
        name: 'Báo cáo tình hình thực hiện các cam kết/thỏa thuận',
        path: '/feature-5',
        designed: true,
      },
    ],
  },
  {
    id: 'fdi',
    name: 'Đầu tư tại Việt Nam',
    code: 'FDI',
    reports: [
      {
        id: 'fdi-1',
        name: 'Báo cáo trước khi thực hiện dự án đầu tư',
      },
      {
        id: 'fdi-2',
        name: 'Báo cáo tình hình thực hiện dự án đầu tư quý',
      },
      {
        id: 'fdi-3',
        name: 'Báo cáo tổng hợp tình hình đầu tư nước ngoài tại Việt Nam',
      },
      {
        id: 'fdi-4',
        name: 'Báo cáo đánh giá hiệu quả hoạt động dự án FDI',
      },
    ],
  },
  {
    id: 'ddi',
    name: 'Đầu tư trong nước',
    code: 'DDI',
    reports: [
      {
        id: 'ddi-1',
        name: 'Báo cáo tình hình thực hiện dự án đầu tư năm',
        period: 'Năm',
      },
      {
        id: 'ddi-2',
        name: 'Báo cáo kế hoạch đầu tư công trung hạn',
        period: 'Năm',
      },
      {
        id: 'ddi-3',
        name: 'Báo cáo giải ngân vốn đầu tư công',
        period: 'Quý',
      },
    ],
  },
  {
    id: 'odi',
    name: 'Đầu tư ra nước ngoài',
    code: 'ODI',
    reports: [
      {
        id: 'odi-1',
        name: 'Báo cáo định kỳ năm tình hình hoạt động dự án đầu tư tại nước ngoài',
        period: 'Năm',
        path: '/feature-33',
        designed: true,
      },
      {
        id: 'odi-2',
        name: 'Báo cáo tình hình hoạt động đầu tư ra nước ngoài cho năm tài chính',
        period: 'Năm',
        path: '/feature-34',
        designed: true,
      },
      {
        id: 'odi-3',
        name: 'Báo cáo về việc cho tổ chức kinh tế ở nước ngoài vay vốn',
        period: 'Năm',
      },
      {
        id: 'odi-4',
        name: 'Báo cáo đánh giá hiệu quả đầu tư ra nước ngoài',
        period: 'Năm',
      },
    ],
  },
  {
    id: 'ez',
    name: 'Khu kinh tế - Khu công nghiệp',
    code: 'EZ',
    reports: [
      {
        id: 'ez-1',
        name: 'Tình hình thu hút đầu tư vào khu công nghiệp',
        period: 'Quý',
        path: '/feature-42',
        designed: true,
      },
      {
        id: 'ez-2',
        name: 'Báo cáo tổng hợp tình hình phát triển KKT-KCN',
        period: 'Năm',
        path: '/feature-52',
        designed: true,
      },
      {
        id: 'ez-3',
        name: 'Báo cáo hiệu quả kinh tế - xã hội của KKT-KCN',
        period: 'Năm',
      },
    ],
  },
];

// ---- Sub-components ----

interface ModuleCardProps {
  group: ModuleGroup;
  onReportClick: (path: string) => void;
}

function ModuleCard({ group, onReportClick }: ModuleCardProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] overflow-hidden w-full">
      {/* Card header — red background */}
      <div className="bg-[#a50000] px-4 pt-4 pb-0">
        <div className="flex items-center justify-between h-[52px]">
          <div className="flex items-center gap-3">
            <h3 className="text-[18px] leading-[28px] font-bold text-white whitespace-nowrap">
              {group.name}
            </h3>
            <span className="inline-flex items-center px-2 py-[3px] rounded-[4px] text-[12px] font-semibold text-white border border-white/30 whitespace-nowrap">
              {group.code}
            </span>
          </div>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="flex items-center justify-center w-5 h-5 text-white hover:opacity-75 transition-opacity"
            aria-label={collapsed ? 'Mở rộng' : 'Thu gọn'}
          >
            <ChevronDownIcon rotated={!collapsed} />
          </button>
        </div>
      </div>

      {/* Card body — report list */}
      {!collapsed && (
        <div className="border-t border-[#f3f4f6]">
          {group.reports.map((report, idx) => {
            const isLast = idx === group.reports.length - 1;
            const isDesigned = !!report.designed;
            return (
              <button
                key={report.id}
                onClick={() => isDesigned && report.path && onReportClick(report.path)}
                disabled={!isDesigned}
                className={`w-full flex items-center justify-between gap-3 px-4 py-4 text-left transition-colors ${
                  isLast ? '' : 'border-b border-[#f3f4f6]'
                } ${isDesigned ? 'hover:bg-[#fafafa] cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Doc icon */}
                  <div className="flex-shrink-0 w-8 h-8 bg-[#f3f4f6] rounded-[4px] flex items-center justify-center">
                    <DocumentIcon />
                  </div>
                  {/* Text */}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[16px] leading-[24px] font-medium text-[#101828] text-left">
                        {report.name}
                      </p>
                      {isDesigned && (
                        <span className="inline-flex items-center px-[6px] py-[1px] rounded-[4px] text-[11px] font-semibold bg-[#ecfdf3] text-[#027a48] border border-[#a6f4c5] whitespace-nowrap shrink-0">
                          Demo
                        </span>
                      )}
                      {!isDesigned && (
                        <span className="inline-flex items-center px-[6px] py-[1px] rounded-[4px] text-[11px] font-semibold bg-[#f2f4f7] text-[#667085] border border-[#e4e7ec] whitespace-nowrap shrink-0">
                          Chưa thiết kế
                        </span>
                      )}
                    </div>
                    {report.period && (
                      <p className="text-[14px] leading-[20px] text-[#6a7282]">
                        Kỳ báo cáo: {report.period}
                      </p>
                    )}
                  </div>
                </div>
                {/* Chevron right — only for designed */}
                {isDesigned && (
                  <div className="flex-shrink-0 w-8 h-8 bg-[#f3f4f6] rounded-full flex items-center justify-center">
                    <ChevronRightIcon />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---- Main page ----

export default function ReportListByModule() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModule, setFilterModule] = useState<string>('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterDemo, setFilterDemo] = useState(false);

  const filteredGroups = useMemo(() => {
    let groups = moduleGroups;

    // Filter by module
    if (filterModule) {
      groups = groups.filter((g) => g.id === filterModule);
    }

    // Filter by demo (designed only)
    if (filterDemo) {
      groups = groups
        .map((g) => ({
          ...g,
          reports: g.reports.filter((r) => r.designed),
        }))
        .filter((g) => g.reports.length > 0);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      groups = groups
        .map((g) => ({
          ...g,
          reports: g.reports.filter((r) => r.name.toLowerCase().includes(q)),
        }))
        .filter((g) => g.reports.length > 0);
    }

    return groups;
  }, [searchQuery, filterModule, filterDemo]);

  const handleReportClick = (path: string) => {
    navigate(path);
  };

  return (
    <Container>
      <div className="flex flex-col gap-6 py-8 px-8">
        {/* Page heading */}
        <div className="flex flex-col gap-0">
          <h1 className="text-[24px] leading-[32px] font-bold text-[#101828]">
            TỔNG HỢP BÁO CÁO THEO PHÂN HỆ
          </h1>
        </div>

        {/* Search + Filter bar */}
        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] px-5 py-[17px] flex items-center gap-4">
          {/* Search input */}
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm theo tên báo cáo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<SearchIcon />}
              className="bg-[#f3f3f5] border-transparent h-9"
            />
          </div>

          {/* Module filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className="bg-[#f3f3f5] border border-transparent h-9 px-3 rounded-[8px] flex items-center justify-between gap-2 min-w-[200px] hover:bg-[#e9e9ec] transition-colors"
            >
              <div className="flex items-center gap-2">
                <FilterIcon />
                <span className="text-[14px] leading-[20px] font-medium text-[#0a0a0a]">
                  {filterModule
                    ? moduleGroups.find((g) => g.id === filterModule)?.name ?? 'Phân hệ báo cáo'
                    : 'Phân hệ báo cáo'}
                </span>
              </div>
              <ChevronDownIcon rotated={filterOpen} />
            </button>

            {filterOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#e5e7eb] rounded-[8px] shadow-md z-10 py-1">
                <button
                  onClick={() => { setFilterModule(''); setFilterOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-[14px] hover:bg-[#f3f3f5] ${!filterModule ? 'text-[#a50000] font-medium' : 'text-[#0a0a0a]'}`}
                >
                  Tất cả phân hệ
                </button>
                {moduleGroups.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => { setFilterModule(g.id); setFilterOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-[14px] hover:bg-[#f3f3f5] ${filterModule === g.id ? 'text-[#a50000] font-medium' : 'text-[#0a0a0a]'}`}
                  >
                    {g.name} ({g.code})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Demo filter toggle */}
          <button
            onClick={() => setFilterDemo((v) => !v)}
            className={`h-9 px-3 rounded-[8px] flex items-center gap-2 text-[14px] font-medium transition-colors border ${
              filterDemo
                ? 'bg-[#ecfdf3] text-[#027a48] border-[#a6f4c5]'
                : 'bg-[#f3f3f5] text-[#0a0a0a] border-transparent hover:bg-[#e9e9ec]'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="1.5" y="1.5" width="13" height="13" rx="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Demo
          </button>
        </div>

        {/* Module cards */}
        <div className="flex flex-col gap-4">
          {filteredGroups.length === 0 ? (
            <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] px-6 py-10 text-center">
              <p className="text-[14px] text-[#717182]">Không tìm thấy báo cáo phù hợp.</p>
            </div>
          ) : (
            filteredGroups.map((group) => (
              <ModuleCard
                key={group.id}
                group={group}
                onReportClick={handleReportClick}
              />
            ))
          )}
        </div>
      </div>
    </Container>
  );
}
