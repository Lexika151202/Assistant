// Feature: 33 - Báo cáo định kỳ năm tình hình hoạt động dự án đầu tư tại nước ngoài (Mẫu I.16)
// Screen: List view — Cấu trúc theo NĂM (timeline state)
// Figma Node: 2360:996

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/shared/Container';

type YearState = 'future' | 'inDeadline' | 'overdue' | 'closed';
type ReportStatus = 'Lưu nháp' | 'Đã nộp' | 'Yêu cầu chỉnh sửa';

interface ReportRow {
  id: string;
  code: string;
  projectName: string;
  updatedAt: string;
  status: ReportStatus;
}

interface YearBlock {
  year: number;
  state: YearState;
  reports: ReportRow[];
}

const mockData: YearBlock[] = [
  { year: 2027, state: 'future', reports: [] },
  { year: 2026, state: 'inDeadline', reports: [] },
  {
    year: 2025,
    state: 'overdue',
    reports: [
      { id: 'r1', code: 'BC-2025-015', projectName: 'Dự án sản xuất linh kiện điện tử tại Myanmar', updatedAt: '28/12/2025 16:45', status: 'Yêu cầu chỉnh sửa' },
      { id: 'r2', code: 'BC-2025-016', projectName: 'Dự án trồng cao su tại Thái Lan', updatedAt: '20/12/2025 10:20', status: 'Lưu nháp' },
      { id: 'r3', code: 'BC-2025-017', projectName: 'Dự án đầu tư khách sạn tại Indonesia', updatedAt: '18/12/2025 09:15', status: 'Đã nộp' },
    ],
  },
  {
    year: 2024,
    state: 'closed',
    reports: [
      { id: 'r4', code: 'BC-2025-001', projectName: 'Dự án khai thác mỏ vàng tại Lào', updatedAt: '15/06/2025 11:20', status: 'Đã nộp' },
      { id: 'r5', code: 'BC-2025-002', projectName: 'Dự án xây dựng nhà máy điện tại Campuchia', updatedAt: '10/06/2025 15:30', status: 'Đã nộp' },
    ],
  },
  { year: 2023, state: 'closed', reports: [] },
];

const stateMeta: Record<YearState, { label: string; badgeBg: string; badgeText: string }> = {
  future: { label: 'Chưa tới hạn nộp báo cáo', badgeBg: '#dbeafe', badgeText: '#1447e6' },
  inDeadline: { label: 'Trong thời hạn nộp báo cáo', badgeBg: '#dcfce7', badgeText: '#008236' },
  overdue: { label: 'Qua hạn nộp báo cáo', badgeBg: '#fef9c2', badgeText: '#a65f00' },
  closed: { label: 'Qua hạn nộp báo cáo', badgeBg: '#fef9c2', badgeText: '#a65f00' },
};

function statusBadge(status: ReportStatus) {
  if (status === 'Đã nộp') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#dcfce7] text-[#008236]">Đã nộp</span>;
  if (status === 'Lưu nháp') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#e5e7eb] text-[#364153]">Lưu nháp</span>;
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#fef9c2] text-[#a65f00]">Yêu cầu chỉnh sửa</span>;
}

