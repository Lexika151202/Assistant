// Feature: 4 - Biểu tổng hợp tình hình thực hiện chương trình xúc tiến ĐT
// Screen: Form Lập / Chỉnh sửa / Xem báo cáo (Mẫu B.IV.3)
// Figma Node: 2207:1756, 2207:1944
// Functions: 17 (Lập+Lưu nháp+Gửi), 19 (Chỉnh sửa), 22 (In)

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../../components/shared/Container';
import { Button } from '../../components/shared/Button';
import { Card, CardHeader, CardTitle } from '../../components/shared/Card';
import { Input } from '../../components/shared/Input';
import { Label } from '../../components/shared/Label';
import { Badge } from '../../components/shared/Badge';

interface ReportXTDTSummaryFormProps {
  mode?: 'create' | 'edit' | 'view';
}

type ActiveTab = 'tab1' | 'tab2' | 'tab3' | 'tab4';

// ===== B.IV.3 TABLE TYPES =====

interface BIV3Row {
  key: string;
  stt: number;
  tenHoatDong: string;
  loaiHoatDong: string;
  thoiGianTuChuc: string;
  donViChuTri: string;
  diaDiemTrongNuoc: string;
  diaDiemNuocNgoai: string;
  diaBan: string;
  donViPhoiHop: string;
  kinhPhiNSBo: number;
  kinhPhiCTXTTDT: number;
  kinhPhiKhac: number;
  quyetToanNSBo: number;
  quyetToanCTXTTDT: number;
  quyetToanKhac: number;
}

