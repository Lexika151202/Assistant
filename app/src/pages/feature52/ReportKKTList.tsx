// Feature: 52 - Tình hình thu hút dự án đầu tư xây dựng và kinh doanh KCHT trong KKT
// Screen: List view — danh sách báo cáo nhóm theo quý (Quý 1-4/2026)
// Figma Node: 1908:6298

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/shared/Container';
import { Breadcrumb } from '../../components/shared/Breadcrumb';

// ---- Types ----
type KKTStatus =
  | 'Đã duyệt'
  | 'Đã nộp'
  | 'Đã kết thúc'
  | 'Sắp hết hạn'
  | 'Đang diễn ra'
  | 'Chưa bắt đầu';

type QuarterKey = 'Q1' | 'Q2' | 'Q3' | 'Q4';

interface ReportCard {
  id: string;
  maBaoCao: string;
  capNhat: string;
  trangThai: KKTStatus;
}

interface QuarterGroup {
  key: QuarterKey;
  label: string;
  dateRange: string;
  reportCount: number;
  quarterStatus: KKTStatus;
  reports: ReportCard[];
}

// ---- Mock Data ----
const quarterGroups: QuarterGroup[] = [
  {
    key: 'Q1',
    label: 'Quý 1/2026',
    dateRange: '2026-01-01 - 2026-03-31 • 2 báo cáo',
    reportCount: 2,
    quarterStatus: 'Đã kết thúc',
    reports: [
      {
        id: 'bc-q1-001',
        maBaoCao: 'BC-KKT-2026-Q1-001',
        capNhat: 'Cập nhật: 2026-03-28',
        trangThai: 'Đã duyệt',
      },
      {
        id: 'bc-q1-002',
        maBaoCao: 'BC-KKT-2026-Q1-002',
        capNhat: 'Cập nhật: 2026-03-25',
        trangThai: 'Đã nộp',
      },
    ],
  },
  {
    key: 'Q2',
    label: 'Quý 2/2026',
    dateRange: '2026-04-01 - 2026-06-30 • 2 báo cáo',
    reportCount: 2,
    quarterStatus: 'Sắp hết hạn',
    reports: [],
  },
  {
    key: 'Q3',
    label: 'Quý 3/2026',
    dateRange: '2026-07-01 - 2026-09-30 • 1 báo cáo',
    reportCount: 1,
    quarterStatus: 'Đang diễn ra',
    reports: [],
  },
  {
    key: 'Q4',
    label: 'Quý 4/2026',
    dateRange: '2026-10-01 - 2026-12-31 • 0 báo cáo',
    reportCount: 0,
    quarterStatus: 'Chưa bắt đầu',
    reports: [],
  },
];