function ActionRedFilled({ icon, children, onClick }: { icon: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 h-8 px-3 bg-[#a50000] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#c10007] whitespace-nowrap"
    >
      <span aria-hidden>{icon}</span>{children}
    </button>
  );
}

function ActionGhost({ icon, children, onClick }: { icon: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 h-8 px-2 text-[#0a0a0a] text-[14px] font-medium rounded-[8px] hover:bg-[#f3f3f5] whitespace-nowrap"
    >
      <span aria-hidden>{icon}</span>{children}
    </button>
  );
}

function ActionDelete({ icon, children, onClick }: { icon: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 h-8 px-2 text-[#e7000b] text-[14px] font-medium rounded-[8px] hover:bg-[#f3f3f5] whitespace-nowrap"
    >
      <span aria-hidden>{icon}</span>{children}
    </button>
  );
}

function rowActions(row: ReportRow, state: YearState, navigate: (to: string) => void) {
  const actions: React.ReactNode[] = [];

  // Đã nộp → Xem chi tiết / Vòng đời / In / Export
  if (row.status === 'Đã nộp') {
    actions.push(<ActionGhost key="view" icon="👁" onClick={() => navigate(`/feature-33/${row.id}/view`)}>Xem chi tiết</ActionGhost>);
    actions.push(<ActionGhost key="life" icon="🕒" onClick={() => alert('Mở dialog Vòng đời')}>Vòng đời</ActionGhost>);
    actions.push(<ActionGhost key="print" icon="🖨" onClick={() => window.print()}>In</ActionGhost>);
    actions.push(<ActionGhost key="export" icon="↓">Export</ActionGhost>);
    return actions;
  }

  // Lưu nháp / Yêu cầu chỉnh sửa → buttons đỏ + actions
  if (state !== 'closed') {
    actions.push(<ActionRedFilled key="submit" icon="✈" onClick={() => alert(`Nộp ${row.code}?`)}>Nộp</ActionRedFilled>);
    actions.push(<ActionRedFilled key="edit" icon="✎" onClick={() => navigate(`/feature-33/${row.id}/edit`)}>Chỉnh sửa</ActionRedFilled>);
  }
  actions.push(<ActionGhost key="view" icon="👁" onClick={() => navigate(`/feature-33/${row.id}/view`)}>Xem chi tiết</ActionGhost>);
  actions.push(<ActionGhost key="life" icon="🕒" onClick={() => alert('Mở dialog Vòng đời')}>Xem vòng đời</ActionGhost>);
  actions.push(<ActionGhost key="print" icon="🖨" onClick={() => window.print()}>In</ActionGhost>);
  actions.push(<ActionGhost key="export" icon="↓">Export</ActionGhost>);
  if (row.status === 'Lưu nháp' && state !== 'closed') {
    actions.push(<ActionDelete key="del" icon="🗑" onClick={() => confirm(`Xóa ${row.code}?`)}>Xóa</ActionDelete>);
  }
  return actions;
}

function ReportTable({ reports, state, navigate }: { reports: ReportRow[]; state: YearState; navigate: (to: string) => void }) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#f3f4f6]">
          <tr>
            <th className="px-4 py-3 text-left text-[12px] font-medium text-[#6a7282]">Mã báo cáo</th>
            <th className="px-4 py-3 text-left text-[12px] font-medium text-[#6a7282]">Tên dự án</th>
            <th className="px-4 py-3 text-left text-[12px] font-medium text-[#6a7282] whitespace-nowrap">Ngày cập nhật/nộp</th>
            <th className="px-4 py-3 text-left text-[12px] font-medium text-[#6a7282] whitespace-nowrap">Trạng thái báo cáo</th>
            <th className="px-4 py-3 text-right text-[12px] font-medium text-[#6a7282]">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="border-b border-[rgba(0,0,0,0.1)] last:border-0 hover:bg-[#f9fafb]">
              <td className="px-4 py-3 text-[13px] text-[#0a0a0a] whitespace-nowrap">{r.code}</td>
              <td className="px-4 py-3 text-[13px] text-[#0a0a0a]">{r.projectName}</td>
              <td className="px-4 py-3 text-[13px] text-[#6a7282] whitespace-nowrap">{r.updatedAt}</td>
              <td className="px-4 py-3">{statusBadge(r.status)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1 flex-nowrap">
                  {rowActions(r, state, navigate)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyMessage({ state }: { state: YearState }) {
  if (state === 'future' || state === 'inDeadline') {
    return (
      <div className="bg-white border border-[#e5e7eb] rounded-[8px] px-6 py-10 text-center text-[14px] text-[#6a7282]">
        <div>Kỳ báo cáo này chưa tới hạn</div>
        <div className="mt-1">Vui lòng đợi đến thời hạn để lập báo cáo</div>
      </div>
    );
  }
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] px-6 py-10 text-center text-[14px] text-[#6a7282]">
      <div>Chưa có báo cáo nào cho kỳ này</div>
      <div className="mt-1 italic">Không thể tạo thêm</div>
    </div>
  );
}

export default function ReportI16List() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [expanded, setExpanded] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(mockData.map((y) => [y.year, true]))
  );

  const filtered = useMemo(() => {
    return mockData
      .filter((y) => (yearFilter ? String(y.year) === yearFilter : true))
      .map((y) => ({
        ...y,
        reports: y.reports.filter((r) => {
          const matchSearch = search ? (r.code + r.projectName).toLowerCase().includes(search.toLowerCase()) : true;
          const matchStatus = statusFilter ? r.status === statusFilter : true;
          return matchSearch && matchStatus;
        }),
      }));
  }, [search, yearFilter, statusFilter]);

  return (
    <Container>
      {/* Page heading */}
      <h1 className="font-bold text-[24px] leading-[32px] text-[#101828] uppercase mb-5">
        Báo cáo định kỳ năm tình hình hoạt động dự án đầu tư tại nước ngoài
      </h1>

      {/* Filter card */}
      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] p-[18px] mb-6">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1 min-w-[280px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6a7282]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm theo mã báo cáo, tên, dự án"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[36px] pl-[40px] pr-3 bg-[#f3f3f5] rounded-[8px] text-[14px] text-[#0a0a0a] placeholder:text-[#9ca3af] outline-none"
            />
          </div>
          {/* Year dropdown */}
          <div className="relative">
            <select
              className="h-[37px] px-3 pr-8 min-w-[200px] bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[14px] text-[#0a0a0a] outline-none appearance-none"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="">Năm</option>
              {mockData.map((y) => (
                <option key={y.year} value={y.year}>Năm {y.year}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6a7282] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {/* Status dropdown */}
          <div className="relative">
            <select
              className="h-[37px] px-3 pr-8 min-w-[220px] bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[14px] text-[#0a0a0a] outline-none appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Trạng thái báo cáo</option>
              <option value="Lưu nháp">Lưu nháp</option>
              <option value="Đã nộp">Đã nộp</option>
              <option value="Yêu cầu chỉnh sửa">Yêu cầu chỉnh sửa</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6a7282] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] overflow-hidden">
        {/* Table header */}
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.1)] px-[13px] py-[10px]">
          <span className="text-[12px] font-medium text-[#6a7282]">Kỳ hạn báo cáo</span>
          <span className="text-[12px] font-medium text-[#6a7282]">Trạng thái</span>
        </div>

        {/* Year rows */}
        {filtered.map((block) => {
          const meta = stateMeta[block.state];
          const isExpanded = !!expanded[block.year];
          return (
            <div key={block.year}>
              {/* Period row */}
              <div className="flex items-center border-b border-[rgba(0,0,0,0.1)] px-[13px] py-[9px]">
                {/* Chevron button */}
                <button
                  onClick={() => setExpanded((s) => ({ ...s, [block.year]: !s[block.year] }))}
                  className="w-6 h-6 rounded-[8px] inline-flex items-center justify-center hover:bg-[#f3f3f5] mr-2"
                >
                  <svg className={`w-4 h-4 text-[#0a0a0a] transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {/* Period text */}
                <span className="font-bold text-[16px] uppercase text-[#0a0a0a]">NĂM {block.year}</span>

                {/* Action buttons for inDeadline or overdue */}
                {(block.state === 'inDeadline' || block.state === 'overdue') && (
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => navigate('/feature-33/new')}
                      className="inline-flex items-center gap-1 h-8 px-3 bg-[#a50000] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#c10007]"
                    >
                      <span>+</span>Lập báo cáo
                    </button>
                    <button
                      onClick={() => alert('Import từ Excel/Word')}
                      className="inline-flex items-center gap-1 h-8 px-3 bg-white border border-[rgba(0,0,0,0.1)] text-[#0a0a0a] text-[14px] font-medium rounded-[8px] hover:bg-[#f9fafb]"
                    >
                      <span>↑</span>Import
                    </button>
                  </div>
                )}

                {/* Status badge - far right */}
                <span
                  className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium"
                  style={{ backgroundColor: meta.badgeBg, color: meta.badgeText }}
                >
                  {meta.label}
                </span>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="bg-[#f9fafb] border-b border-[rgba(0,0,0,0.1)]">
                  <div className="border-l-4 border-[#a50000] ml-6 pl-[52px] pr-6 pt-4 pb-4">
                    {block.reports.length > 0
                      ? <ReportTable reports={block.reports} state={block.state} navigate={navigate} />
                      : <EmptyMessage state={block.state} />
                    }
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Pagination footer */}
        <div className="flex items-center justify-between border-t border-[rgba(0,0,0,0.1)] px-4 py-[17px]">
          <div className="flex items-center gap-2 text-[14px] text-[#4a5565]">
            Hiển thị
            <select className="h-9 px-2 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[14px]">
              <option>10</option><option>20</option><option>50</option>
            </select>
            / trang
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 text-[14px] font-medium text-[#0a0a0a] border border-[rgba(0,0,0,0.1)] rounded-[8px] hover:bg-[#f3f3f5]">Previous</button>
            <span className="px-3 py-1.5 text-[13px] bg-[#a50000] text-white rounded-[8px]">1</span>
            <button className="h-8 px-3 text-[14px] font-medium text-[#0a0a0a] border border-[rgba(0,0,0,0.1)] rounded-[8px] hover:bg-[#f3f3f5]">Next</button>
          </div>
        </div>
      </div>
    </Container>
  );
}