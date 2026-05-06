// Feature: 5 - BC tình hình thực hiện cam kết/thỏa thuận hợp tác đầu tư/chủ trương đầu tư
// Screen: Form Lập / Chỉnh sửa / Xem báo cáo (Mẫu B.IV.4 + A.IV.4)
// Figma Node: 2207:1959 (Tab 3 active), 2207:2100 (Tab 4 active)
// Functions: 23 (Lập+Lưu nháp+Gửi), 25 (Chỉnh sửa), 28 (In)

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../../components/shared/Container';
import { Button } from '../../components/shared/Button';
import { Card, CardHeader, CardTitle } from '../../components/shared/Card';
import { Input } from '../../components/shared/Input';
import { Label } from '../../components/shared/Label';
import { Badge } from '../../components/shared/Badge';

interface ReportCommitmentFormProps {
  mode?: 'create' | 'edit' | 'view';
}

type ActiveTab = 'tab1' | 'tab2' | 'tab3' | 'tab4';

// ===== B.IV.4 TABLE TYPES (Tab 3 — Cam kết đầu tư, 9 cột) =====

interface BIV4Row {
  key: string;
  stt: number;
  tenDuAn: string;
  doiTac: string;
  diaDiemDuAn: string;
  nganhLinhVuc: string;
  quyMoCongSuat: string;
  tongVonDT: number;
  tinhHinhTrienKhai: string;
}

const biv4ProjectDb: Record<string, Omit<BIV4Row, 'key' | 'stt'>> = {
  'DA-001': { tenDuAn: 'DA-001', doiTac: 'Samsung Electronics', diaDiemDuAn: 'KCN Bắc Ninh', nganhLinhVuc: 'Điện tử, bán dẫn', quyMoCongSuat: '500 MW', tongVonDT: 500000, tinhHinhTrienKhai: 'Đang triển khai giai đoạn 1' },
  'DA-002': { tenDuAn: 'DA-002', doiTac: 'Toyota Motor Corp.', diaDiemDuAn: 'KCN Vĩnh Phúc', nganhLinhVuc: 'Sản xuất ô tô', quyMoCongSuat: '800 lao động', tongVonDT: 800000, tinhHinhTrienKhai: 'Hoàn thành giai đoạn 1' },
  'DA-003': { tenDuAn: 'DA-003', doiTac: 'Intel Corporation', diaDiemDuAn: 'TP. Hồ Chí Minh', nganhLinhVuc: 'Công nghệ thông tin', quyMoCongSuat: '300 lao động', tongVonDT: 1200000, tinhHinhTrienKhai: 'Đang xây dựng' },
};

const initialBIV4Rows: BIV4Row[] = [
  {
    key: 'r1',
    stt: 1,
    tenDuAn: '',
    doiTac: '',
    diaDiemDuAn: '',
    nganhLinhVuc: '',
    quyMoCongSuat: '',
    tongVonDT: 0,
    tinhHinhTrienKhai: '',
  },
];

// ===== A.IV.4 TABLE TYPES (Tab 4 — Dự án ĐTNN, 12 cột + sub-header) =====

interface AIV4Row {
  key: string;
  stt: number;
  tenNhaDauTu: string;
  nuocDangKy: string;
  tenDuAn: string;
  vonDangKyDuKien: number;
  nganhCap1: string;
  mucTieuDuAn: string;
  diaDiem: string;
  dienTichDat: number;
  thuocDanhMucQuocGia: string;
  thuocDanhMucLinhVuc: string;
  thuocDanhMucDiaPhuong: string;
  deXuat: string;
}

