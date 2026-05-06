// Feature: 42 - Tình hình thu hút đầu tư vào KCN
// Screen: List view — danh sách báo cáo tình hình thu hút đầu tư vào khu công nghiệp
// Figma Node: 1752:2245

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/shared/Container';
import { Breadcrumb } from '../../components/shared/Breadcrumb';

type KCNStatus = 'Đã duyệt' | 'Chờ duyệt' | 'Nháp';
type NhomBaoCao = 'Đầu tư nước ngoài' | 'Đầu tư trong nước' | '';
type KyBaoCao = 'Quý 1' | 'Quý 2' | 'Quý 3' | 'Quý 4' | '';

interface KCNReportRow {
  id: string;
  stt: number;
  maBaoCao: string;
  maBieuSo: string;
  tenBieuMau: string;
  nhomBaoCao: NhomBaoCao;
  kyBaoCao: KyBaoCao;
  donViBaoCao: string;
  nguoiNop: string;
  ngayNop: string;
  trangThai: KCNStatus;
  donViTiepNhan: string;
  ghiChu: string;
}

const mockData: KCNReportRow[] = [
  {
    id: 'r1',
    stt: 1,
    maBaoCao: 'BC-2026-001',
    maBieuSo: 'M01-KCN',
    tenBieuMau: 'Tình hình thu hút đầu tư vào khu công nghiệp',
    nhomBaoCao: 'Đầu tư nước ngoài',
    kyBaoCao: 'Quý 1',
    donViBaoCao: 'KCN Tân Thuận',
    nguoiNop: 'Nguyễn Văn A',
    ngayNop: '2026-03-15',
    trangThai: 'Đã duyệt',
    donViTiepNhan: 'Bộ Kế hoạch và Đầu tư',
    ghiChu: 'Đã hoàn thành đúng hạn',
  },
  {
    id: 'r2',
    stt: 2,
    maBaoCao: 'BC-2026-002',
    maBieuSo: 'M01-KCN',
    tenBieuMau: 'Tình hình thu hút đầu tư vào khu công nghiệp',
    nhomBaoCao: 'Đầu tư trong nước',
    kyBaoCao: 'Quý 1',
    donViBaoCao: 'KCN Việt Nam',
    nguoiNop: 'Trần Thị B',
    ngayNop: '2026-03-20',
    trangThai: 'Chờ duyệt',
    donViTiepNhan: 'Bộ Kế hoạch và Đầu tư',
    ghiChu: '',
  },
  {
    id: 'r3',
    stt: 3,
    maBaoCao: 'BC-2026-003',
    maBieuSo: 'M01-KCN',
    tenBieuMau: 'Tình hình thu hút đầu tư vào khu công nghiệp',
    nhomBaoCao: 'Đầu tư nước ngoài',
    kyBaoCao: 'Quý 2',
    donViBaoCao: 'KCN Linh Trung',
    nguoiNop: 'Lê Văn C',
    ngayNop: '2026-04-10',
    trangThai: 'Nháp',
    donViTiepNhan: 'Bộ Kế hoạch và Đầu tư',
    ghiChu: 'Đang cập nhật dữ liệu',
  },
];

function StatusBadge({ status }: { status: KCNStatus }) {
  if (status === 'Đã duyệt') {
    return (
      <span className="inline-flex items-center px-[9px] py-[3px] rounded-[8px] text-[12px] font-medium bg-[#d0fae5] text-[#006045]">
        Đã duyệt
      </span>
    );
  }
  if (status === 'Chờ duyệt') {
    return (
      <span className="inline-flex items-center px-[9px] py-[3px] rounded-[8px] text-[12px] font-medium bg-[#dbeafe] text-[#193cb8]">
        Chờ duyệt
      </span>
    );
  }
  // Nháp
  return (
    <span className="inline-flex items-center px-[9px] py-[3px] rounded-[8px] text-[12px] font-medium bg-[#f3f4f6] text-[#1e2939]">
      Nháp
    </span>
  );
}