// ---- Badge Components ----
function QuarterStatusBadge({ status }: { status: KKTStatus }) {
  const styles: Record<KKTStatus, string> = {
    'Đã duyệt': 'bg-[#d0fae5] text-[#006045]',
    'Đã nộp': 'bg-[#dcfce7] text-[#016630]',
    'Đã kết thúc': 'bg-[#ffe2e2] text-[#c10007]',
    'Sắp hết hạn': 'bg-[#fef9c2] text-[#a65f00]',
    'Đang diễn ra': 'bg-[#dcfce7] text-[#008236]',
    'Chưa bắt đầu': 'bg-[#f3f4f6] text-[#4a5565]',
  };
  return (
    <span
      className={`inline-flex items-center px-[9px] py-[3px] rounded-[8px] text-[12px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function ReportStatusBadge({ status }: { status: KKTStatus }) {
  const styles: Record<KKTStatus, string> = {
    'Đã duyệt': 'bg-[#d0fae5] text-[#006045]',
    'Đã nộp': 'bg-[#dcfce7] text-[#016630]',
    'Đã kết thúc': 'bg-[#ffe2e2] text-[#c10007]',
    'Sắp hết hạn': 'bg-[#fef9c2] text-[#a65f00]',
    'Đang diễn ra': 'bg-[#dcfce7] text-[#008236]',
    'Chưa bắt đầu': 'bg-[#f3f4f6] text-[#4a5565]',
  };
  return (
    <span
      className={`inline-flex items-center px-[9px] py-[3px] rounded-[8px] text-[12px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

// ---- Action Dropdown ----
function ActionDropdown({
  reportId,
  onClose,
}: {
  reportId: string;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div
      className="absolute right-0 top-[40px] z-50 bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] shadow-lg py-1 min-w-[160px]"
      onMouseLeave={onClose}
    >
      <button
        className="w-full flex items-center gap-2 px-3 py-2 text-[14px] text-[#0a0a0a] hover:bg-[#f3f3f5] transition-colors"
        onClick={() => {
          navigate(`/feature-52/${reportId}/view`);
          onClose();
        }}
      >
        {/* Eye icon */}
        <svg className="w-4 h-4 text-[#364153]" fill="none" viewBox="0 0 16 16">
          <path
            d="M8 3.33C4.67 3.33 2 8 2 8s2.67 4.67 6 4.67S14 8 14 8 11.33 3.33 8 3.33z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="8" cy="8" r="1.67" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        Xem chi tiết
      </button>
      <button
        className="w-full flex items-center gap-2 px-3 py-2 text-[14px] text-[#0a0a0a] hover:bg-[#f3f3f5] transition-colors"
        onClick={() => {
          navigate(`/feature-52/${reportId}/lifecycle`);
          onClose();
        }}
      >
        {/* Lifecycle icon */}
        <svg className="w-4 h-4 text-[#364153]" fill="none" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        Xem vòng đời
      </button>
      <button
        className="w-full flex items-center gap-2 px-3 py-2 text-[14px] text-[#0a0a0a] hover:bg-[#f3f3f5] transition-colors"
        onClick={() => {
          window.print();
          onClose();
        }}
      >
        {/* Print icon */}
        <svg className="w-4 h-4 text-[#364153]" fill="none" viewBox="0 0 16 16">
          <path
            d="M4 6V2h8v4M4 11H2V7h12v4h-2M4 11v3h8v-3M4 9h1"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        In
      </button>
      <button
        className="w-full flex items-center gap-2 px-3 py-2 text-[14px] text-[#0a0a0a] hover:bg-[#f3f3f5] transition-colors"
        onClick={() => {
          alert('Export báo cáo...');
          onClose();
        }}
      >
        {/* Export icon */}
        <svg className="w-4 h-4 text-[#364153]" fill="none" viewBox="0 0 16 16">
          <path
            d="M2 10v3h12v-3M8 2v8M5 7l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Export
      </button>
    </div>
  );
}

// ---- Main Component ----
export default function ReportKKTList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [kyFilter, setKyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [expandedQuarters, setExpandedQuarters] = useState<Set<QuarterKey>>(
    new Set(['Q1'])
  );

  const filteredGroups = useMemo(() => {
    return quarterGroups.filter((g) => {
      const matchKy = kyFilter ? g.key === kyFilter : true;
      const matchStatus = statusFilter ? g.quarterStatus === statusFilter : true;
      const matchSearch = searchTerm
        ? g.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          g.reports.some((r) =>
            r.maBaoCao.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : true;
      return matchKy && matchStatus && matchSearch;
    });
  }, [kyFilter, statusFilter, searchTerm]);

  function toggleQuarter(key: QuarterKey) {
    setExpandedQuarters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const totalPages = 2;

  return (
    <Container>
      <Breadcrumb items={[
        { label: 'Trang chủ', to: '/' },
        { label: 'Tổng hợp báo cáo theo phân hệ', to: '/feature-2' },
        { label: 'Tình hình thu hút dự án đầu tư trong khu kinh tế' },
      ]} />

          {/* Page Title */}
          <div className="mb-6">
            <h1 className="font-bold text-[24px] leading-[32px] text-[#101828] uppercase">
              Tình hình thu hút dự án đầu tư xây dựng và kinh doanh kết cấu hạ tầng trong khu kinh tế
            </h1>
          </div>

          {/* Filter bar */}
          <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] p-[18px] mb-6">
            <div className="flex items-center gap-4 flex-wrap">
            {/* Search input */}
            <div className="relative w-[448px]">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717182]">
                <svg fill="none" viewBox="0 0 16 16" className="w-full h-full">
                  <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <input
                className="w-full h-[36px] pl-10 pr-3 bg-[#f3f3f5] rounded-[8px] text-[14px] text-[#717182] outline-none placeholder-[#717182]"
                placeholder="Tìm kiếm theo kỳ báo cáo hoặc mã báo cáo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Tất cả kỳ báo cáo */}
            <div className="relative">
              <select
                className="h-[36px] pl-4 pr-8 bg-[#f3f3f5] rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer"
                value={kyFilter}
                onChange={(e) => setKyFilter(e.target.value)}
              >
                <option value="">Tất cả kỳ báo cáo</option>
                <option value="Q1">Quý 1/2026</option>
                <option value="Q2">Quý 2/2026</option>
                <option value="Q3">Quý 3/2026</option>
                <option value="Q4">Quý 4/2026</option>
              </select>
              <svg
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Tất cả trạng thái */}
            <div className="relative">
              <select
                className="h-[36px] pl-4 pr-8 bg-[#f3f3f5] rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="Đã duyệt">Đã duyệt</option>
                <option value="Đã nộp">Đã nộp</option>
                <option value="Đã kết thúc">Đã kết thúc</option>
                <option value="Sắp hết hạn">Sắp hết hạn</option>
                <option value="Đang diễn ra">Đang diễn ra</option>
                <option value="Chưa bắt đầu">Chưa bắt đầu</option>
              </select>
              <svg
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          </div>

          {/* Quarter Groups - Table card */}
          <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] overflow-hidden">
            {filteredGroups.map((group) => {
              const isExpanded = expandedQuarters.has(group.key);
              return (
                <div
                  key={group.key}
                  className="border-b border-[rgba(0,0,0,0.1)] last:border-0"
                >
                  {/* Quarter header */}
                  <div className="flex items-center justify-between px-[13px] py-[9px]">
                    <div className="flex items-center gap-3">
                      <button
                        className="flex items-center justify-center w-6 h-6 rounded-[8px] hover:bg-[#f3f3f5] transition-colors"
                        onClick={() => toggleQuarter(group.key)}
                        aria-label={isExpanded ? 'Thu gọn' : 'Mở rộng'}
                      >
                        <svg
                          className={`w-4 h-4 text-[#6b7280] transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M6 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div>
                        <p className="text-[#0a0a0a] text-[16px] font-bold leading-[24px] uppercase">
                          {group.label}
                        </p>
                        <p className="text-[#6a7282] text-[13px]">{group.dateRange}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <QuarterStatusBadge status={group.quarterStatus} />
                      {group.quarterStatus !== 'Chưa bắt đầu' && (
                        <>
                          <button
                            className="flex items-center gap-2 h-8 px-3 bg-[#a50000] rounded-[8px] text-[14px] font-medium text-white hover:bg-[#c10007] transition-colors"
                            onClick={() => navigate('/feature-52/new')}
                          >
                            Lập báo cáo
                          </button>
                          <button
                            className="flex items-center gap-2 h-8 px-3 bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[14px] font-medium text-[#0a0a0a] hover:bg-[#f3f3f5] transition-colors"
                            onClick={() => alert('Import...')}
                          >
                            Import
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && group.reports.length > 0 && (
                    <div className="bg-[#f9fafb] border-l-4 border-[#a50000] pl-[52px] pr-[24px] pt-[16px] pb-[16px]">
                      <div className="flex flex-col gap-3">
                        {group.reports.map((report) => (
                          <div
                            key={report.id}
                            className="flex items-center justify-between bg-white border border-[#e5e7eb] rounded-[8px] px-4 py-3"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-[14px] font-medium text-[#364153]">
                                {report.maBaoCao}
                              </span>
                              <span className="text-[14px] text-[#6a7282]">{report.capNhat}</span>
                              <ReportStatusBadge status={report.trangThai} />
                            </div>

                            <div className="relative">
                              <button
                                className="h-8 w-9 flex items-center justify-center rounded-[8px] hover:bg-[#f3f3f5] transition-colors"
                                onClick={() =>
                                  setOpenDropdownId(
                                    openDropdownId === report.id ? null : report.id
                                  )
                                }
                                title="Thao tác"
                              >
                                <svg className="w-4 h-4 text-[#364153]" fill="currentColor" viewBox="0 0 16 16">
                                  <circle cx="8" cy="3" r="1.2" />
                                  <circle cx="8" cy="8" r="1.2" />
                                  <circle cx="8" cy="13" r="1.2" />
                                </svg>
                              </button>
                              {openDropdownId === report.id && (
                                <ActionDropdown
                                  reportId={report.id}
                                  onClose={() => setOpenDropdownId(null)}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty state */}
                  {isExpanded && group.reports.length === 0 && (
                    <div className="bg-[#f9fafb] border-l-4 border-[#a50000] pl-[52px] pr-[24px] py-6 text-center text-[14px] text-[#6a7282] italic">
                      Chưa có báo cáo nào trong kỳ này.
                    </div>
                  )}
                </div>
              );
            })}

            {/* Pagination footer */}
            <div className="border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between px-4 py-[17px]">
              <div className="flex items-center gap-2 text-[14px] text-[#4a5565]">
                <span>Hiển thị</span>
                <div className="relative">
                  <select
                    className="h-9 pl-3 pr-7 bg-[#f3f3f5] border border-transparent rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer"
                    defaultValue={10}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>/ trang</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  className="h-[36px] px-3 flex items-center gap-1 text-[14px] font-medium text-[#0a0a0a] rounded-[8px] opacity-50 hover:opacity-100 hover:bg-[#f3f3f5] transition-all disabled:cursor-not-allowed"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`w-[36px] h-[36px] flex items-center justify-center text-[14px] font-medium rounded-[8px] transition-colors ${
                      page === currentPage
                        ? 'bg-white border border-[rgba(0,0,0,0.1)] text-[#0a0a0a]'
                        : 'text-[#0a0a0a] hover:bg-[#f3f3f5]'
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="h-[36px] px-3 flex items-center gap-1 text-[14px] font-medium text-[#0a0a0a] rounded-[8px] opacity-50 hover:opacity-100 hover:bg-[#f3f3f5] transition-all disabled:cursor-not-allowed"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                    <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
    </Container>
  );
}