const initialAIV4Rows: AIV4Row[] = [
  {
    key: 'r1',
    stt: 1,
    tenNhaDauTu: 'Samsung Electronics Co., Ltd.',
    nuocDangKy: 'Hàn Quốc',
    tenDuAn: 'Nhà máy sản xuất linh kiện điện tử',
    vonDangKyDuKien: 500000000,
    nganhCap1: 'Công nghiệp chế tạo',
    mucTieuDuAn: 'Sản xuất linh kiện điện tử, xuất khẩu',
    diaDiem: 'KCN Bắc Ninh',
    dienTichDat: 150000,
    thuocDanhMucQuocGia: 'Có',
    thuocDanhMucLinhVuc: 'Công nghệ cao',
    thuocDanhMucDiaPhuong: 'Ưu tiên',
    deXuat: '',
  },
  {
    key: 'r2',
    stt: 2,
    tenNhaDauTu: 'Toyota Motor Corporation',
    nuocDangKy: 'Nhật Bản',
    tenDuAn: 'Nhà máy lắp ráp ô tô',
    vonDangKyDuKien: 800000000,
    nganhCap1: 'Sản xuất ô tô',
    mucTieuDuAn: 'Lắp ráp và phân phối ô tô trong nước',
    diaDiem: 'KCN Vĩnh Phúc',
    dienTichDat: 250000,
    thuocDanhMucQuocGia: 'Có',
    thuocDanhMucLinhVuc: 'Công nghiệp',
    thuocDanhMucDiaPhuong: 'Trọng điểm',
    deXuat: '',
  },
  {
    key: 'r3',
    stt: 3,
    tenNhaDauTu: 'Intel Corporation',
    nuocDangKy: 'Hoa Kỳ',
    tenDuAn: 'Trung tâm R&D chip bán dẫn',
    vonDangKyDuKien: 1200000000,
    nganhCap1: 'Công nghệ thông tin',
    mucTieuDuAn: 'Nghiên cứu và phát triển chip bán dẫn',
    diaDiem: 'TP. Hồ Chí Minh',
    dienTichDat: 80000,
    thuocDanhMucQuocGia: 'Có',
    thuocDanhMucLinhVuc: 'Công nghệ cao',
    thuocDanhMucDiaPhuong: 'Ưu tiên cao',
    deXuat: '',
  },
];

// ===== TAB PLACEHOLDER COMPONENTS =====

function Tab1BaoCaoKetQua() {
  return (
    <Card padded={false} className="mb-6">
      <div className="p-6 pb-4">
        <CardTitle>Danh sách chương trình xúc tiến đầu tư đã thực hiện</CardTitle>
      </div>
      <div className="px-6 pb-6 text-[14px] text-[#6b7280] italic">
        Nội dung Tab 1 — Báo cáo kết quả (xem Mẫu B.IV.2)
      </div>
    </Card>
  );
}

function Tab2BieuTongHop() {
  return (
    <Card padded={false} className="mb-6">
      <div className="p-6 pb-4">
        <CardTitle>Biểu tổng hợp tình hình thực hiện chương trình xúc tiến đầu tư</CardTitle>
      </div>
      <div className="px-6 pb-6 text-[14px] text-[#6b7280] italic">
        Nội dung Tab 2 — Biểu tổng hợp (xem Mẫu B.IV.3)
      </div>
    </Card>
  );
}

// ===== B.IV.4 TABLE COMPONENT (Tab 3 — Cam kết đầu tư, 9 cột) =====

