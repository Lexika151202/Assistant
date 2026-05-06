// Feature: 34 - Báo cáo tình hình hoạt động đầu tư ra nước ngoài cho năm tài chính (Mẫu I.17)
// Screen: List view — flat table, no year timeline blocks
// Figma Node: 2360:2347

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/shared/Container';
import { Button } from '../../components/shared/Button';
import { Breadcrumb } from '../../components/shared/Breadcrumb';
import { Input } from '../../components/shared/Input';

type ReportStatus = 'Lưu nháp' | 'Đã nộp' | 'Yêu cầu chỉnh sửa';

interface ReportRow {
  id: string;
  stt: number;
  code: string;
  projectName: string;
  updatedAt: string;
  status: ReportStatus;
}

const mockData: ReportRow[] = [
  {
    id: 'r1',
    stt: 1,
    code: 'BCNTC-2026-0001',
    projectName: 'Dự án xây dựng nhà máy điện tại Lào',
    updatedAt: '15/04/2026 14:30',
    status: 'Lưu nháp',
  },
  {
    id: 'r2',
    stt: 2,
    code: 'BCNTC-2025-0001',
    projectName: 'Dự án khai thác khoáng sản Campuchia',
    updatedAt: '20/03/2026 10:15',
    status: 'Đã nộp',
  },
  {
    id: 'r3',
    stt: 3,
    code: 'BCNTC-2024-0001',
    projectName: 'Dự án nông nghiệp công nghệ cao Myanmar',
    updatedAt: '28/12/2025 16:45',
    status: 'Yêu cầu chỉnh sửa',
  },
  {
    id: 'r4',
    stt: 4,
    code: 'BCNTC-2024-0002',
    projectName: 'Dự án logistics Thái Lan',
    updatedAt: '10/12/2025 09:00',
    status: 'Đã nộp',
  },
  {
    id: 'r5',
    stt: 5,
    code: 'BCNTC-2023-0001',
    projectName: 'Dự án viễn thông Indonesia',
    updatedAt: '05/06/2024 11:20',
    status: 'Lưu nháp',
  },
];

/** Badge màu bám 100% Figma */
function StatusBadge({ status }: { status: ReportStatus }) {
  if (status === 'Lưu nháp') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-[8px] text-[12px] font-medium bg-[#e5e7eb] text-[#364153]">
        Lưu nháp
      </span>
    );
  }
  if (status === 'Đã nộp') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-[8px] text-[12px] font-medium bg-[#dcfce7] text-[#008236]">
        Đã nộp
      </span>
    );
  }
  // Yêu cầu chỉnh sửa
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-[8px] text-[12px] font-medium bg-[#fef9c2] text-[#a65f00]">
      Yêu cầu chỉnh sửa
    </span>
  );
}

/** Inline action buttons theo đúng Figma per-status */
function RowActions({
  row,
  onSubmit,
  onEdit,
  onView,
  onLifecycle,
  onPrint,
  onExport,
  onDelete,
}: {
  row: ReportRow;
  onSubmit: () => void;
  onEdit: () => void;
  onView: () => void;
  onLifecycle: () => void;
  onPrint: () => void;
  onExport: () => void;
  onDelete: () => void;
}) {
  const { status } = row;

  return (
    <div className="flex items-center gap-2 justify-end flex-wrap">
      {/* Lưu nháp: Nộp + Chỉnh sửa + Xem chi tiết + Xem vòng đời + In + Export + Xóa */}
      {status === 'Lưu nháp' && (
        <>
          <Button size="sm" variant="primary" onClick={onSubmit}>Nộp</Button>
          <Button size="sm" variant="primary" onClick={onEdit}>Chỉnh sửa</Button>
          <Button size="sm" variant="ghost" onClick={onView}>Xem chi tiết</Button>
          <Button size="sm" variant="ghost" onClick={onLifecycle}>Xem vòng đời</Button>
          <Button size="sm" variant="ghost" onClick={onPrint}>In</Button>
          <Button size="sm" variant="ghost" onClick={onExport}>Export</Button>
          <button
            onClick={onDelete}
            className="inline-flex items-center justify-center h-8 px-3 text-[12px] font-medium rounded-[4px] bg-transparent text-[#e7000b] hover:bg-[#fef2f2] transition-colors"
          >
            Xóa
          </button>
        </>
      )}

      {/* Đã nộp: Xem chi tiết + Xem vòng đời + In + Export */}
      {status === 'Đã nộp' && (
        <>
          <Button size="sm" variant="ghost" onClick={onView}>Xem chi tiết</Button>
          <Button size="sm" variant="ghost" onClick={onLifecycle}>Xem vòng đời</Button>
          <Button size="sm" variant="ghost" onClick={onPrint}>In</Button>
          <Button size="sm" variant="ghost" onClick={onExport}>Export</Button>
        </>
      )}

      {/* Yêu cầu chỉnh sửa: Nộp + Chỉnh sửa + Xem chi tiết + Xem vòng đời + In + Export */}
      {status === 'Yêu cầu chỉnh sửa' && (
        <>
          <Button size="sm" variant="primary" onClick={onSubmit}>Nộp</Button>
          <Button size="sm" variant="primary" onClick={onEdit}>Chỉnh sửa</Button>
          <Button size="sm" variant="ghost" onClick={onView}>Xem chi tiết</Button>
          <Button size="sm" variant="ghost" onClick={onLifecycle}>Xem vòng đời</Button>
          <Button size="sm" variant="ghost" onClick={onPrint}>In</Button>
          <Button size="sm" variant="ghost" onClick={onExport}>Export</Button>
        </>
      )}
    </div>
  );
}