const initialRows: BIV3Row[] = [
  {
    key: 'r1',
    stt: 1,
    tenHoatDong: '',
    loaiHoatDong: '',
    thoiGianTuChuc: '',
    donViChuTri: '',
    diaDiemTrongNuoc: '',
    diaDiemNuocNgoai: '',
    diaBan: '',
    donViPhoiHop: '',
    kinhPhiNSBo: 0,
    kinhPhiCTXTTDT: 0,
    kinhPhiKhac: 0,
    quyetToanNSBo: 0,
    quyetToanCTXTTDT: 0,
    quyetToanKhac: 0,
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

function Tab3CamKetDauTu() {
  return (
    <Card padded={false} className="mb-6">
      <div className="p-6 pb-4">
        <CardTitle>Danh sách cam kết đầu tư</CardTitle>
      </div>
      <div className="px-6 pb-6 text-[14px] text-[#6b7280] italic">
        Nội dung Tab 3 — Cam kết đầu tư
      </div>
    </Card>
  );
}

function Tab4DuAnDTNN() {
  return (
    <Card padded={false} className="mb-6">
      <div className="p-6 pb-4">
        <CardTitle>Danh sách dự án đầu tư nước ngoài</CardTitle>
      </div>
      <div className="px-6 pb-6 text-[14px] text-[#6b7280] italic">
        Nội dung Tab 4 — Dự án ĐTNN
      </div>
    </Card>
  );
}

// ===== BIV3 TABLE COMPONENT (Tab 2 — Biểu tổng hợp) =====

function BIV3Table({
  rows,
  isView,
  onRowChange,
  onDeleteRow,
}: {
  rows: BIV3Row[];
  isView: boolean;
  onRowChange: (key: string, field: keyof BIV3Row, value: string | number) => void;
  onDeleteRow: (key: string) => void;
}) {
  const totals = rows.reduce(
    (acc, r) => ({
      kinhPhiNSBo: acc.kinhPhiNSBo + r.kinhPhiNSBo,
      kinhPhiCTXTTDT: acc.kinhPhiCTXTTDT + r.kinhPhiCTXTTDT,
      kinhPhiKhac: acc.kinhPhiKhac + r.kinhPhiKhac,
      quyetToanNSBo: acc.quyetToanNSBo + r.quyetToanNSBo,
      quyetToanCTXTTDT: acc.quyetToanCTXTTDT + r.quyetToanCTXTTDT,
      quyetToanKhac: acc.quyetToanKhac + r.quyetToanKhac,
    }),
    { kinhPhiNSBo: 0, kinhPhiCTXTTDT: 0, kinhPhiKhac: 0, quyetToanNSBo: 0, quyetToanCTXTTDT: 0, quyetToanKhac: 0 }
  );

  const inputCls = 'w-full bg-[#f3f3f5] border border-transparent rounded-[8px] px-2 py-1 text-[13px] text-[#0a0a0a] outline-none focus:border-[#a50000] focus:bg-white transition-colors';
  const numInputCls = inputCls + ' text-right';
  const thCls = 'border border-[#d1d5dc] px-2 py-2 text-[13px] font-bold text-[#0a0a0a] text-center bg-[#f9fafb]';
  const tdCls = 'border border-[#d1d5dc] px-1 py-1 text-[13px] text-[#0a0a0a]';

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse" style={{ minWidth: '2100px' }}>
        <thead>
          {/* Row 1 — top-level headers */}
          <tr>
            <th className={thCls} rowSpan={2} style={{ width: 52 }}>STT</th>
            <th className={thCls} rowSpan={2} style={{ width: 200 }}>Tên hoạt động xúc tiến đầu tư</th>
            <th className={thCls} rowSpan={2} style={{ width: 150 }}>Loại hoạt động</th>
            <th className={thCls} rowSpan={2} style={{ width: 160 }}>Thời gian tổ chức</th>
            <th className={thCls} rowSpan={2} style={{ width: 150 }}>Đơn vị chủ trì thực hiện</th>
            <th className={thCls} colSpan={2} style={{ width: 240 }}>Địa điểm tổ chức</th>
            <th className={thCls} rowSpan={2} style={{ width: 150 }}>Địa bàn/tỉnh/vùng kêu gọi đầu tư</th>
            <th className={thCls} rowSpan={2} style={{ width: 150 }}>Đơn vị phối hợp</th>
            <th className={thCls} colSpan={3} style={{ width: 340 }}>Kinh phí thực hiện</th>
            <th className={thCls} colSpan={3} style={{ width: 340 }}>Kinh phí quyết toán</th>
            {!isView && <th className={thCls} rowSpan={2} style={{ width: 49 }}>Hành động</th>}
          </tr>
          {/* Row 2 — sub-headers */}
          <tr>
            <th className={thCls} style={{ width: 120 }}>Trong nước</th>
            <th className={thCls} style={{ width: 120 }}>Nước ngoài</th>
            <th className={thCls} style={{ width: 120 }}>NS Bộ/địa phương</th>
            <th className={thCls} style={{ width: 120 }}>CT XTTĐT quốc gia</th>
            <th className={thCls} style={{ width: 100 }}>Khác</th>
            <th className={thCls} style={{ width: 120 }}>NS Bộ/địa phương</th>
            <th className={thCls} style={{ width: 120 }}>CT XTTĐT quốc gia</th>
            <th className={thCls} style={{ width: 100 }}>Khác</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="hover:bg-[#f9fafb]">
              <td className={tdCls + ' text-center'}>{row.stt}</td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.tenHoatDong}</span>
                ) : (
                  <input
                    className={inputCls}
                    placeholder="Nhập tên hoạt động"
                    value={row.tenHoatDong}
                    onChange={(e) => onRowChange(row.key, 'tenHoatDong', e.target.value)}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.loaiHoatDong}</span>
                ) : (
                  <select
                    className={inputCls + ' appearance-none cursor-pointer'}
                    value={row.loaiHoatDong}
                    onChange={(e) => onRowChange(row.key, 'loaiHoatDong', e.target.value)}
                  >
                    <option value="">Chọn loại</option>
                    <option value="Hội nghị">Hội nghị</option>
                    <option value="Hội thảo">Hội thảo</option>
                    <option value="Roadshow">Roadshow</option>
                    <option value="Triển lãm">Triển lãm</option>
                    <option value="Khác">Khác</option>
                  </select>
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.thoiGianTuChuc}</span>
                ) : (
                  <input
                    className={inputCls}
                    placeholder="VD: Quý I/2026"
                    value={row.thoiGianTuChuc}
                    onChange={(e) => onRowChange(row.key, 'thoiGianTuChuc', e.target.value)}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.donViChuTri}</span>
                ) : (
                  <input
                    className={inputCls}
                    placeholder="Đơn vị"
                    value={row.donViChuTri}
                    onChange={(e) => onRowChange(row.key, 'donViChuTri', e.target.value)}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.diaDiemTrongNuoc}</span>
                ) : (
                  <input
                    className={inputCls}
                    placeholder="Địa điểm"
                    value={row.diaDiemTrongNuoc}
                    onChange={(e) => onRowChange(row.key, 'diaDiemTrongNuoc', e.target.value)}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.diaDiemNuocNgoai}</span>
                ) : (
                  <input
                    className={inputCls}
                    placeholder="Địa điểm"
                    value={row.diaDiemNuocNgoai}
                    onChange={(e) => onRowChange(row.key, 'diaDiemNuocNgoai', e.target.value)}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.diaBan}</span>
                ) : (
                  <input
                    className={inputCls}
                    placeholder="Địa bàn"
                    value={row.diaBan}
                    onChange={(e) => onRowChange(row.key, 'diaBan', e.target.value)}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span>{row.donViPhoiHop}</span>
                ) : (
                  <input
                    className={inputCls}
                    placeholder="Đơn vị"
                    value={row.donViPhoiHop}
                    onChange={(e) => onRowChange(row.key, 'donViPhoiHop', e.target.value)}
                  />
                )}
              </td>
              {/* Kinh phí */}
              <td className={tdCls}>
                {isView ? (
                  <span className="block text-right">{row.kinhPhiNSBo}</span>
                ) : (
                  <input
                    type="number"
                    className={numInputCls}
                    value={row.kinhPhiNSBo}
                    onChange={(e) => onRowChange(row.key, 'kinhPhiNSBo', Number(e.target.value))}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span className="block text-right">{row.kinhPhiCTXTTDT}</span>
                ) : (
                  <input
                    type="number"
                    className={numInputCls}
                    value={row.kinhPhiCTXTTDT}
                    onChange={(e) => onRowChange(row.key, 'kinhPhiCTXTTDT', Number(e.target.value))}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span className="block text-right">{row.kinhPhiKhac}</span>
                ) : (
                  <input
                    type="number"
                    className={numInputCls}
                    value={row.kinhPhiKhac}
                    onChange={(e) => onRowChange(row.key, 'kinhPhiKhac', Number(e.target.value))}
                  />
                )}
              </td>
              {/* Kinh phí quyết toán */}
              <td className={tdCls}>
                {isView ? (
                  <span className="block text-right">{row.quyetToanNSBo}</span>
                ) : (
                  <input
                    type="number"
                    className={numInputCls}
                    value={row.quyetToanNSBo}
                    onChange={(e) => onRowChange(row.key, 'quyetToanNSBo', Number(e.target.value))}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span className="block text-right">{row.quyetToanCTXTTDT}</span>
                ) : (
                  <input
                    type="number"
                    className={numInputCls}
                    value={row.quyetToanCTXTTDT}
                    onChange={(e) => onRowChange(row.key, 'quyetToanCTXTTDT', Number(e.target.value))}
                  />
                )}
              </td>
              <td className={tdCls}>
                {isView ? (
                  <span className="block text-right">{row.quyetToanKhac}</span>
                ) : (
                  <input
                    type="number"
                    className={numInputCls}
                    value={row.quyetToanKhac}
                    onChange={(e) => onRowChange(row.key, 'quyetToanKhac', Number(e.target.value))}
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
          {/* TỔNG row */}
          <tr className="bg-[#f3f4f6]">
            <td className={tdCls + ' font-semibold text-right'} colSpan={9}>TỔNG</td>
            <td className={tdCls + ' text-right font-semibold'}>{totals.kinhPhiNSBo}</td>
            <td className={tdCls + ' text-right font-semibold'}>{totals.kinhPhiCTXTTDT}</td>
            <td className={tdCls + ' text-right font-semibold'}>{totals.kinhPhiKhac}</td>
            <td className={tdCls + ' text-right font-semibold'}>{totals.quyetToanNSBo}</td>
            <td className={tdCls + ' text-right font-semibold'}>{totals.quyetToanCTXTTDT}</td>
            <td className={tdCls + ' text-right font-semibold'}>{totals.quyetToanKhac}</td>
            {!isView && <td className={tdCls} />}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ===== TAB 2 — BIỂU TỔNG HỢP =====

function Tab2BieuTongHop({
  isView,
  rows,
  kemTheoSo,
  nam,
  tenBo,
  onKemTheoSoChange,
  onNamChange,
  onTenBoChange,
  onRowChange,
  onAddRow,
  onDeleteRow,
}: {
  isView: boolean;
  rows: BIV3Row[];
  kemTheoSo: string;
  nam: string;
  tenBo: string;
  onKemTheoSoChange: (v: string) => void;
  onNamChange: (v: string) => void;
  onTenBoChange: (v: string) => void;
  onRowChange: (key: string, field: keyof BIV3Row, value: string | number) => void;
  onAddRow: () => void;
  onDeleteRow: (key: string) => void;
}) {
  const roFieldCls = isView ? 'bg-[#f9fafb]' : '';

  return (
    <>
      {/* Form subtitle */}
      <div className="mb-4">
        <h2 className="font-bold text-[20px] leading-[28px] text-[#101828]">
          Mẫu B.IV.3: Biểu tổng hợp tình hình thực hiện chương trình xúc tiến đầu tư
        </h2>
      </div>

      {/* Card: Thông tin liên kết — Figma 2207:1798 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Thông tin liên kết</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-4">
          {/* Kèm theo công văn số */}
          <div className="flex flex-col gap-1.5">
            <Label required={!isView} htmlFor="kemTheoSo">Kèm theo công văn số</Label>
            <Input
              id="kemTheoSo"
              placeholder="Số công văn"
              value={kemTheoSo}
              onChange={(e) => onKemTheoSoChange(e.target.value)}
              readOnly={isView}
              className={roFieldCls}
            />
          </div>
          {/* Năm */}
          <div className="flex flex-col gap-1.5">
            <Label required={!isView} htmlFor="nam">Năm</Label>
            <div className="relative">
              <select
                id="nam"
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
          {/* Tên Bộ/UBND cấp tỉnh lập báo cáo */}
          <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
            <Label required={!isView} htmlFor="tenBo">Tên Bộ/UBND cấp tỉnh lập báo cáo</Label>
            <Input
              id="tenBo"
              placeholder="Bộ tài chính"
              value={tenBo}
              onChange={(e) => onTenBoChange(e.target.value)}
              readOnly={isView}
              className={roFieldCls}
            />
          </div>
        </div>
      </Card>

      {/* Card: Bảng dữ liệu — Figma 2207:1819 */}
      <Card padded={false} className="mb-6">
        <div className="p-6 pb-4 flex items-center justify-between">
          <CardTitle>Bảng dữ liệu</CardTitle>
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
        <BIV3Table
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

export default function ReportXTDTSummaryForm({ mode = 'create' }: ReportXTDTSummaryFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isView = mode === 'view';
  const isCreate = mode === 'create';

  const [activeTab, setActiveTab] = useState<ActiveTab>('tab2');

  // Thông tin liên kết fields
  const [kemTheoSo, setKemTheoSo] = useState(isCreate ? '' : 'CV-2025-001');
  const [nam, setNam] = useState(isCreate ? '' : '2026');
  const [tenBo, setTenBo] = useState(isCreate ? '' : 'Bộ tài chính');

  // B.IV.3 table rows
  const [rows, setRows] = useState<BIV3Row[]>(isCreate ? initialRows : [
    {
      key: 'r1',
      stt: 1,
      tenHoatDong: 'Hội nghị xúc tiến đầu tư vào lĩnh vực công nghệ cao',
      loaiHoatDong: 'Hội nghị',
      thoiGianTuChuc: 'Quý I/2026',
      donViChuTri: 'Bộ Kế hoạch và Đầu tư',
      diaDiemTrongNuoc: 'Hà Nội',
      diaDiemNuocNgoai: '',
      diaBan: 'Hà Nội',
      donViPhoiHop: 'Cục Đầu tư nước ngoài',
      kinhPhiNSBo: 500000000,
      kinhPhiCTXTTDT: 0,
      kinhPhiKhac: 0,
      quyetToanNSBo: 480000000,
      quyetToanCTXTTDT: 0,
      quyetToanKhac: 0,
    },
  ]);

  function handleAddRow() {
    setRows((prev) => [
      ...prev,
      {
        key: `r${Date.now()}`,
        stt: prev.length + 1,
        tenHoatDong: '',
        loaiHoatDong: '',
        thoiGianTuChuc: '',
        donViChuTri: '',
        diaDiemTrongNuoc: '',
        diaDiemNuocNgoai: '',
        diaBan: '',
        donViPhoiHop: '',
        kinhPhiNSBo: 0,
        kinhPhiCTXTTDT: 0,
        kinhPhiKhac: 0,
        quyetToanNSBo: 0,
        quyetToanCTXTTDT: 0,
        quyetToanKhac: 0,
      },
    ]);
  }

  function handleDeleteRow(key: string) {
    setRows((prev) => prev.filter((r) => r.key !== key).map((r, i) => ({ ...r, stt: i + 1 })));
  }

  function handleRowChange(key: string, field: keyof BIV3Row, value: string | number) {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, [field]: value } : r)));
  }

  function handleSaveDraft() { alert('Đã lưu nháp báo cáo B.IV.3.'); }
  function handleSend() {
    if (confirm('Gửi báo cáo? Sau khi gửi sẽ không thể chỉnh sửa trực tiếp.')) {
      alert('Đã gửi báo cáo B.IV.3.');
      navigate('/feature-4');
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
        <span className="cursor-pointer hover:text-[#a50000]" onClick={() => navigate('/feature-4')}>Báo cáo XTDT</span>
        <span>/</span>
        <span className="text-[#1f1f1f]">
          {mode === 'create' ? 'Lập báo cáo' : mode === 'edit' ? 'Chỉnh sửa' : 'Xem chi tiết'}
        </span>
      </nav>

      {/* Page title — Figma 2207:1761 */}
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

      {/* Tab bar — Figma 2207:1775 — Tab 2 active by default */}
      <div className="border-b border-[#e5e7eb] mb-6 mt-4">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-[25px] py-[13px] text-[14px] font-medium whitespace-nowrap transition-colors ${activeTab === tab.key
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
      {activeTab === 'tab2' && (
        <Tab2BieuTongHop
          isView={isView}
          rows={rows}
          kemTheoSo={kemTheoSo}
          nam={nam}
          tenBo={tenBo}
          onKemTheoSoChange={setKemTheoSo}
          onNamChange={setNam}
          onTenBoChange={setTenBo}
          onRowChange={handleRowChange}
          onAddRow={handleAddRow}
          onDeleteRow={handleDeleteRow}
        />
      )}
      {activeTab === 'tab3' && <Tab3CamKetDauTu />}
      {activeTab === 'tab4' && <Tab4DuAnDTNN />}

      {/* ACTION BAR — Figma 2207:1944 */}
      <div className="flex items-center justify-end gap-4 py-4 border-t border-[#e5e7eb] mt-6">
        <Button variant="outline" onClick={() => navigate('/feature-4')}>
          Hủy
        </Button>
        <Button
          variant="outline"
          onClick={() => id ? navigate(`/feature-4/${id}/view`) : alert('Lưu nháp trước để xem')}
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
            <Button variant="primary" onClick={handleSend}>
              Gửi báo cáo
            </Button>
          </>
        )}
        {isView && (
          <Button variant="outline" onClick={() => navigate(`/feature-4/${id}/edit`)}>
            Chỉnh sửa
          </Button>
        )}
      </div>
    </Container>
  );
}