function BIV4Table({
  rows,
  isView,
  onRowChange,
  onDeleteRow,
  onProjectSelect,
}: {
  rows: BIV4Row[];
  isView: boolean;
  onRowChange: (key: string, field: keyof BIV4Row, value: string | number) => void;
  onDeleteRow: (key: string) => void;
  onProjectSelect: (key: string, projectCode: string) => void;
}) {
  const totalVon = rows.reduce((acc, r) => acc + r.tongVonDT, 0);

  const inputCls = 'w-full bg-[#f3f3f5] border border-transparent rounded-[8px] px-2 py-1 text-[13px] text-[#0a0a0a] outline-none focus:border-[#a50000] focus:bg-white transition-colors';
  const numInputCls = inputCls + ' text-right';
  const disabledInputCls = 'w-full bg-[#f9fafb] border border-transparent rounded-[8px] px-2 py-1 text-[13px] text-[#0a0a0a] outline-none';
  const thCls = 'border border-[#d1d5dc] px-2 py-2 text-[13px] font-bold text-[#0a0a0a] text-center bg-[#f9fafb]';
  const tdCls = 'border border-[#d1d5dc] px-1 py-1 text-[13px] text-[#0a0a0a]';

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse" style={{ minWidth: '1800px' }}>
        <thead>
          <tr>
            <th className={thCls} style={{ width: 48 }}>STT</th>
            <th className={thCls} style={{ width: 240 }}>Tên dự án</th>
            <th className={thCls} style={{ width: 232 }}>Đối tác</th>
            <th className={thCls} style={{ width: 232 }}>Địa điểm dự án</th>
            <th className={thCls} style={{ width: 232 }}>Ngành/Lĩnh vực</th>
            <th className={thCls} style={{ width: 232 }}>Quy mô, công suất</th>
            <th className={thCls} style={{ width: 232 }}>Tổng vốn ĐT (triệu đồng)</th>
            <th className={thCls} style={{ width: 238 }}>Tình hình triển khai</th>
            {!isView && <th className={thCls} style={{ width: 102 }}>Hành động</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const rowDisabled = isView || !row.tenDuAn;
            const fieldInputCls = rowDisabled ? disabledInputCls : inputCls;
            return (
            <tr key={row.key} className="hover:bg-[#f9fafb]">
              <td className={tdCls + ' text-center'}>{row.stt}</td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.tenDuAn}</span>
                ) : (
                  <select
                    className="w-full h-8 px-2 bg-[#f3f3f5] border border-transparent rounded-[8px] text-[13px] text-[#0a0a0a] outline-none appearance-none cursor-pointer focus:border-[#a50000]"
                    value={row.tenDuAn}
                    onChange={(e) => onProjectSelect(row.key, e.target.value)}
                  >
                    <option value="">-- Chọn dự án --</option>
                    <option value="DA-001">Nhà máy sản xuất linh kiện điện tử</option>
                    <option value="DA-002">Nhà máy lắp ráp ô tô</option>
                    <option value="DA-003">Trung tâm R&D chip bán dẫn</option>
                  </select>
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.doiTac}</span>
                ) : (
                  <input
                    className={fieldInputCls}
                    placeholder="Đối tác"
                    value={row.doiTac}
                    readOnly={rowDisabled}
                    onChange={(e) => onRowChange(row.key, 'doiTac', e.target.value)}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.diaDiemDuAn}</span>
                ) : (
                  <input
                    className={fieldInputCls}
                    placeholder="Địa điểm"
                    value={row.diaDiemDuAn}
                    readOnly={rowDisabled}
                    onChange={(e) => onRowChange(row.key, 'diaDiemDuAn', e.target.value)}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.nganhLinhVuc}</span>
                ) : (
                  <input
                    className={fieldInputCls}
                    placeholder="Ngành"
                    value={row.nganhLinhVuc}
                    readOnly={rowDisabled}
                    onChange={(e) => onRowChange(row.key, 'nganhLinhVuc', e.target.value)}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.quyMoCongSuat}</span>
                ) : (
                  <input
                    className={fieldInputCls}
                    placeholder="Quy mô"
                    value={row.quyMoCongSuat}
                    readOnly={rowDisabled}
                    onChange={(e) => onRowChange(row.key, 'quyMoCongSuat', e.target.value)}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span className="block text-right">{row.tongVonDT}</span>
                ) : (
                  <input
                    type="number"
                    className={rowDisabled ? disabledInputCls + ' text-right' : numInputCls}
                    value={row.tongVonDT}
                    readOnly={rowDisabled}
                    onChange={(e) => onRowChange(row.key, 'tongVonDT', Number(e.target.value))}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.tinhHinhTrienKhai}</span>
                ) : (
                  <textarea
                    className={(rowDisabled ? disabledInputCls : inputCls) + ' resize-none h-[60px]'}
                    placeholder="Tình hình thực hiện..."
                    value={row.tinhHinhTrienKhai}
                    readOnly={rowDisabled}
                    onChange={(e) => onRowChange(row.key, 'tinhHinhTrienKhai', e.target.value)}
                  />
                )}
              </td>
              {!isView && (
                <td className={tdCls + ' text-center'}>
                  <button
                    onClick={() => onDeleteRow(row.key)}
                    className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[#e7000b] hover:bg-[#fef2f2] transition-colors mx-auto opacity-50 hover:opacity-100"
                    aria-label="Xóa hàng"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                      <path d="M3 4h10M6 4V3h4v1M5 4v8h6V4H5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </td>
              )}
            </tr>
            );
          })}
          {/* TỔNG SỐ row */}
          <tr className="bg-[#f3f4f6]">
            <td className={tdCls + ' font-semibold text-center'} colSpan={6}>TỔNG SỐ</td>
            <td className={tdCls + ' text-right font-semibold'}>{totalVon}</td>
            <td className={tdCls} />
            {!isView && <td className={tdCls} />}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ===== A.IV.4 TABLE COMPONENT (Tab 4 — Dự án ĐTNN, 12 cột + sub-header "Thuộc danh mục") =====

