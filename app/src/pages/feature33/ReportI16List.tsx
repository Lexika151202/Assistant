// Feature: 33 - Báo cáo định kỳ 6 tháng tình hình hoạt động dự án đầu tư tại nước ngoài (Mẫu I.16)
// Screen: List view — Cấu trúc theo NĂM (timeline state)
// Figma Node: 2360:996

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/shared/Container';
import { Heading } from '../../components/shared/Heading';
import { Button } from '../../components/shared/Button';
import { Badge } from '../../components/shared/Badge';
import { Input } from '../../components/shared/Input';

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

const stateMeta: Record<YearState, { label: string; tone: 'neutral' | 'info' | 'warning' | 'danger' }> = {
  future: { label: 'Chưa tới hạn nộp báo cáo', tone: 'info' },
  inDeadline: { label: 'Trong thời hạn nộp báo cáo', tone: 'warning' },
  overdue: { label: 'Qua hạn nộp báo cáo', tone: 'warning' },
  closed: { label: 'Qua hạn nộp báo cáo', tone: 'warning' },
};

function statusBadge(status: ReportStatus) {
  if (status === 'Đã nộp') return <Badge tone="success">Đã nộp</Badge>;
  if (status === 'Lưu nháp') return <Badge tone="warning">Lưu nháp</Badge>;
  return <Badge tone="warning">Yêu cầu chỉnh sửa</Badge>;
}

// --- Action button variants matching figma (red filled vs ghost links) ---
function ActionRedFilled({ icon, children, onClick }: { icon: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 h-8 px-3 bg-[#a50000] text-white text-[12px] font-medium rounded-[4px] hover:bg-[#c10007] whitespace-nowrap"
    >
      <span aria-hidden>{icon}</span>{children}
    </button>
  );
}

function ActionLink({ icon, children, onClick, color = '#364153' }: { icon: string; children: React.ReactNode; onClick?: () => void; color?: string }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 h-8 px-2 text-[12px] hover:bg-[#f3f3f5] rounded-[4px] whitespace-nowrap"
      style={{ color }}
    >
      <span aria-hidden>{icon}</span>{children}
    </button>
  );
}

function rowActions(row: ReportRow, state: YearState, navigate: (to: string) => void) {
  const actions: React.ReactNode[] = [];

  // Đã nộp → Xem chi tiết / Vòng đời / In / Export
  if (row.status === 'Đã nộp') {
    actions.push(<ActionLink key="view" icon="👁" onClick={() => navigate(`/feature-33/${row.id}/view`)}>Xem chi tiết</ActionLink>);
    actions.push(<ActionLink key="life" icon="🕒" onClick={() => alert('Mở dialog Vòng đời')}>Vòng đời</ActionLink>);
    actions.push(<ActionLink key="print" icon="🖨" onClick={() => window.print()}>In</ActionLink>);
    actions.push(<ActionLink key="export" icon="↓">Export</ActionLink>);
    return actions;
  }

  // Lưu nháp / Yêu cầu chỉnh sửa → buttons đỏ + actions
  if (state !== 'closed') {
    actions.push(<ActionRedFilled key="submit" icon="✈" onClick={() => alert(`Nộp ${row.code}?`)}>Nộp</ActionRedFilled>);
    actions.push(<ActionRedFilled key="edit" icon="✎" onClick={() => navigate(`/feature-33/${row.id}/edit`)}>Chỉnh sửa</ActionRedFilled>);
  }
  actions.push(<ActionLink key="view" icon="👁" onClick={() => navigate(`/feature-33/${row.id}/view`)}>Xem chi tiết</ActionLink>);
  actions.push(<ActionLink key="life" icon="🕒" onClick={() => alert('Mở dialog Vòng đời')}>Xem vòng đời</ActionLink>);
  actions.push(<ActionLink key="print" icon="🖨" onClick={() => window.print()}>In</ActionLink>);
  actions.push(<ActionLink key="export" icon="↓">Export</ActionLink>);
  if (row.status === 'Lưu nháp' && state !== 'closed') {
    actions.push(<ActionLink key="del" icon="🗑" color="#c10007" onClick={() => confirm(`Xóa ${row.code}?`)}>Xóa</ActionLink>);
  }
  return actions;
}

function YearSectionHeader({
  year, state, expanded, onToggle, onCreate, onImport,
}: {
  year: number; state: YearState; expanded: boolean; onToggle: () => void;
  onCreate?: () => void; onImport?: () => void;
}) {
  const m = stateMeta[state];
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#fff7ed] border-b border-[#ffd6a8]">
      <div className="flex items-center gap-3">
        <button onClick={onToggle} className="text-[#0a0a0a] inline-flex items-center gap-2">
          <span className="text-[12px]">{expanded ? '▼' : '▶'}</span>
          <span className="text-[14px] font-bold tracking-wide">NĂM {year}</span>
        </button>
        {state === 'inDeadline' && onCreate && onImport && (
          <div className="flex items-center gap-2 ml-2">
            <button onClick={onCreate} className="inline-flex items-center gap-1 h-8 px-3 bg-[#a50000] text-white text-[12px] font-medium rounded-[4px] hover:bg-[#c10007]">
              <span>+</span>Lập báo cáo
            </button>
            <button onClick={onImport} className="inline-flex items-center gap-1 h-8 px-3 bg-white border border-[#e5e7eb] text-[#364153] text-[12px] font-medium rounded-[4px] hover:bg-[#f9fafb]">
              <span>↑</span>Import
            </button>
          </div>
        )}
      </div>
      <Badge tone={m.tone}>{m.label}</Badge>
    </div>
  );
}

