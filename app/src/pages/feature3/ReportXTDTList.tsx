// Feature: 3 - BC kết quả thực hiện chương trình xúc tiến ĐT của Bộ/UBND cấp tỉnh
// Screen: List view — QUẢN LÝ BÁO CÁO XÚC TIẾN ĐẦU TƯ (yearly grouped table)
// Figma Node: 2207:2358
// Functions: 12 (Xem+Lọc+Export+Import), 14 (Xem+Vòng đời), 15 (Phê duyệt/Từ chối)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/shared/Container';
import { Button } from '../../components/shared/Button';
import { Input } from '../../components/shared/Input';

// ===== TYPES =====

type PeriodStatus = 'Chưa tới hạn nộp báo cáo' | 'Trong thời hạn nộp báo cáo' | 'Qua hạn nộp báo cáo';
type FileStatus = 'Lưu nháp' | 'Yêu cầu chỉnh sửa' | 'Đã nộp';

interface ReportFile {
  id: string;
  maBoHoSo: string;
  soBaoCaoDangXuLy: string;
  trangThaiHoSo: FileStatus;
  ngayCapNhat: string;
}

interface YearGroup {
  year: number;
  periodStatus: PeriodStatus;
  files: ReportFile[];
  /** true = collapsed (only year header shown), false = expanded */
  collapsed: boolean;
}

// ===== MOCK DATA =====

const initialYearGroups: YearGroup[] = [
  {
    year: 2026,
    periodStatus: 'Chưa tới hạn nộp báo cáo',
    files: [],
    collapsed: false,
  },
  {
    year: 2025,
    periodStatus: 'Trong thời hạn nộp báo cáo',
    files: [
      { id: 'f1', maBoHoSo: 'HSXT-2025-001', soBaoCaoDangXuLy: '2/3', trangThaiHoSo: 'Lưu nháp', ngayCapNhat: '15/04/2026 14:30' },
    ],
    collapsed: false,
  },
  {
    year: 2024,
    periodStatus: 'Qua hạn nộp báo cáo',
    files: [
      { id: 'f2', maBoHoSo: 'HSXT-2024-001', soBaoCaoDangXuLy: '3/3', trangThaiHoSo: 'Yêu cầu chỉnh sửa', ngayCapNhat: '28/12/2025 16:45' },
    ],
    collapsed: false,
  },
  {
    year: 2023,
    periodStatus: 'Qua hạn nộp báo cáo',
    files: [
      { id: 'f3', maBoHoSo: 'HSXT-2023-001', soBaoCaoDangXuLy: '3/3', trangThaiHoSo: 'Đã nộp', ngayCapNhat: '15/12/2024 11:20' },
    ],
    collapsed: false,
  },
  {
    year: 2022,
    periodStatus: 'Qua hạn nộp báo cáo',
    files: [],
    collapsed: false,
  },
];

// ===== BADGE COMPONENTS =====

function PeriodStatusBadge({ status }: { status: PeriodStatus }) {
  if (status === 'Chưa tới hạn nộp báo cáo') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-[8px] text-[12px] font-medium bg-[#dbeafe] text-[#1447e6]">
        Chưa tới hạn nộp báo cáo
      </span>
    );
  }
  if (status === 'Trong thời hạn nộp báo cáo') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-[8px] text-[12px] font-medium bg-[#dcfce7] text-[#008236]">
        Trong thời hạn nộp báo cáo
      </span>
    );
  }
  // Qua hạn
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-[8px] text-[12px] font-medium bg-[#fef9c2] text-[#a65f00]">
      Qua hạn nộp báo cáo
    </span>
  );
}