export default function ReportI17List() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [itemsPerPage] = useState(10);
  const [currentPage] = useState(1);

  const filtered = useMemo(() => {
    return mockData.filter((r) => {
      const matchSearch = search
        ? (r.code + r.projectName).toLowerCase().includes(search.toLowerCase())
        : true;
      const matchStatus = statusFilter ? r.status === statusFilter : true;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  return (
    <Container>
      <Breadcrumb items={[
        { label: 'Trang chủ', to: '/' },
        { label: 'Tổng hợp báo cáo theo phân hệ', to: '/feature-2' },
        { label: 'Báo cáo tình hình hoạt động đầu tư ra nước ngoài cho năm tài chính' },
      ]} />

      {/* Page heading */}
      <div className="mb-6">
        <h1 className="font-bold text-[24px] leading-[32px] text-[#101828] uppercase">
          BÁO CÁO TÌNH HÌNH HOẠT ĐỘNG ĐẦU TƯ RA NƯỚC NGOÀI CHO NĂM TÀI CHÍNH
        </h1>
      </div>

      {/* Filter bar — search + Trạng thái select */}
      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] p-[17px] mb-5">
        <div className="flex items-center gap-3">
          {/* Search input */}
          <div className="flex-1 min-w-[280px]">
            <Input
              placeholder="Tìm kiếm theo mã báo cáo, tên báo cáo"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Trạng thái select */}
          <div className="relative">
            <select
              className="h-10 pl-3 pr-8 bg-[#f3f3f5] border border-transparent rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Trạng thái</option>
              <option value="Lưu nháp">Lưu nháp</option>
              <option value="Đã nộp">Đã nộp</option>
              <option value="Yêu cầu chỉnh sửa">Yêu cầu chỉnh sửa</option>
            </select>
            {/* chevron icon */}
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

      {/* Table card */}
      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            {/* Table header */}
            <thead>
              <tr className="border-b border-[rgba(0,0,0,0.1)]">
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] w-[60px]">
                  STT
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] w-[180px]">
                  Mã báo cáo
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a]">
                  Tên dự án
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] w-[180px]">
                  Ngày cập nhật/nộp
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] w-[150px]">
                  Trạng thái
                </th>
                <th className="px-2 py-[10px] text-right text-[14px] font-medium text-[#0a0a0a] w-[460px]">
                  Hành động
                </th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-[14px] text-[#6b7280] italic"
                  >
                    Không có dữ liệu phù hợp.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-[rgba(0,0,0,0.1)] last:border-0 hover:bg-[#f9fafb]"
                  >
                    {/* STT */}
                    <td className="px-2 py-[14px] text-[14px] text-[#0a0a0a] text-center">
                      {row.stt}
                    </td>

                    {/* Mã báo cáo */}
                    <td className="px-2 py-[14px] text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap">
                      {row.code}
                    </td>

                    {/* Tên dự án */}
                    <td className="px-2 py-[14px] text-[14px] font-semibold text-[#0a0a0a]">
                      {row.projectName}
                    </td>

                    {/* Ngày cập nhật/nộp */}
                    <td className="px-2 py-[14px] text-[14px] text-[#0a0a0a] whitespace-nowrap">
                      {row.updatedAt}
                    </td>

                    {/* Trạng thái */}
                    <td className="px-2 py-[14px]">
                      <StatusBadge status={row.status} />
                    </td>

                    {/* Hành động */}
                    <td className="px-2 py-[14px]">
                      <RowActions
                        row={row}
                        onSubmit={() => alert(`Nộp báo cáo ${row.code}?`)}
                        onEdit={() => navigate(`/feature-34/${row.id}/edit`)}
                        onView={() => navigate(`/feature-34/${row.id}/view`)}
                        onLifecycle={() => alert(`Xem vòng đời báo cáo ${row.code}`)}
                        onPrint={() => window.print()}
                        onExport={() => alert(`Export báo cáo ${row.code}`)}
                        onDelete={() => alert(`Xóa báo cáo ${row.code}?`)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between px-4 py-[17px]">
          {/* Items per page */}
          <div className="flex items-center gap-2 text-[14px] text-[#4a5565]">
            <span>Hiển thị</span>
            <div className="relative">
              <select
                className="h-9 pl-3 pr-7 bg-[#f3f3f5] border border-transparent rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer"
                defaultValue={itemsPerPage}
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

          {/* Pagination controls */}
          <div className="flex items-center gap-1">
            <button
              className="h-9 px-3 text-[14px] font-medium text-[#0a0a0a] rounded-[8px] opacity-50 hover:opacity-100 hover:bg-[#f3f3f5] transition-all flex items-center gap-1"
              disabled={currentPage === 1}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Previous
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-[14px] font-medium text-[#0a0a0a] bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px]">
              {currentPage}
            </button>
            <button
              className="h-9 px-3 text-[14px] font-medium text-[#0a0a0a] rounded-[8px] opacity-50 hover:opacity-100 hover:bg-[#f3f3f5] transition-all flex items-center gap-1"
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