function AIV4Table({
  rows,
  isView,
  onRowChange,
  onDeleteRow,
}: {
  rows: AIV4Row[];
  isView: boolean;
  onRowChange: (key: string, field: keyof AIV4Row, value: string | number) => void;
  onDeleteRow: (key: string) => void;
}) {
  const totalVon = rows.reduce((acc, r) => acc + r.vonDangKyDuKien, 0);

  const inputCls = 'w-full bg-[#f3f3f5] border border-transparent rounded-[8px] px-2 py-1 text-[13px] text-[#0a0a0a] outline-none focus:border-[#a50000] focus:bg-white transition-colors';
  const numInputCls = inputCls + ' text-right';
  const thCls = 'border border-[#d1d5dc] px-2 py-2 text-[13px] font-bold text-[#0a0a0a] text-center bg-[#f9fafb]';
  const tdCls = 'border border-[#d1d5dc] px-1 py-1 text-[13px] text-[#0a0a0a]';

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse" style={{ minWidth: '2000px' }}>
        <thead>
          {/* Row 1 — top-level headers */}
          <tr>
            <th className={thCls} rowSpan={2} style={{ width: 52 }}>STT</th>
            <th className={thCls} rowSpan={2} style={{ width: 255 }}>
              Tên nhà đầu tư <span className="text-[#e7000b]">*</span>
            </th>
            <th className={thCls} rowSpan={2} style={{ width: 120 }}>Nước đăng ký</th>
            <th className={thCls} rowSpan={2} style={{ width: 203 }}>Tên dự án</th>
            <th className={thCls} rowSpan={2} style={{ width: 154 }}>Vốn đăng ký dự kiến (USD)</th>
            <th className={thCls} rowSpan={2} style={{ width: 151 }}>Ngành cấp 1</th>
            <th className={thCls} rowSpan={2} style={{ width: 204 }}>Mục tiêu dự án</th>
            <th className={thCls} rowSpan={2} style={{ width: 150 }}>Địa điểm</th>
            <th className={thCls} rowSpan={2} style={{ width: 122 }}>Diện tích đất (m²)</th>
            <th className={thCls} colSpan={3} style={{ width: 340 }}>Thuộc danh mục dự án thu hút đầu tư</th>
            <th className={thCls} rowSpan={2} style={{ width: 200 }}>Đề xuất</th>
            {!isView && <th className={thCls} rowSpan={2} style={{ width: 49 }}>Hành động</th>}
          </tr>
          {/* Row 2 — sub-headers for "Thuộc danh mục" */}
          <tr>
            <th className={thCls} style={{ width: 100 }}>Quốc gia</th>
            <th className={thCls} style={{ width: 120 }}>Lĩnh vực</th>
            <th className={thCls} style={{ width: 120 }}>Địa phương</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="hover:bg-[#f9fafb]">
              <td className={tdCls + ' text-center'}>{row.stt}</td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.tenNhaDauTu}</span>
                ) : (
                  <div className="flex items-center justify-between bg-[#f3f3f5] rounded-[8px] px-2 py-1 gap-1">
                    <span className="text-[13px] text-[#0a0a0a] flex-1 truncate font-medium">
                      {row.tenNhaDauTu || 'Chọn nhà đầu tư'}
                    </span>
                    <svg className="w-4 h-4 text-[#717182] shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </td>
              <td className={tdCls}>
                <span className="text-[#4a5565]">{row.nuocDangKy}</span>
              </td>
              <td className={tdCls}>
                <span className="text-[#4a5565]">{row.tenDuAn}</span>
              </td>
              <td className={tdCls + ' text-right'}>
                {isView ? (
                  <span className="text-[#4a5565]">{row.vonDangKyDuKien.toLocaleString()}</span>
                ) : (
                  <input
                    type="number"
                    className={numInputCls}
                    value={row.vonDangKyDuKien}
                    onChange={(e) => onRowChange(row.key, 'vonDangKyDuKien', Number(e.target.value))}
                  />
                )}
              </td>
              <td className={tdCls}>
                <span className="text-[#4a5565]">{row.nganhCap1}</span>
              </td>
              <td className={tdCls}>
                <span className="text-[#4a5565]">{row.mucTieuDuAn}</span>
              </td>
              <td className={tdCls}>
                <span className="text-[#4a5565]">{row.diaDiem}</span>
              </td>
              <td className={tdCls + ' text-right'}>
                <span className="text-[#4a5565]">{row.dienTichDat.toLocaleString()}</span>
              </td>
              <td className={tdCls + ' text-center'}>
                <span className="text-[#4a5565]">{row.thuocDanhMucQuocGia}</span>
              </td>
              <td className={tdCls}>
                <span className="text-[#4a5565]">{row.thuocDanhMucLinhVuc}</span>
              </td>
              <td className={tdCls}>
                <span className="text-[#4a5565]">{row.thuocDanhMucDiaPhuong}</span>
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.deXuat}</span>
                ) : (
                  <textarea
                    className={inputCls + ' resize-none h-[60px]'}
                    placeholder="Nhập đề xuất..."
                    value={row.deXuat}
                    onChange={(e) => onRowChange(row.key, 'deXuat', e.target.value)}
                  />
                )}
              </td>
              {!isView && (
                <td className={tdCls + ' text-center'}>
                  <button
                    onClick={() => onDeleteRow(row.key)}
                    className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[#e7000b] hover:bg-[#fef2f2] transition-colors mx-auto opacity-50 hover:opacity-100"
                    aria-label="Xóa hàng"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                      <path d="M3 4h10M6 4V3h4v1M5 4v8h6V4H5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </td>
              )}
            </tr>
          ))}
          {/* TỔNG: N row */}
          <tr className="bg-[#eaf6f6]">
            <td className={tdCls + ' bg-white'} />
            <td className={tdCls + ' bg-white font-semibold'}>TỔNG: {rows.length}</td>
            <td className={tdCls + ' bg-white'} />
            <td className={tdCls + ' bg-white'} />
            <td className={tdCls + ' bg-white text-right font-semibold'}>{totalVon.toLocaleString()}</td>
            <td className={tdCls + ' bg-white'} />
            <td className={tdCls + ' bg-white'} />
            <td className={tdCls + ' bg-white'} />
            <td className={tdCls + ' bg-white'} />
            <td className={tdCls + ' bg-white'} />
            <td className={tdCls + ' bg-white'} />
            <td className={tdCls + ' bg-white'} />
            <td className={tdCls + ' bg-white'} />
            {!isView && <td className={tdCls + ' bg-white'} />}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ===== TAB 3 — CAM KẾT ĐẦU TƯ (Mẫu B.IV.4) =====