function FileStatusBadge({ status }: { status: FileStatus }) {
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

function ProgressBadge({ value }: { value: string }) {
  const isComplete = value.split('/')[0] === value.split('/')[1];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-[8px] text-[12px] font-medium ${isComplete ? 'bg-[#dcfce7] text-[#008236]' : 'bg-[#dbeafe] text-[#1447e6]'}`}>
      {value}
    </span>
  );
}

// ===== ROW ACTIONS =====

function FileRowActions({
  file,
  onEdit,
  onView,
  onLifecycle,
  onPrint,
  onExport,
  onDelete,
  onSubmit,
}: {
  file: ReportFile;
  onEdit: () => void;
  onView: () => void;
  onLifecycle: () => void;
  onPrint: () => void;
  onExport: () => void;
  onDelete: () => void;
  onSubmit: () => void;
}) {
  const { trangThaiHoSo } = file;

  return (
    <div className="flex items-center gap-2 justify-end flex-wrap">
      {trangThaiHoSo === 'Lưu nháp' && (
        <>
          <Button size="sm" variant="primary" onClick={onSubmit}>Nộp</Button>
          <Button size="sm" variant="primary" onClick={onEdit}>Chỉnh sửa</Button>
          <Button size="sm" variant="ghost" onClick={onView}>Xem chi tiết</Button>
          <Button size="sm" variant="ghost" onClick={onLifecycle}>Xem vòng đời</Button>
          <Button size="sm" variant="ghost" onClick={onPrint}>In bộ hồ sơ</Button>
          <Button size="sm" variant="ghost" onClick={onExport}>Export</Button>
          <button
            onClick={onDelete}
            className="inline-flex items-center justify-center h-8 px-3 text-[12px] font-medium rounded-[4px] bg-transparent text-[#e7000b] hover:bg-[#fef2f2] transition-colors"
          >
            Xóa
          </button>
        </>
      )}
      {trangThaiHoSo === 'Yêu cầu chỉnh sửa' && (
        <>
          <Button size="sm" variant="primary" onClick={onSubmit}>Nộp</Button>
          <Button size="sm" variant="primary" onClick={onEdit}>Chỉnh sửa</Button>
          <Button size="sm" variant="ghost" onClick={onView}>Xem chi tiết</Button>
          <Button size="sm" variant="ghost" onClick={onLifecycle}>Xem vòng đời</Button>
          <Button size="sm" variant="ghost" onClick={onPrint}>In bộ hồ sơ</Button>
          <Button size="sm" variant="ghost" onClick={onExport}>Export</Button>
        </>
      )}
      {trangThaiHoSo === 'Đã nộp' && (
        <>
          <Button size="sm" variant="ghost" onClick={onView}>Xem chi tiết</Button>
          <Button size="sm" variant="ghost" onClick={onLifecycle}>Xem vòng đời</Button>
          <Button size="sm" variant="ghost" onClick={onPrint}>In bộ hồ sơ</Button>
          <Button size="sm" variant="ghost" onClick={onExport}>Export</Button>
        </>
      )}
    </div>
  );
}

// ===== MAIN COMPONENT =====

export default function ReportXTDTList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [periodStatusFilter, setPeriodStatusFilter] = useState('');
  const [fileStatusFilter, setFileStatusFilter] = useState('');
  const [yearGroups, setYearGroups] = useState<YearGroup[]>(initialYearGroups);
  const [currentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  function toggleCollapse(year: number) {
    setYearGroups((prev) =>
      prev.map((g) => (g.year === year ? { ...g, collapsed: !g.collapsed } : g))
    );
  }

  const filteredGroups = yearGroups.filter((g) => {
    if (yearFilter && String(g.year) !== yearFilter) return false;
    if (periodStatusFilter && g.periodStatus !== periodStatusFilter) return false;
    return true;
  });

  return (
    <Container>
      {/* Page heading — Figma 2207:2364 */}
      <h1 className="font-bold text-[24px] leading-[32px] text-[#101828] mb-6">
        QUẢN LÝ BÁO CÁO XÚC TIẾN ĐẦU TƯ
      </h1>

      {/* Filter bar — Figma 2207:2365 */}
      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] p-[18px] mb-5">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="flex-1 min-w-[280px]">
            <Input
              placeholder="Tìm kiếm theo mã báo cáo"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Năm filter */}
          <div className="relative">
            <select
              className="h-[37px] pl-3 pr-8 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer min-w-[120px]"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="">Năm</option>
              {[2026, 2025, 2024, 2023, 2022].map((y) => (
                <option key={y} value={String(y)}>{y}</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]" fill="none" viewBox="0 0 16 16">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Trạng thái kỳ filter */}
          <div className="relative">
            <select
              className="h-[37px] pl-3 pr-8 bg-[#f3f3f5] border border-transparent rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer min-w-[180px]"
              value={periodStatusFilter}
              onChange={(e) => setPeriodStatusFilter(e.target.value)}
            >
              <option value="">Trạng thái kỳ</option>
              <option value="Chưa tới hạn nộp báo cáo">Chưa tới hạn nộp báo cáo</option>
              <option value="Trong thời hạn nộp báo cáo">Trong thời hạn nộp báo cáo</option>
              <option value="Qua hạn nộp báo cáo">Qua hạn nộp báo cáo</option>
            </select>
            <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]" fill="none" viewBox="0 0 16 16">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Trạng thái hồ sơ filter */}
          <div className="relative">
            <select
              className="h-[37px] pl-3 pr-8 bg-[#f3f3f5] border border-transparent rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer min-w-[180px]"
              value={fileStatusFilter}
              onChange={(e) => setFileStatusFilter(e.target.value)}
            >
              <option value="">Trạng thái hồ sơ</option>
              <option value="Lưu nháp">Lưu nháp</option>
              <option value="Yêu cầu chỉnh sửa">Yêu cầu chỉnh sửa</option>
              <option value="Đã nộp">Đã nộp</option>
            </select>
            <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]" fill="none" viewBox="0 0 16 16">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table card — Figma 2207:2393 */}
      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] overflow-hidden">
        {/* Table header row — Figma 2207:2419 */}
        <div className="border-b border-[rgba(0,0,0,0.1)] bg-white">
          <div className="grid items-center px-3 py-[10px]" style={{ gridTemplateColumns: '40px 1fr 150px 200px 160px 180px 1fr' }}>
            <div />
            <div className="text-[14px] font-medium text-[#0a0a0a]">Năm báo cáo</div>
            <div className="text-[14px] font-medium text-[#0a0a0a]">Mã bộ hồ sơ</div>
            <div className="text-[14px] font-medium text-[#0a0a0a]">Số báo cáo đang xử lý</div>
            <div className="text-[14px] font-medium text-[#0a0a0a]">Trạng thái hồ sơ</div>
            <div className="text-[14px] font-medium text-[#0a0a0a]">Ngày cập nhật/nộp</div>
            <div className="text-[14px] font-medium text-[#0a0a0a] text-right">Hành động</div>
          </div>
        </div>

        {/* Year groups */}
        {filteredGroups.map((group) => (
          <div key={group.year}>
            {/* Year header row — Figma 2207:2422 / 2207:2438 */}
            <div className="border-b border-[rgba(0,0,0,0.1)] flex items-center gap-3 px-3 py-[9px] hover:bg-[#f9fafb]">
              {/* Collapse toggle */}
              <button
                onClick={() => toggleCollapse(group.year)}
                className="w-6 h-6 flex items-center justify-center rounded-[8px] hover:bg-[#f3f3f5] transition-colors shrink-0"
                aria-label={group.collapsed ? 'Mở rộng' : 'Thu gọn'}
              >
                <svg
                  className={`w-4 h-4 text-[#6b7280] transition-transform ${group.collapsed ? '' : 'rotate-90'}`}
                  fill="none" viewBox="0 0 16 16"
                >
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Year label */}
              <span className="font-bold text-[16px] text-[#0a0a0a] uppercase flex-1">
                NĂM {group.year}
              </span>

              {/* Period status badge */}
              <PeriodStatusBadge status={group.periodStatus} />

              {/* Lập báo cáo + Import buttons (only for active periods) */}
              {group.periodStatus !== 'Chưa tới hạn nộp báo cáo' && (
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate('/feature-3/new')}
                  >
                    Lập báo cáo
                  </Button>
                  <button
                    onClick={() => alert(`Import báo cáo năm ${group.year}`)}
                    className="inline-flex items-center justify-center h-8 px-3 text-[12px] font-medium rounded-[8px] bg-white border border-[rgba(0,0,0,0.1)] text-[#0a0a0a] hover:bg-[#f3f3f5] transition-colors"
                  >
                    Import
                  </button>
                </div>
              )}
            </div>

            {/* Expanded content — sub-table of files */}
            {!group.collapsed && (
              <div className="border-b border-[rgba(0,0,0,0.1)] bg-[#f9fafb] border-l-4 border-l-[#a50000] pl-[52px] pr-[24px] pt-[16px] pb-[16px]">
                <div className="bg-white border border-[#e5e7eb] rounded-[8px] overflow-hidden">
                  {group.files.length === 0 ? (
                    /* Empty state */
                    <div className="py-8 text-center">
                      {group.periodStatus === 'Chưa tới hạn nộp báo cáo' ? (
                        <>
                          <p className="text-[14px] font-semibold text-[#6a7282]">Kỳ báo cáo này chưa tới hạn</p>
                          <p className="text-[14px] text-[#6a7282] mt-1">Vui lòng đợi đến thời hạn để lập báo cáo</p>
                        </>
                      ) : (
                        <>
                          <p className="text-[14px] font-semibold text-[#6a7282]">Chưa có bộ hồ sơ nào cho năm này</p>
                          <p className="text-[14px] text-[#6a7282] mt-1">Nhấn "Lập bộ báo cáo" ở trên để tạo bộ hồ sơ mới</p>
                        </>
                      )}
                    </div>
                  ) : (
                    /* Sub-table header + rows */
                    <table className="w-full">
                      <thead className="bg-[#f3f4f6]">
                        <tr>
                          <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] w-[150px]">Mã bộ hồ sơ</th>
                          <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] w-[180px]">Số báo cáo đang xử lý</th>
                          <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] w-[160px]">Trạng thái hồ sơ</th>
                          <th className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] w-[180px]">Ngày cập nhật/nộp</th>
                          <th className="px-2 py-[10px] text-right text-[14px] font-medium text-[#0a0a0a]">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.files
                          .filter((f) => {
                            const matchSearch = search
                              ? f.maBoHoSo.toLowerCase().includes(search.toLowerCase())
                              : true;
                            const matchStatus = fileStatusFilter ? f.trangThaiHoSo === fileStatusFilter : true;
                            return matchSearch && matchStatus;
                          })
                          .map((file) => (
                            <tr key={file.id} className="border-t border-[#e5e7eb] hover:bg-[#f9fafb]">
                              <td className="px-2 py-3 text-[14px] font-medium text-[#0a0a0a]">{file.maBoHoSo}</td>
                              <td className="px-2 py-3">
                                <ProgressBadge value={file.soBaoCaoDangXuLy} />
                              </td>
                              <td className="px-2 py-3">
                                <FileStatusBadge status={file.trangThaiHoSo} />
                              </td>
                              <td className="px-2 py-3 text-[14px] text-[#0a0a0a] whitespace-nowrap">{file.ngayCapNhat}</td>
                              <td className="px-2 py-3">
                                <FileRowActions
                                  file={file}
                                  onSubmit={() => alert(`Nộp hồ sơ ${file.maBoHoSo}?`)}
                                  onEdit={() => navigate(`/feature-3/${file.id}/edit`)}
                                  onView={() => navigate(`/feature-3/${file.id}/view`)}
                                  onLifecycle={() => alert(`Xem vòng đời ${file.maBoHoSo}`)}
                                  onPrint={() => window.print()}
                                  onExport={() => alert(`Export ${file.maBoHoSo}`)}
                                  onDelete={() => alert(`Xóa ${file.maBoHoSo}?`)}
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Pagination footer — Figma 2207:2394 */}
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
              <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]" fill="none" viewBox="0 0 16 16">
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
            <button className="h-9 px-3 text-[14px] font-medium text-[#0a0a0a] rounded-[8px] opacity-50 hover:opacity-100 hover:bg-[#f3f3f5] transition-all flex items-center gap-1">
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