export default function ReportKCNList() {
  const navigate = useNavigate();
  const [nhomFilter, setNhomFilter] = useState<NhomBaoCao | ''>('');
  const [statusFilter, setStatusFilter] = useState<KCNStatus | ''>('');
  const [kyFilter, setKyFilter] = useState<KyBaoCao | ''>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [, setSelectedRows] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return mockData.filter((r) => {
      const matchNhom = nhomFilter ? r.nhomBaoCao === nhomFilter : true;
      const matchStatus = statusFilter ? r.trangThai === statusFilter : true;
      const matchKy = kyFilter ? r.kyBaoCao === kyFilter : true;
      return matchNhom && matchStatus && matchKy;
    });
  }, [nhomFilter, statusFilter, kyFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  function toggleRow(id: string) {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <Container>
      <Breadcrumb items={[
        { label: 'Trang chủ', to: '/' },
        { label: 'Tổng hợp báo cáo theo phân hệ', to: '/feature-2' },
        { label: 'Tình hình thu hút đầu tư vào khu công nghiệp' },
      ]} />

      {/* Page heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-[24px] leading-[32px] text-[#101828] uppercase">
          Tình hình thu hút đầu tư vào khu công nghiệp
        </h1>
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] p-[18px] mb-6">
        <div className="flex items-center gap-4 flex-wrap">

        {/* Nhóm báo cáo dropdown */}
        <div className="relative">
          <select
            className="h-[37px] pl-3 pr-8 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer"
            value={nhomFilter}
            onChange={(e) => setNhomFilter(e.target.value as NhomBaoCao | '')}
          >
            <option value="">Nhóm báo cáo</option>
            <option value="Đầu tư nước ngoài">Đầu tư nước ngoài</option>
            <option value="Đầu tư trong nước">Đầu tư trong nước</option>
          </select>
          <svg
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Trạng thái dropdown */}
        <div className="relative">
          <select
            className="h-[37px] pl-3 pr-8 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as KCNStatus | '')}
          >
            <option value="">Trạng thái</option>
            <option value="Đã duyệt">Đã duyệt</option>
            <option value="Chờ duyệt">Chờ duyệt</option>
            <option value="Nháp">Nháp</option>
          </select>
          <svg
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Kỳ báo cáo dropdown */}
        <div className="relative">
          <select
            className="h-[37px] pl-3 pr-8 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer"
            value={kyFilter}
            onChange={(e) => setKyFilter(e.target.value as KyBaoCao | '')}
          >
            <option value="">Kỳ báo cáo</option>
            <option value="Quý 1">Quý 1</option>
            <option value="Quý 2">Quý 2</option>
            <option value="Quý 3">Quý 3</option>
            <option value="Quý 4">Quý 4</option>
          </select>
          <svg
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      </div>

      {/* Table container */}
      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            {/* Header */}
            <thead>
              <tr className="border-b border-[rgba(0,0,0,0.1)]">
                <th className="pl-2 pr-1 py-[10px] w-[32px]">
                  <div className="w-4 h-4 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap w-[50px]">
                  STT
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap w-[130px]">
                  Mã báo cáo
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap w-[100px]">
                  Mã biểu số
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a]">
                  Tên biểu mẫu
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap w-[150px]">
                  Nhóm báo cáo
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap w-[100px]">
                  Kỳ báo cáo
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap w-[150px]">
                  Đơn vị báo cáo
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap w-[120px]">
                  Người nộp
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap w-[100px]">
                  Ngày nộp
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap w-[100px]">
                  Trạng thái
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap w-[170px]">
                  Đơn vị tiếp nhận
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap w-[180px]">
                  Ghi chú
                </th>
                <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap w-[90px]">
                  Hoạt động
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={14}
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
                    {/* Checkbox */}
                    <td className="pl-2 pr-1 py-[14px]">
                      <div
                        className="w-4 h-4 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] cursor-pointer"
                        onClick={() => toggleRow(row.id)}
                      />
                    </td>
                    {/* STT */}
                    <td className="px-2 py-[14px] text-[14px] text-[#0a0a0a]">{row.stt}</td>
                    {/* Mã báo cáo */}
                    <td className="px-2 py-[14px] text-[14px] font-medium text-[#364153] whitespace-nowrap">
                      {row.maBaoCao}
                    </td>
                    {/* Mã biểu số */}
                    <td className="px-2 py-[14px] text-[14px] text-[#0a0a0a]">{row.maBieuSo}</td>
                    {/* Tên biểu mẫu */}
                    <td className="px-2 py-[14px] text-[14px] text-[#0a0a0a]">{row.tenBieuMau}</td>
                    {/* Nhóm báo cáo */}
                    <td className="px-2 py-[14px] text-[14px] text-[#0a0a0a] whitespace-nowrap">
                      {row.nhomBaoCao}
                    </td>
                    {/* Kỳ báo cáo */}
                    <td className="px-2 py-[14px] text-[14px] text-[#0a0a0a] whitespace-nowrap">
                      {row.kyBaoCao}
                    </td>
                    {/* Đơn vị báo cáo */}
                    <td className="px-2 py-[14px] text-[14px] text-[#0a0a0a] whitespace-nowrap">
                      {row.donViBaoCao}
                    </td>
                    {/* Người nộp */}
                    <td className="px-2 py-[14px] text-[14px] text-[#0a0a0a] whitespace-nowrap">
                      {row.nguoiNop}
                    </td>
                    {/* Ngày nộp */}
                    <td className="px-2 py-[14px] text-[14px] text-[#0a0a0a] whitespace-nowrap">
                      {row.ngayNop}
                    </td>
                    {/* Trạng thái */}
                    <td className="px-2 py-[14px]">
                      <StatusBadge status={row.trangThai} />
                    </td>
                    {/* Đơn vị tiếp nhận */}
                    <td className="px-2 py-[14px] text-[14px] text-[#0a0a0a]">
                      {row.donViTiepNhan}
                    </td>
                    {/* Ghi chú */}
                    <td className="px-2 py-[14px] text-[14px] text-[#0a0a0a]">{row.ghiChu}</td>
                    {/* Hoạt động */}
                    <td className="px-2 py-[14px]">
                      <button
                        className="h-[32px] w-[36px] flex items-center justify-center rounded-[8px] hover:bg-[#f3f4f6] transition-colors"
                        onClick={() => navigate(`/feature-42/${row.id}`)}
                        title="Xem chi tiết"
                      >
                        <svg className="w-4 h-4 text-[#364153]" fill="none" viewBox="0 0 16 16">
                          <path
                            d="M8 3.33C4.67 3.33 2 8 2 8s2.67 4.67 6 4.67S14 8 14 8 11.33 3.33 8 3.33z"
                            stroke="currentColor"
                            strokeWidth="1.2"
                          />
                          <circle cx="8" cy="8" r="1.67" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between px-4 py-[17px]">
          {/* Left: items per page */}
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
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>/ trang</span>
          </div>

          {/* Right: pagination controls */}
          <div className="flex items-center gap-1">
            <button
              className="h-[36px] px-3 flex items-center gap-1 text-[14px] font-medium text-[#0a0a0a] rounded-[8px] opacity-50 hover:opacity-100 hover:bg-[#f3f3f5] transition-all disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path
                  d="M10 12L6 8l4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
                <path
                  d="M6 12l4-4-4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
