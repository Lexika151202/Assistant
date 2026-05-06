// Feature: 52 - Tình hình thu hút dự án đầu tư xây dựng và kinh doanh KCHT trong KKT
// Screen: Detail/Form view — nhập liệu theo KKT (Tab Khu đang vận hành / Khu đang xây dựng cơ bản)
// Figma Nodes: 2372:996 (form view), 2372:1617 (action buttons)

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../../components/shared/Container';
import { Breadcrumb } from '../../components/shared/Breadcrumb';

// ---- Types ----
type TabType = 'vanHanh' | 'xayDung';
type FormMode = 'create' | 'edit' | 'view';

// ---- 21 Column headers for KKT table ----
// Columns: STT*, KKT*, Loại hình*, Tên dự án/khu chức năng*, Địa điểm*, Văn bản thành lập*,
// Tên nhà đầu tư*, Quốc tịch*, Tình trạng*, Diện tích quy hoạch (ha), Diện tích thành lập (ha),
// Diện tích hoạt động (ha), VĐT NN - Đăng ký (tr.USD), VĐT NN - Thực hiện (tr.USD),
// VĐT TN - Đăng ký (tỷ VNĐ), VĐT TN - Thực hiện (tỷ VNĐ), Doanh thu (tr.USD),
// Xuất khẩu (tr.USD), Nhập khẩu (tr.USD), Nộp NS (tỷ VNĐ), Xóa

const COLUMNS = [
  { key: 'stt', label: 'STT *', width: '50px', type: 'stt' },
  { key: 'kkt', label: 'KKT *', width: '180px', type: 'select' },
  { key: 'loaiHinh', label: 'Loại hình *', width: '130px', type: 'select' },
  { key: 'tenDuAn', label: 'Tên dự án/khu chức năng *', width: '200px', type: 'input' },
  { key: 'diaDiem', label: 'Địa điểm *', width: '200px', type: 'input' },
  { key: 'vanBan', label: 'Văn bản thành lập *', width: '150px', type: 'input' },
  { key: 'tenNhaDT', label: 'Tên nhà đầu tư *', width: '200px', type: 'select' },
  { key: 'quocTich', label: 'Quốc tịch *', width: '120px', type: 'input' },
  { key: 'tinhTrang', label: 'Tình trạng *', width: '180px', type: 'select' },
  { key: 'dtQuyHoach', label: 'Diện tích quy hoạch (ha)', width: '160px', type: 'number' },
  { key: 'dtThanhLap', label: 'Diện tích thành lập (ha)', width: '160px', type: 'number' },
  { key: 'dtHoatDong', label: 'Diện tích hoạt động (ha)', width: '160px', type: 'number' },
  { key: 'vdtNNDangKy', label: 'VĐT NN - Đăng ký (tr.USD)', width: '180px', type: 'number' },
  { key: 'vdtNNThucHien', label: 'VĐT NN - Thực hiện (tr.USD)', width: '185px', type: 'number' },
  { key: 'vdtTNDangKy', label: 'VĐT TN - Đăng ký (tỷ VNĐ)', width: '185px', type: 'number' },
  { key: 'vdtTNThucHien', label: 'VĐT TN - Thực hiện (tỷ VNĐ)', width: '190px', type: 'number' },
  { key: 'doanhThu', label: 'Doanh thu (tr.USD)', width: '150px', type: 'number' },
  { key: 'xuatKhau', label: 'Xuất khẩu (tr.USD)', width: '150px', type: 'number' },
  { key: 'nhapKhau', label: 'Nhập khẩu (tr.USD)', width: '150px', type: 'number' },
  { key: 'nopNS', label: 'Nộp NS (tỷ VNĐ)', width: '150px', type: 'number' },
  { key: 'xoa', label: 'Xóa', width: '52px', type: 'delete' },
] as const;

type ColKey = typeof COLUMNS[number]['key'];

// Numeric field keys (for totals)
const NUMERIC_KEYS: ColKey[] = [
  'dtQuyHoach', 'dtThanhLap', 'dtHoatDong',
  'vdtNNDangKy', 'vdtNNThucHien', 'vdtTNDangKy', 'vdtTNThucHien',
  'doanhThu', 'xuatKhau', 'nhapKhau', 'nopNS',
];