function Tab3CamKetDauTu({
  isView,
  rows,
  coQuanLapBaoCao,
  nam,
  onCoQuanChange,
  onNamChange,
  onRowChange,
  onAddRow,
  onDeleteRow,
  onProjectSelect,
}: {
  isView: boolean;
  rows: BIV4Row[];
  coQuanLapBaoCao: string;
  nam: string;
  onCoQuanChange: (v: string) => void;
  onNamChange: (v: string) => void;
  onRowChange: (key: string, field: keyof BIV4Row, value: string | number) => void;
  onAddRow: () => void;
  onDeleteRow: (key: string) => void;
  onProjectSelect: (key: string, projectCode: string) => void;
}) {
  const roFieldCls = isView ? 'bg-[#f9fafb]' : '';

  return (
    <>
      {/* Form subtitle — Figma 2207:1999-2002 */}
      <div className="mb-4">
        <h2 className="font-bold text-[20px] leading-[28px] text-[#101828]">
          Mẫu B.IV.4: Báo cáo tình hình thực hiện các cam kết/thỏa thuận
        </h2>
        <p className="text-[14px] text-[#4a5565] mt-1">Hợp tác đầu tư/Chủ trương đầu tư</p>
      </div>

      {/* Card: Thông tin đơn vị — Figma 2207:2003 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Thông tin đơn vị</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label required={!isView} htmlFor="coQuanLapBaoCao">Cơ quan lập báo cáo</Label>
            <Input
              id="coQuanLapBaoCao"
              placeholder="Nhập tên cơ quan lập báo cáo"
              value={coQuanLapBaoCao}
              onChange={(e) => onCoQuanChange(e.target.value)}
              readOnly={isView}
              className={roFieldCls}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label required={!isView} htmlFor="nam3">Năm</Label>
            <div className="relative">
              <select
                id="nam3"
                className={`w-full h-10 pl-3 pr-8 bg-[#f3f3f5] border border-transparent rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer ${isView ? 'bg-[#f9fafb]' : ''}`}
                value={nam}
                onChange={(e) => onNamChange(e.target.value)}
                disabled={isView}
              >
                <option value="">Chọn năm</option>
                {[2022, 2023, 2024, 2025, 2026].map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]" fill="none" viewBox="0 0 16 16">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </Card>

      {/* Card: Danh sách cam kết đầu tư — Figma 2207:2020 */}
      <Card padded={false} className="mb-6">
        <div className="p-6 pb-4 flex items-center justify-between">
          <CardTitle>Danh sách cam kết đầu tư</CardTitle>
          {!isView && (
            <button
              onClick={onAddRow}
              className="inline-flex items-center gap-1.5 h-8 px-3 text-[14px] font-medium rounded-[8px] bg-white border border-[#a50000] text-[#a50000] hover:bg-[#fff5f5] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Thêm hàng
            </button>
          )}
        </div>
        <BIV4Table
          rows={rows}
          isView={isView}
          onRowChange={onRowChange}
          onDeleteRow={onDeleteRow}
          onProjectSelect={onProjectSelect}
        />
      </Card>
    </>
  );
}