function ReportTable({ reports, state, navigate }: { reports: ReportRow[]; state: YearState; navigate: (to: string) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-white border-b border-[#e5e7eb]">
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
            <tr key={r.id} className="border-b border-[#e5e7eb] last:border-0 hover:bg-[#f9fafb]">
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
      <div className="px-6 py-10 text-center text-[14px] text-[#6a7282]">
        <div>Kỳ báo cáo này chưa tới hạn</div>
        <div className="mt-1">Vui lòng đợi đến thời hạn để lập báo cáo</div>
      </div>
    );
  }
  return (
    <div className="px-6 py-10 text-center text-[14px] text-[#6a7282]">
      <div>Chưa có báo cáo nào cho kỳ này</div>
      <div className="mt-1 italic">Không thể tạo thêm</div>
    </div>
  );
}

function YearCard({
  block, expanded, onToggle, onCreate, onImport, navigate,
}: {
  block: YearBlock; expanded: boolean; onToggle: () => void;
  onCreate: () => void; onImport: () => void;
  navigate: (to: string) => void;
}) {
  return (
    <div className="bg-white border border-[#e5e7eb] border-l-4 border-l-[#a50000] rounded-[8px] overflow-hidden">
      <YearSectionHeader
        year={block.year}
        state={block.state}
        expanded={expanded}
        onToggle={onToggle}
        onCreate={block.state === 'inDeadline' ? onCreate : undefined}
        onImport={block.state === 'inDeadline' ? onImport : undefined}
      />
      {expanded && (
        block.reports.length > 0
          ? <ReportTable reports={block.reports} state={block.state} navigate={navigate} />
          : <EmptyMessage state={block.state} />
      )}
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
      <Heading level={1} className="!text-[20px] !leading-[28px] !font-bold uppercase tracking-wide mb-5">
        Báo cáo định kỳ 6 tháng tình hình hoạt động dự án đầu tư tại nước ngoài
      </Heading>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex-1 min-w-[280px]">
          <Input
            placeholder="Tìm kiếm theo mã báo cáo, tên, dự án"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<span>🔍</span>}
          />
        </div>
        <select
          className="h-10 px-3 min-w-[200px] bg-white border border-[#e5e7eb] rounded-[8px] text-[14px] text-[#0a0a0a] outline-none"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="">Năm</option>
          {mockData.map((y) => (
            <option key={y.year} value={y.year}>Năm {y.year}</option>
          ))}
        </select>
        <select
          className="h-10 px-3 min-w-[220px] bg-white border border-[#e5e7eb] rounded-[8px] text-[14px] text-[#0a0a0a] outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Trạng thái báo cáo</option>
          <option value="Lưu nháp">Lưu nháp</option>
          <option value="Đã nộp">Đã nộp</option>
          <option value="Yêu cầu chỉnh sửa">Yêu cầu chỉnh sửa</option>
        </select>
      </div>

      {/* Section table headers (above year cards) */}
      <div className="flex items-center justify-between px-4 py-2 mb-1 text-[12px] font-medium text-[#6a7282]">
        <span>Kỳ hạn báo cáo</span>
        <span>Trạng thái</span>
      </div>

      {/* Year list */}
      <div className="flex flex-col gap-3">
        {filtered.map((y) => (
          <YearCard
            key={y.year}
            block={y}
            expanded={!!expanded[y.year]}
            onToggle={() => setExpanded((s) => ({ ...s, [y.year]: !s[y.year] }))}
            onCreate={() => navigate('/feature-33/new')}
            onImport={() => alert('Import từ Excel/Word')}
            navigate={navigate}
          />
        ))}
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between mt-6 text-[14px] text-[#4a5565]">
        <div className="flex items-center gap-2">
          Hiển thị
          <select className="h-9 px-2 bg-white border border-[#e5e7eb] rounded-[8px]">
            <option>10</option><option>20</option><option>50</option>
          </select>
          / trang
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">‹ Previous</Button>
          <span className="px-3 py-1.5 text-[13px] bg-[#a50000] text-white rounded-[4px]">1</span>
          <Button size="sm" variant="outline">Next ›</Button>
        </div>
      </div>
    </Container>
  );
}