interface KKTRow {
  id: string;
  kkt: string;
  loaiHinh: string;
  tenDuAn: string;
  diaDiem: string;
  vanBan: string;
  tenNhaDT: string;
  quocTich: string;
  tinhTrang: string;
  dtQuyHoach: number;
  dtThanhLap: number;
  dtHoatDong: number;
  vdtNNDangKy: number;
  vdtNNThucHien: number;
  vdtTNDangKy: number;
  vdtTNThucHien: number;
  doanhThu: number;
  xuatKhau: number;
  nhapKhau: number;
  nopNS: number;
}

const emptyRow = (): KKTRow => ({
  id: `row-${Date.now()}-${Math.random()}`,
  kkt: '',
  loaiHinh: '',
  tenDuAn: '',
  diaDiem: '',
  vanBan: '',
  tenNhaDT: '',
  quocTich: '',
  tinhTrang: '',
  dtQuyHoach: 0,
  dtThanhLap: 0,
  dtHoatDong: 0,
  vdtNNDangKy: 0,
  vdtNNThucHien: 0,
  vdtTNDangKy: 0,
  vdtTNThucHien: 0,
  doanhThu: 0,
  xuatKhau: 0,
  nhapKhau: 0,
  nopNS: 0,
});

const initialVanHanhRows: KKTRow[] = [
  {
    id: 'vh-1',
    kkt: 'Khu kinh tế Vân Đồn',
    loaiHinh: 'KKT ven biển',
    tenDuAn: 'Khu công nghiệp A',
    diaDiem: 'Xã Đoàn Kết, huyện Vân Đồn, tỉnh Quảng Ninh',
    vanBan: 'QĐ số 123/2020/QĐ-TTg',
    tenNhaDT: 'Tập đoàn ABC',
    quocTich: 'Việt Nam',
    tinhTrang: 'Đã đi vào hoạt động',
    dtQuyHoach: 500,
    dtThanhLap: 450,
    dtHoatDong: 400,
    vdtNNDangKy: 100,
    vdtNNThucHien: 80,
    vdtTNDangKy: 2000,
    vdtTNThucHien: 1800,
    doanhThu: 150,
    xuatKhau: 80,
    nhapKhau: 60,
    nopNS: 500,
  },
];

const initialXayDungRows: KKTRow[] = [emptyRow()];

function computeTotals(rows: KKTRow[]): Partial<Record<ColKey, number>> {
  const totals: Partial<Record<ColKey, number>> = {};
  for (const key of NUMERIC_KEYS) {
    totals[key] = rows.reduce((sum, row) => sum + (Number((row as unknown as Record<string, unknown>)[key]) || 0), 0);
  }
  return totals;
}

// ---- Editable KKT Table ----
interface EditableKKTTableProps {
  rows: KKTRow[];
  onChangeRow: (id: string, field: keyof KKTRow, value: string | number) => void;
  onDeleteRow: (id: string) => void;
  onAddRow: () => void;
  mode: FormMode;
}