// ===== TAB 4 — DỰ ÁN ĐTNN (Mẫu A.IV.4) =====

function Tab4DuAnDTNN({
  isView,
  rows,
  coQuanLapBaoCao,
  nam,
  onCoQuanChange,
  onNamChange,
  onRowChange,
  onAddRow,
  onDeleteRow,
}: {
  isView: boolean;
  rows: AIV4Row[];
  coQuanLapBaoCao: string;
  nam: string;
  onCoQuanChange: (v: string) => void;
  onNamChange: (v: string) => void;
  onRowChange: (key: string, field: keyof AIV4Row, value: string | number) => void;
  onAddRow: () => void;
  onDeleteRow: (key: string) => void;
}) {
  const roFieldCls = isView ? 'bg-[#f9fafb]' : '';

  return (
    <>
      {/* Form subtitle — Figma 2207:2140-2143 */}
      <div className="mb-4">
        <h2 className="font-bold text-[20px] leading-[28px] text-[#101828]">
          Mẫu A.IV.4: Danh mục dự án ĐTNN đang có nhà đầu tư quan tâm
        </h2>
        <p className="text-[14px] text-[#4a5565] mt-1">Hợp tác đầu tư/Chủ trương đầu tư</p>
      </div>

      {/* Card: Thông tin đơn vị — Figma 2207:2144 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Thông tin đơn vị</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label required={!isView} htmlFor="coQuanLapBaoCao4">Cơ quan lập báo cáo</Label>
            <Input
              id="coQuanLapBaoCao4"
              placeholder="Nhập tên cơ quan lập báo cáo"
              value={coQuanLapBaoCao}
              onChange={(e) => onCoQuanChange(e.target.value)}
              readOnly={isView}
              className={roFieldCls}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label required={!isView} htmlFor="nam4">Năm</Label>
            <div className="relative">
              <select
                id="nam4"
                className={`w-full h-10 pl-3 pr-8 bg-[#f3f3f5] border border-transparent rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer ${isView ? 'bg-[#f9fafb]' : ''}`}
                value={nam}
                onChange={(e) => onNamChange(e.target.value)}
                disabled={isView}
              >
                <option value="">Chọn năm</option>
                {[2022, 2023, 2024, 2025, 2026].map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]" fill="none" viewBox="0 0 16 16">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </Card>

      {/* Card: Danh sách cam kết đầu tư (Tab 4) — Figma 2207:2161 */}
      <Card padded={false} className="mb-6">
        <div className="p-6 pb-4 flex items-center justify-between">
          <CardTitle>Danh sách cam kết đầu tư</CardTitle>
          {!isView && (
            <button
              onClick={onAddRow}
              className="inline-flex items-center gap-1.5 h-8 px-3 text-[14px] font-medium rounded-[8px] bg-white border border-[#a50000] text-[#a50000] hover:bg-[#fff5f5] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Thêm hàng
            </button>
          )}
        </div>
        <AIV4Table
          rows={rows}
          isView={isView}
          onRowChange={onRowChange}
          onDeleteRow={onDeleteRow}
        />
      </Card>
    </>
  );
}