function EditableKKTTable({
  rows,
  onChangeRow,
  onDeleteRow,
  onAddRow,
  mode,
}: EditableKKTTableProps) {
  const totals = computeTotals(rows);
  const isReadOnly = mode === 'view';

  return (
    <div className="flex flex-col gap-4">
      {/* Add row button */}
      {!isReadOnly && (
        <div className="flex justify-end">
          <button
            onClick={onAddRow}
            className="h-[36px] px-4 flex items-center gap-2 bg-[#a50000] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#8a0000] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Thêm khu công nghiệp
          </button>
        </div>
      )}

      {/* Table */}
      <div className="border border-[#e5e7eb] rounded-[10px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: '3400px' }}>
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[rgba(0,0,0,0.1)]">
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap"
                    style={{ width: col.width, minWidth: col.width }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={row.id} className="border-b border-[rgba(0,0,0,0.1)] last:border-0">
                  {/* STT */}
                  <td className="px-2 py-[8.5px]">
                    <div className="h-[36px] flex items-center bg-[#f3f3f5] rounded-[8px] px-3 text-[14px] text-[#0a0a0a]">
                      {rowIndex + 1}
                    </div>
                  </td>

                  {/* KKT - select */}
                  <td className="px-2 py-[8.5px]">
                    <div className="h-[36px] flex items-center justify-between bg-[#f3f3f5] rounded-[8px] px-3">
                      <input
                        className="flex-1 bg-transparent text-[14px] font-medium text-[#0a0a0a] outline-none"
                        value={row.kkt}
                        readOnly={isReadOnly}
                        onChange={(e) => onChangeRow(row.id, 'kkt', e.target.value)}
                        placeholder="Chọn KKT..."
                      />
                      <svg className="w-4 h-4 text-[#6a7282] shrink-0" fill="none" viewBox="0 0 16 16">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </td>

                  {/* Loại hình - select */}
                  <td className="px-2 py-[8.5px]">
                    <div className="h-[36px] flex items-center justify-between bg-[#f3f3f5] rounded-[8px] px-3">
                      <input
                        className="flex-1 bg-transparent text-[14px] font-medium text-[#0a0a0a] outline-none"
                        value={row.loaiHinh}
                        readOnly={isReadOnly}
                        onChange={(e) => onChangeRow(row.id, 'loaiHinh', e.target.value)}
                        placeholder="Loại hình..."
                      />
                      <svg className="w-4 h-4 text-[#6a7282] shrink-0" fill="none" viewBox="0 0 16 16">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </td>

                  {/* Tên dự án */}
                  <td className="px-2 py-[8.5px]">
                    <input
                      className="w-full h-[36px] bg-[#f3f3f5] rounded-[8px] px-3 text-[14px] text-[#0a0a0a] outline-none"
                      value={row.tenDuAn}
                      readOnly={isReadOnly}
                      onChange={(e) => onChangeRow(row.id, 'tenDuAn', e.target.value)}
                      placeholder="Tên dự án..."
                    />
                  </td>

                  {/* Địa điểm */}
                  <td className="px-2 py-[8.5px]">
                    <input
                      className={`w-full h-[36px] rounded-[8px] px-3 text-[14px] text-[#0a0a0a] outline-none ${isReadOnly ? 'bg-[#f9fafb] opacity-50' : 'bg-[#f9fafb]'}`}
                      value={row.diaDiem}
                      readOnly={isReadOnly}
                      onChange={(e) => onChangeRow(row.id, 'diaDiem', e.target.value)}
                      placeholder="Địa điểm..."
                    />
                  </td>

                  {/* Văn bản thành lập */}
                  <td className="px-2 py-[8.5px]">
                    <input
                      className="w-full h-[36px] bg-[#f3f3f5] rounded-[8px] px-3 text-[14px] text-[#0a0a0a] outline-none"
                      value={row.vanBan}
                      readOnly={isReadOnly}
                      onChange={(e) => onChangeRow(row.id, 'vanBan', e.target.value)}
                      placeholder="Văn bản..."
                    />
                  </td>

                  {/* Tên nhà đầu tư - select */}
                  <td className="px-2 py-[8.5px]">
                    <div className="h-[36px] flex items-center justify-between bg-[#f3f3f5] rounded-[8px] px-3">
                      <input
                        className="flex-1 bg-transparent text-[14px] font-medium text-[#0a0a0a] outline-none"
                        value={row.tenNhaDT}
                        readOnly={isReadOnly}
                        onChange={(e) => onChangeRow(row.id, 'tenNhaDT', e.target.value)}
                        placeholder="Nhà đầu tư..."
                      />
                      <svg className="w-4 h-4 text-[#6a7282] shrink-0" fill="none" viewBox="0 0 16 16">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </td>

                  {/* Quốc tịch */}
                  <td className="px-2 py-[8.5px]">
                    <input
                      className={`w-full h-[36px] rounded-[8px] px-3 text-[14px] text-[#0a0a0a] outline-none ${isReadOnly ? 'bg-[#f9fafb] opacity-50' : 'bg-[#f9fafb]'}`}
                      value={row.quocTich}
                      readOnly={isReadOnly}
                      onChange={(e) => onChangeRow(row.id, 'quocTich', e.target.value)}
                      placeholder="Quốc tịch..."
                    />
                  </td>

                  {/* Tình trạng - select */}
                  <td className="px-2 py-[8.5px]">
                    <div className="h-[36px] flex items-center justify-between bg-[#f3f3f5] rounded-[8px] px-3">
                      <input
                        className="flex-1 bg-transparent text-[14px] font-medium text-[#0a0a0a] outline-none"
                        value={row.tinhTrang}
                        readOnly={isReadOnly}
                        onChange={(e) => onChangeRow(row.id, 'tinhTrang', e.target.value)}
                        placeholder="Tình trạng..."
                      />
                      <svg className="w-4 h-4 text-[#6a7282] shrink-0" fill="none" viewBox="0 0 16 16">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </td>

                  {/* Numeric fields */}
                  {NUMERIC_KEYS.map((key) => (
                    <td key={key} className="px-2 py-[8.5px]">
                      <input
                        type="number"
                        className={`w-full h-[36px] rounded-[8px] px-3 text-[14px] text-[#717182] outline-none ${
                          ['vdtNNDangKy', 'vdtNNThucHien', 'vdtTNDangKy', 'vdtTNThucHien'].includes(key)
                            ? 'bg-[#f9fafb] opacity-50'
                            : 'bg-[#f3f3f5]'
                        }`}
                        value={(row as unknown as Record<string, unknown>)[key] as number}
                        readOnly={isReadOnly}
                        onChange={(e) => onChangeRow(row.id, key as keyof KKTRow, Number(e.target.value))}
                      />
                    </td>
                  ))}

                  {/* Delete */}
                  <td className="px-2 py-[8.5px]">
                    {!isReadOnly && (
                      <button
                        className="h-[36px] w-[36px] flex items-center justify-center rounded-[8px] hover:bg-[#f3f4f6] transition-colors"
                        onClick={() => onDeleteRow(row.id)}
                        title="Xóa"
                      >
                        <svg className="w-4 h-4 text-[#e7000b]" fill="none" viewBox="0 0 16 16">
                          <path
                            d="M2 4h12M5.33 4V2.67h5.34V4M6.67 7.33v4M9.33 7.33v4M3.33 4l.67 9.33h8L12.67 4"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {/* Tổng cộng row */}
              <tr className="bg-[#f9fafb]">
                {/* STT */}
                <td />
                {/* KKT -> Tình trạng (8 cells) = span for Tổng cộng label */}
                <td colSpan={8} className="px-2 py-[8px]">
                  <span className="text-[14px] font-semibold text-[#0a0a0a]">Tổng cộng</span>
                </td>
                {/* Numeric totals */}
                {NUMERIC_KEYS.map((key) => (
                  <td key={key} className="px-2 py-[8px]">
                    <span className="text-[14px] font-semibold text-[#0a0a0a]">
                      {totals[key] ?? 0}
                    </span>
                  </td>
                ))}
                {/* Delete cell - empty */}
                <td />
              </tr>
            </tbody>
          </table>
        </div>
        {/* Horizontal scroll indicator */}
        <div className="h-[6px] mx-4 my-2 bg-[#929090] rounded-[5px] opacity-30" />
      </div>
    </div>
  );
}

// ---- Main Component ----
interface ReportKKTDetailProps {
  mode?: FormMode;
}

export default function ReportKKTDetail({ mode = 'create' }: ReportKKTDetailProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('vanHanh');

  // Khu đang vận hành state
  const [vanHanhRows, setVanHanhRows] = useState<KKTRow[]>(initialVanHanhRows);
  // Khu đang xây dựng cơ bản state
  const [xayDungRows, setXayDungRows] = useState<KKTRow[]>(initialXayDungRows);

  // ---- Handlers: Vận hành ----
  function handleVHChangeRow(id: string, field: keyof KKTRow, value: string | number) {
    setVanHanhRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }
  function handleVHDeleteRow(id: string) {
    setVanHanhRows((prev) => prev.filter((r) => r.id !== id));
  }
  function handleVHAddRow() {
    setVanHanhRows((prev) => [...prev, emptyRow()]);
  }

  // ---- Handlers: Xây dựng cơ bản ----
  function handleXDChangeRow(id: string, field: keyof KKTRow, value: string | number) {
    setXayDungRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }
  function handleXDDeleteRow(id: string) {
    setXayDungRows((prev) => prev.filter((r) => r.id !== id));
  }
  function handleXDAddRow() {
    setXayDungRows((prev) => [...prev, emptyRow()]);
  }

  const reportCode = id ? `BC-KKT-${id}` : 'BC-KKT-2026-Q1-001';
  const kyBaoCao = 'Quý 1';

  return (
    <Container>
      <Breadcrumb items={[
        { label: 'Trang chủ', to: '/' },
        { label: 'Tổng hợp báo cáo theo phân hệ', to: '/feature-2' },
        { label: 'Thu hút đầu tư vào KKT', to: '/feature-52' },
        { label: mode === 'create' ? 'Lập báo cáo' : mode === 'edit' ? 'Chỉnh sửa' : 'Xem chi tiết' },
      ]} />

          {/* Header: Quay lại + Title */}
          <div className="flex items-center gap-4 mb-6">
            <button
              className="h-[32px] flex items-center gap-1 text-[14px] font-medium text-[#0a0a0a] hover:text-[#a50000] transition-colors shrink-0"
              onClick={() => navigate('/feature-52')}
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
              Quay lại
            </button>

            <div>
              <h1 className="font-semibold text-[24px] leading-[36px] text-[#101828]">
                {mode === 'view' ? 'Xem báo cáo KKT' : mode === 'edit' ? 'Chỉnh sửa báo cáo KKT' : 'Lập báo cáo KKT'}
              </h1>
              {(mode === 'view' || mode === 'edit') && (
                <p className="text-[14px] text-[#4a5565]">
                  Mã báo cáo: {reportCode} • Kỳ báo cáo: {kyBaoCao}
                </p>
              )}
            </div>
          </div>

          {/* Report title (sub-heading) */}
          <div className="mb-4">
            <p className="text-[14px] text-[#4a5565]">
              Tình hình thu hút dự án đầu tư xây dựng và kinh doanh kết cấu hạ tầng trong khu kinh tế
            </p>
          </div>

          {/* Tabs: Khu đang vận hành / Khu đang xây dựng cơ bản */}
          <div className="mb-6">
            <div className="inline-flex bg-[#ececf0] rounded-[14px] p-[3px]">
              <button
                className={`h-[29px] px-3 py-[5px] rounded-[14px] text-[14px] font-medium text-[#0a0a0a] transition-all ${
                  activeTab === 'vanHanh'
                    ? 'bg-white border border-transparent shadow-sm'
                    : 'bg-transparent hover:bg-white/50'
                }`}
                onClick={() => setActiveTab('vanHanh')}
              >
                Khu đang vận hành
              </button>
              <button
                className={`h-[29px] px-3 py-[5px] rounded-[14px] text-[14px] font-medium text-[#0a0a0a] transition-all ${
                  activeTab === 'xayDung'
                    ? 'bg-white border border-transparent shadow-sm'
                    : 'bg-transparent hover:bg-white/50'
                }`}
                onClick={() => setActiveTab('xayDung')}
              >
                Khu đang xây dựng cơ bản
              </button>
            </div>
          </div>

          {/* Tab panel: Khu đang vận hành */}
          {activeTab === 'vanHanh' && (
            <EditableKKTTable
              rows={vanHanhRows}
              onChangeRow={handleVHChangeRow}
              onDeleteRow={handleVHDeleteRow}
              onAddRow={handleVHAddRow}
              mode={mode}
            />
          )}

          {/* Tab panel: Khu đang xây dựng cơ bản */}
          {activeTab === 'xayDung' && (
            <EditableKKTTable
              rows={xayDungRows}
              onChangeRow={handleXDChangeRow}
              onDeleteRow={handleXDDeleteRow}
              onAddRow={handleXDAddRow}
              mode={mode}
            />
          )}

          {/* Action bar: Hủy / Lưu nháp / Gửi báo cáo */}
          {mode !== 'view' && (
            <div className="flex items-center justify-end gap-4 mt-8 pb-8">
              {/* Hủy */}
              <button
                className="h-[40px] px-[13px] py-[6px] bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[14px] font-medium text-[#0a0a0a] hover:bg-[#f3f3f5] transition-colors"
                onClick={() => navigate('/feature-52')}
              >
                Hủy
              </button>

              {/* Lưu nháp */}
              <button
                className="h-[40px] px-4 flex items-center gap-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[14px] font-medium text-[#0a0a0a] hover:bg-[#f3f3f5] transition-colors"
                onClick={() => alert('Lưu nháp thành công')}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                  <path
                    d="M13.33 4.67L6 12 2.67 8.67"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Lưu nháp
              </button>

              {/* Gửi báo cáo */}
              <button
                className="h-[40px] px-4 flex items-center gap-2 bg-[#a50000] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#8a0000] transition-colors"
                onClick={() => alert('Gửi báo cáo thành công')}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                  <path
                    d="M2 8h12M10 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Gửi báo cáo
              </button>
            </div>
          )}

          {/* View mode: Print + close */}
          {mode === 'view' && (
            <div className="flex items-center justify-end gap-4 mt-8 pb-8">
              <button
                className="h-[40px] px-4 flex items-center gap-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[14px] font-medium text-[#0a0a0a] hover:bg-[#f3f3f5] transition-colors"
                onClick={() => window.print()}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
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
                className="h-[40px] px-[13px] py-[6px] bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[14px] font-medium text-[#0a0a0a] hover:bg-[#f3f3f5] transition-colors"
                onClick={() => navigate('/feature-52')}
              >
                Đóng
              </button>
            </div>
          )}
    </Container>
  );
}