// ===== MAIN COMPONENT =====

export default function ReportCommitmentForm({ mode = 'create' }: ReportCommitmentFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isView = mode === 'view';
  const isCreate = mode === 'create';

  // Tab 3 is the primary active tab for this feature (Figma 2207:1959)
  const [activeTab, setActiveTab] = useState<ActiveTab>('tab3');

  // Shared fields (same for Tab 3 and Tab 4)
  const [coQuanLapBaoCao, setCoQuanLapBaoCao] = useState(isCreate ? '' : 'Bộ Kế hoạch và Đầu tư');
  const [nam, setNam] = useState(isCreate ? '' : '2026');

  // B.IV.4 rows (Tab 3)
  const [biv4Rows, setBiv4Rows] = useState<BIV4Row[]>(isCreate ? initialBIV4Rows : [
    {
      key: 'r1',
      stt: 1,
      tenDuAn: 'Dự án nhà máy sản xuất linh kiện điện tử',
      doiTac: 'Samsung Electronics',
      diaDiemDuAn: 'KCN Bắc Ninh',
      nganhLinhVuc: 'Điện tử, bán dẫn',
      quyMoCongSuat: '500 MW',
      tongVonDT: 500000,
      tinhHinhTrienKhai: 'Đang triển khai giai đoạn 1',
    },
  ]);

  // A.IV.4 rows (Tab 4)
  const [aiv4Rows, setAiv4Rows] = useState<AIV4Row[]>(isCreate ? [] : initialAIV4Rows);

  // B.IV.4 handlers
  function handleAddBIV4Row() {
    setBiv4Rows((prev) => [
      ...prev,
      {
        key: `r${Date.now()}`,
        stt: prev.length + 1,
        tenDuAn: '',
        doiTac: '',
        diaDiemDuAn: '',
        nganhLinhVuc: '',
        quyMoCongSuat: '',
        tongVonDT: 0,
        tinhHinhTrienKhai: '',
      },
    ]);
  }

  function handleDeleteBIV4Row(key: string) {
    setBiv4Rows((prev) => prev.filter((r) => r.key !== key).map((r, i) => ({ ...r, stt: i + 1 })));
  }

  function handleBIV4RowChange(key: string, field: keyof BIV4Row, value: string | number) {
    setBiv4Rows((prev) => prev.map((r) => (r.key === key ? { ...r, [field]: value } : r)));
  }

  function handleBIV4ProjectSelect(key: string, projectCode: string) {
    setBiv4Rows((prev) => prev.map((r) => {
      if (r.key !== key) return r;
      const data = biv4ProjectDb[projectCode];
      if (data) {
        return { ...r, ...data };
      }
      return { ...r, tenDuAn: '', doiTac: '', diaDiemDuAn: '', nganhLinhVuc: '', quyMoCongSuat: '', tongVonDT: 0, tinhHinhTrienKhai: '' };
    }));
  }

  // A.IV.4 handlers
  function handleAddAIV4Row() {
    setAiv4Rows((prev) => [
      ...prev,
      {
        key: `r${Date.now()}`,
        stt: prev.length + 1,
        tenNhaDauTu: '',
        nuocDangKy: '',
        tenDuAn: '',
        vonDangKyDuKien: 0,
        nganhCap1: '',
        mucTieuDuAn: '',
        diaDiem: '',
        dienTichDat: 0,
        thuocDanhMucQuocGia: '',
        thuocDanhMucLinhVuc: '',
        thuocDanhMucDiaPhuong: '',
        deXuat: '',
      },
    ]);
  }

  function handleDeleteAIV4Row(key: string) {
    setAiv4Rows((prev) => prev.filter((r) => r.key !== key).map((r, i) => ({ ...r, stt: i + 1 })));
  }

  function handleAIV4RowChange(key: string, field: keyof AIV4Row, value: string | number) {
    setAiv4Rows((prev) => prev.map((r) => (r.key === key ? { ...r, [field]: value } : r)));
  }

  function handleSaveDraft() { alert('Đã lưu nháp báo cáo B.IV.4 / A.IV.4.'); }
  function handleSend() {
    if (confirm('Gửi báo cáo? Sau khi gửi sẽ không thể chỉnh sửa trực tiếp.')) {
      alert('Đã gửi báo cáo B.IV.4 / A.IV.4.');
      navigate('/feature-5');
    }
  }
  function handlePrint() { window.print(); }

  const tabs: { key: ActiveTab; label: string }[] = [
    { key: 'tab1', label: 'Tab 1: Báo cáo kết quả' },
    { key: 'tab2', label: 'Tab 2: Biểu tổng hợp' },
    { key: 'tab3', label: 'Tab 3: Cam kết đầu tư' },
    { key: 'tab4', label: 'Tab 4: Dự án ĐTNN' },
  ];

  return (
    <Container>
      {/* Breadcrumb */}
      <nav className="text-[13px] text-[#6b7280] mb-2 flex items-center gap-1">
        <span className="cursor-pointer hover:text-[#a50000]" onClick={() => navigate('/')}>Trang chủ</span>
        <span>/</span>
        <span className="cursor-pointer hover:text-[#a50000]" onClick={() => navigate('/feature-5')}>Báo cáo cam kết ĐT</span>
        <span>/</span>
        <span className="text-[#1f1f1f]">
          {mode === 'create' ? 'Lập báo cáo' : mode === 'edit' ? 'Chỉnh sửa' : 'Xem chi tiết'}
        </span>
      </nav>

      {/* Page title — Figma 2207:1964-1966 */}
      <div className="flex items-start justify-between mb-0">
        <div>
          <h1 className="font-bold text-[24px] leading-[32px] text-[#101828]">
            LẬP BỘ BÁO CÁO XÚC TIẾN ĐẦU TƯ
          </h1>
        </div>
        {!isCreate && (
          <Badge tone={mode === 'view' ? 'success' : 'warning'}>
            {mode === 'view' ? 'Đã nộp' : 'Lưu nháp'}
          </Badge>
        )}
      </div>

      {/* Tab bar — Figma 2207:1978 — Tab 3 active by default */}
      <div className="border-b border-[#e5e7eb] mb-6 mt-4">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-[25px] py-[13px] text-[14px] font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'border border-[#a50000] text-[#a50000]'
                  : 'border border-transparent text-[#0a0a0a] hover:text-[#a50000]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'tab1' && <Tab1BaoCaoKetQua />}
      {activeTab === 'tab2' && <Tab2BieuTongHop />}
      {activeTab === 'tab3' && (
        <Tab3CamKetDauTu
          isView={isView}
          rows={biv4Rows}
          coQuanLapBaoCao={coQuanLapBaoCao}
          nam={nam}
          onCoQuanChange={setCoQuanLapBaoCao}
          onNamChange={setNam}
          onRowChange={handleBIV4RowChange}
          onAddRow={handleAddBIV4Row}
          onDeleteRow={handleDeleteBIV4Row}
          onProjectSelect={handleBIV4ProjectSelect}
        />
      )}
      {activeTab === 'tab4' && (
        <Tab4DuAnDTNN
          isView={isView}
          rows={aiv4Rows}
          coQuanLapBaoCao={coQuanLapBaoCao}
          nam={nam}
          onCoQuanChange={setCoQuanLapBaoCao}
          onNamChange={setNam}
          onRowChange={handleAIV4RowChange}
          onAddRow={handleAddAIV4Row}
          onDeleteRow={handleDeleteAIV4Row}
        />
      )}

      {/* ACTION BAR — Figma 2207:2086 (Tab 3) / 2207:2339 (Tab 4 — has Gửi báo cáo) */}
      <div className="flex items-center justify-end gap-4 py-4 border-t border-[#e5e7eb] mt-6">
        <Button variant="outline" onClick={() => navigate('/feature-5')}>
          Hủy
        </Button>
        <Button
          variant="outline"
          onClick={() => id ? navigate(`/feature-5/${id}/view`) : alert('Lưu nháp trước để xem')}
        >
          Xem
        </Button>
        <Button variant="outline" onClick={handlePrint}>
          In bộ hồ sơ
        </Button>
        {!isView && (
          <>
            <Button variant="secondary" onClick={handleSaveDraft}>
              Lưu nháp
            </Button>
            {activeTab === 'tab4' && (
              <Button variant="primary" onClick={handleSend}>
                Gửi báo cáo
              </Button>
            )}
          </>
        )}
        {isView && (
          <Button variant="outline" onClick={() => navigate(`/feature-5/${id}/edit`)}>
            Chỉnh sửa
          </Button>
        )}
      </div>
    </Container>
  );
}
