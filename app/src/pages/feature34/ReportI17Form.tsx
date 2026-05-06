// Feature: 34 - Báo cáo tình hình hoạt động đầu tư ra nước ngoài cho năm tài chính (Mẫu I.17)
// Screen: Form Lập / Chỉnh sửa / Xem báo cáo (Mẫu I.17)
// Figma Node: 1933:1088, 2322:1281
// Functions: 191 (Lập+Lưu nháp+Gửi), 193 (Chỉnh sửa), 196 (In)

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../../components/shared/Container';
import { Heading } from '../../components/shared/Heading';
import { Button } from '../../components/shared/Button';
import { Card, CardHeader, CardTitle } from '../../components/shared/Card';
import { Input } from '../../components/shared/Input';
import { Textarea } from '../../components/shared/Textarea';
import { Label } from '../../components/shared/Label';
import { Checkbox } from '../../components/shared/Checkbox';
import { Badge } from '../../components/shared/Badge';

interface ReportI17FormProps {
  mode?: 'create' | 'edit' | 'view';
}

interface Investor {
  id: string;
  name: string;
}

// Bảng I — Tình trạng hoạt động của tổ chức kinh tế ở nước ngoài
interface TinhTrangRow {
  key: string;
  stt: string;
  label: string;
  unit: string;
  isGroup?: boolean;
  indent?: number;
}

const tinhTrangRows: TinhTrangRow[] = [
  { key: 'tt1', stt: 'I', label: 'Vốn đầu tư', unit: '', isGroup: true },
  { key: 'tt1a', stt: '1', label: 'Vốn đăng ký đầu tư ra nước ngoài (theo Giấy chứng nhận)', unit: 'USD', indent: 1 },
  { key: 'tt1b', stt: '2', label: 'Vốn thực hiện đầu tư ra nước ngoài lũy kế đến thời điểm báo cáo', unit: 'USD', indent: 1 },
  { key: 'tt1b1', stt: '2.1', label: 'Chuyển tiền ra nước ngoài', unit: 'USD', indent: 2 },
  { key: 'tt1b2', stt: '2.2', label: 'Máy móc thiết bị, hàng hóa chuyển ra nước ngoài', unit: 'USD', indent: 2 },
  { key: 'tt1b3', stt: '2.3', label: 'Tài sản khác', unit: 'USD', indent: 2 },
  { key: 'tt1c', stt: '3', label: 'Vốn được điều chuyển về Việt Nam trong kỳ báo cáo', unit: 'USD', indent: 1 },

  { key: 'tt2', stt: 'II', label: 'Doanh thu', unit: 'USD', isGroup: true },
  { key: 'tt2a', stt: '4', label: 'Doanh thu trong kỳ báo cáo', unit: 'USD', indent: 1 },
  { key: 'tt2b', stt: '5', label: 'Doanh thu lũy kế đến thời điểm báo cáo', unit: 'USD', indent: 1 },

  { key: 'tt3', stt: 'III', label: 'Lợi nhuận', unit: '', isGroup: true },
  { key: 'tt3a', stt: '6', label: 'Lợi nhuận/lỗ trong kỳ báo cáo', unit: 'USD', indent: 1 },
  { key: 'tt3b', stt: '7', label: 'Lợi nhuận/lỗ lũy kế đến thời điểm báo cáo', unit: 'USD', indent: 1 },
  { key: 'tt3c', stt: '8', label: 'Lợi nhuận chuyển về Việt Nam trong kỳ báo cáo', unit: 'USD', indent: 1 },
  { key: 'tt3d', stt: '9', label: 'Lợi nhuận chuyển về Việt Nam lũy kế đến thời điểm báo cáo', unit: 'USD', indent: 1 },

  { key: 'tt4', stt: 'IV', label: 'Lao động', unit: '', isGroup: true },
  { key: 'tt4a', stt: '10', label: 'Tổng số lao động tại thời điểm báo cáo', unit: 'Người', indent: 1 },
  { key: 'tt4a1', stt: '10.1', label: 'Lao động người Việt Nam', unit: 'Người', indent: 2 },
  { key: 'tt4a2', stt: '10.2', label: 'Lao động người nước ngoài', unit: 'Người', indent: 2 },

  { key: 'tt5', stt: 'V', label: 'Nghĩa vụ thuế và tài chính tại nước tiếp nhận đầu tư', unit: 'USD', isGroup: true },
  { key: 'tt5a', stt: '11', label: 'Số thuế đã nộp trong kỳ báo cáo', unit: 'USD', indent: 1 },
  { key: 'tt5b', stt: '12', label: 'Số thuế đã nộp lũy kế đến thời điểm báo cáo', unit: 'USD', indent: 1 },
];

// Bảng II — Đánh giá kết quả hoạt động đầu tư
const danhGiaOptions = [
  { value: 'hd_binh_thuong', label: 'Hoạt động bình thường' },
  { value: 'gap_kho_khan', label: 'Gặp khó khăn, vướng mắc trong quá trình hoạt động' },
  { value: 'tam_dung', label: 'Tạm dừng hoạt động' },
  { value: 'cham_dut', label: 'Chấm dứt hoạt động' },
  { value: 'giai_the', label: 'Giải thể tổ chức kinh tế ở nước ngoài' },
  { value: 'chuyen_nhuong', label: 'Chuyển nhượng dự án/phần vốn đầu tư' },
];

// Hồ sơ kèm theo
const hoSoOptions = [
  { value: 'bctc', label: 'Báo cáo tài chính năm' },
  { value: 'bckd', label: 'Báo cáo kết quả kinh doanh' },
  { value: 'bclntt', label: 'Chứng từ chuyển lợi nhuận về Việt Nam' },
  { value: 'khac', label: 'Tài liệu khác' },
];

export default function ReportI17Form({ mode = 'create' }: ReportI17FormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isView = mode === 'view';
  const isCreate = mode === 'create';

  // Thông tin chung
  const [reportYear, setReportYear] = useState(isCreate ? '' : '2025');
  const [giayCNSo, setGiayCNSo] = useState(isCreate ? '' : 'GCN-ĐTRNN-2024-001');
  const [ngayCap, setNgayCap] = useState(isCreate ? '' : '15/03/2024');
  const [dieuChinhLan, setDieuChinhLan] = useState('');
  const [tenDuAn, setTenDuAn] = useState(isCreate ? '' : 'Singapore Electronics Manufacturing Co., Ltd.');
  const [taiKhoanChuyenVon, setTaiKhoanChuyenVon] = useState('');
  const [soTaiKhoan, setSoTaiKhoan] = useState('');
  const [nganHang, setNganHang] = useState('');

  // Nhà đầu tư
  const [investors, setInvestors] = useState<Investor[]>([
    { id: '1', name: isCreate ? '' : 'Công ty Cổ phần ABC Việt Nam' },
  ]);

  // Bảng I — chỉ tiêu
  type IndicatorVal = { kyBaoCao: string; luyKe: string };
  const [indicatorValues, setIndicatorValues] = useState<Record<string, IndicatorVal>>(() => {
    const init: Record<string, IndicatorVal> = {};
    tinhTrangRows.forEach((r) => { init[r.key] = { kyBaoCao: '', luyKe: '' }; });
    return init;
  });

  // Bảng II — đánh giá
  const [danhGia, setDanhGia] = useState<Record<string, boolean>>({});
  const [danhGiaNote, setDanhGiaNote] = useState('');

  // Phần III — Kiến nghị
  const [kienNghi, setKienNghi] = useState('');

  // Phần IV — Cam kết
  const [camKet, setCamKet] = useState(false);
  const [nguoiDaiDien, setNguoiDaiDien] = useState('');
  const [chucVu, setChucVu] = useState('');
  const [ngayLap, setNgayLap] = useState('');

  // Phần V — Hồ sơ kèm theo
  const [hoSo, setHoSo] = useState<Record<string, boolean>>({});

  function addInvestor() {
    setInvestors((prev) => [...prev, { id: String(Date.now()), name: '' }]);
  }
  function removeInvestor(id: string) {
    setInvestors((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));
  }
  function updateInvestor(id: string, value: string) {
    setInvestors((prev) => prev.map((i) => (i.id === id ? { ...i, name: value } : i)));
  }
  function updateIndicator(key: string, field: keyof IndicatorVal, value: string) {
    setIndicatorValues((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  }

  function handleSaveDraft() { alert('Đã lưu nháp báo cáo I.17.'); }
  function handleSend() {
    if (confirm('Gửi báo cáo? Sau khi gửi sẽ không thể chỉnh sửa trực tiếp.')) {
      alert('Đã gửi báo cáo I.17.');
      navigate('/feature-34');
    }
  }
  function handlePrint() { window.print(); }

  const roFieldClass = isView ? 'bg-[#f9fafb]' : '';

  return (
    <Container>
      {/* Breadcrumb */}
      <nav className="text-[13px] text-[#6b7280] mb-2 flex items-center gap-1">
        <span className="cursor-pointer hover:text-[#a50000]" onClick={() => navigate('/')}>Trang chủ</span>
        <span>/</span>
        <span className="cursor-pointer hover:text-[#a50000]" onClick={() => navigate('/feature-34')}>Báo cáo định kỳ</span>
        <span>/</span>
        <span className="text-[#1f1f1f]">{mode === 'create' ? 'Lập báo cáo năm' : mode === 'edit' ? 'Chỉnh sửa' : 'Xem chi tiết'}</span>
      </nav>

      {/* Page title */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <Heading level={1} className="!text-[24px] !font-medium !leading-[36px] !text-[#1f1f1f]">
            Báo cáo tình hình hoạt động đầu tư ra nước ngoài cho năm tài chính (Mẫu I.17)
          </Heading>
          <p className="text-[13px] text-[#6b7280] mt-1">
            Mẫu I.17 — Tình hình hoạt động đầu tư ra nước ngoài cho năm tài chính
          </p>
        </div>
        {!isCreate && (
          <Badge tone={mode === 'view' ? 'success' : 'warning'}>
            {mode === 'view' ? 'Đã gửi' : 'Lưu nháp'}
          </Badge>
        )}
      </div>

      {/* ===== THÔNG TIN NHÀ ĐẦU TƯ ===== */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>THÔNG TIN NHÀ ĐẦU TƯ</CardTitle>
            {!isView && (
              <Button variant="outline" size="sm" onClick={addInvestor}>
                + Thêm nhà đầu tư
              </Button>
            )}
          </div>
        </CardHeader>

        <div className="flex flex-col gap-4">
          {investors.map((inv, idx) => (
            <div key={inv.id} className="border border-[#e5e7eb] rounded-[10px] p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[16px] font-medium text-[#1f1f1f]">Nhà đầu tư {idx + 1}</h4>
                {!isView && investors.length > 1 && (
                  <Button size="sm" variant="ghost" onClick={() => removeInvestor(inv.id)}>✕ Xóa</Button>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label required={!isView} htmlFor={`inv-name-${inv.id}`}>Tên nhà đầu tư</Label>
                <Input
                  id={`inv-name-${inv.id}`}
                  placeholder="Nhập tên nhà đầu tư"
                  value={inv.name}
                  onChange={(e) => updateInvestor(inv.id, e.target.value)}
                  readOnly={isView}
                  className={roFieldClass}
                />
              </div>
            </div>
          ))}

          {/* Số giấy chứng nhận */}
          <div className="flex flex-col gap-1.5">
            <Label required={!isView} htmlFor="giayCNSo">Số giấy chứng nhận đăng ký đầu tư ra nước ngoài</Label>
            <Input
              id="giayCNSo"
              placeholder="Nhập số giấy chứng nhận đăng ký đầu tư ra nước ngoài"
              value={giayCNSo}
              onChange={(e) => setGiayCNSo(e.target.value)}
              readOnly={isView}
              className={roFieldClass}
            />
          </div>

          {/* Ngày cấp + Điều chỉnh */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label required={!isView} htmlFor="ngayCap">Ngày cấp</Label>
              <Input
                id="ngayCap"
                placeholder="DD/MM/YYYY"
                value={ngayCap}
                onChange={(e) => setNgayCap(e.target.value)}
                readOnly={isView}
                className={roFieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label required={!isView} htmlFor="dieuChinhLan">Điều chỉnh lần ... ngày...</Label>
              <Input
                id="dieuChinhLan"
                placeholder="Ví dụ: lần 2 ngày 20/04/2026"
                value={dieuChinhLan}
                onChange={(e) => setDieuChinhLan(e.target.value)}
                readOnly={isView}
                className={roFieldClass}
              />
            </div>
          </div>

          {/* Tên dự án */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tenDuAn">Tên dự án/tổ chức kinh tế ở nước ngoài</Label>
            <Input
              id="tenDuAn"
              placeholder="Nhập tên dự án/tổ chức kinh tế ở nước ngoài"
              value={tenDuAn}
              onChange={(e) => setTenDuAn(e.target.value)}
              readOnly={isView}
              className={roFieldClass}
            />
          </div>

          {/* Tài khoản chuyển vốn */}
          <div className="border-t border-[rgba(0,0,0,0.1)] pt-6">
            <h4 className="text-[18px] font-medium text-[#0a0a0a] mb-4">Tài khoản chuyển vốn</h4>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="taiKhoanChuyenVon">Tài khoản chuyển vốn bằng tiền mặt ra nước ngoài</Label>
                <Input
                  id="taiKhoanChuyenVon"
                  placeholder="Nhập tài khoản chuyển vốn bằng tiền mặt ra nước ngoài"
                  value={taiKhoanChuyenVon}
                  onChange={(e) => setTaiKhoanChuyenVon(e.target.value)}
                  readOnly={isView}
                  className={roFieldClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label required={!isView} htmlFor="soTaiKhoan">Số tài khoản</Label>
                  <Input
                    id="soTaiKhoan"
                    placeholder="Nhập số tài khoản"
                    value={soTaiKhoan}
                    onChange={(e) => setSoTaiKhoan(e.target.value)}
                    readOnly={isView}
                    className={roFieldClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label required={!isView} htmlFor="nganHang">Ngân hàng</Label>
                  <Input
                    id="nganHang"
                    placeholder="Nhập tên ngân hàng"
                    value={nganHang}
                    onChange={(e) => setNganHang(e.target.value)}
                    readOnly={isView}
                    className={roFieldClass}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ===== Năm báo cáo ===== */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Năm báo cáo</CardTitle>
        </CardHeader>
        <div className="flex flex-col gap-1.5">
          <Label required={!isView} htmlFor="reportYear">Năm tài chính báo cáo</Label>
          <Input
            id="reportYear"
            placeholder="VD: 2025"
            value={reportYear}
            onChange={(e) => setReportYear(e.target.value)}
            readOnly={isView}
            className={roFieldClass}
          />
          <p className="text-[13px] text-[#6b7280]">
            Thời hạn nộp báo cáo: <span className="font-medium text-[#1f1f1f]">31/03/{Number(reportYear || '2025') + 1}</span>
          </p>
        </div>
      </Card>

      {/* ===== Bảng I: Tình trạng hoạt động ===== */}
      <Card padded={false} className="mb-6">
        <div className="p-6 pb-4">
          <CardTitle>Bảng I. Tình trạng hoạt động của tổ chức kinh tế ở nước ngoài</CardTitle>
          <p className="text-[13px] text-[#6b7280] mt-1">Báo cáo các chỉ tiêu tài chính và hoạt động trong kỳ và lũy kế</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-t border-[#e5e7eb]">
            <thead className="bg-[#f9fafb]">
              <tr>
                <th className="px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-wide text-[#6b7280] border-b border-[#e5e7eb] w-[8%]">STT</th>
                <th className="px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-wide text-[#6b7280] border-b border-[#e5e7eb] w-[42%]">Tên chỉ tiêu</th>
                <th className="px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-wide text-[#6b7280] border-b border-[#e5e7eb] w-[10%]">Đơn vị tính</th>
                <th className="px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-wide text-[#6b7280] border-b border-[#e5e7eb] w-[20%]">Trong kỳ báo cáo</th>
                <th className="px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-wide text-[#6b7280] border-b border-[#e5e7eb] w-[20%]">Lũy kế đến thời điểm báo cáo</th>
              </tr>
            </thead>
            <tbody>
              {tinhTrangRows.map((row) => {
                const indentPx = (row.indent || 0) * 20;
                const vals = indicatorValues[row.key];
                return (
                  <tr key={row.key} className="border-b border-[#e5e7eb] last:border-0">
                    <td className={`px-4 py-2.5 text-[13px] text-[#6b7280] ${row.isGroup ? 'bg-[#f9fafb] font-semibold' : ''}`}>
                      {row.stt}
                    </td>
                    <td
                      className={`px-4 py-2.5 text-[13px] ${row.isGroup ? 'font-semibold text-[#0a0a0a] bg-[#f9fafb]' : 'text-[#0a0a0a]'}`}
                      style={{ paddingLeft: 16 + indentPx }}
                    >
                      {row.label}
                    </td>
                    <td className="px-4 py-2.5 text-[13px] text-[#6b7280]">{row.unit}</td>
                    {row.isGroup ? (
                      <td className="px-4 py-2.5 bg-[#f9fafb]" colSpan={2}></td>
                    ) : (
                      <>
                        <td className="px-2 py-2">
                          {isView ? (
                            <span className="text-[13px] text-[#0a0a0a]">{vals.kyBaoCao || '—'}</span>
                          ) : (
                            <Input
                              placeholder="0"
                              value={vals.kyBaoCao}
                              onChange={(e) => updateIndicator(row.key, 'kyBaoCao', e.target.value)}
                              className="h-8 text-[13px]"
                            />
                          )}
                        </td>
                        <td className="px-2 py-2">
                          {isView ? (
                            <span className="text-[13px] text-[#0a0a0a]">{vals.luyKe || '—'}</span>
                          ) : (
                            <Input
                              placeholder="0"
                              value={vals.luyKe}
                              onChange={(e) => updateIndicator(row.key, 'luyKe', e.target.value)}
                              className="h-8 text-[13px]"
                            />
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ===== Bảng II: Đánh giá kết quả ===== */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bảng II. Đánh giá kết quả hoạt động đầu tư</CardTitle>
        </CardHeader>
        <div className="flex flex-col gap-3">
          <p className="text-[13px] text-[#6b7280]">Tình trạng hoạt động hiện tại của tổ chức kinh tế ở nước ngoài:</p>
          <div className="grid grid-cols-2 gap-3">
            {danhGiaOptions.map((opt) => (
              <Checkbox
                key={opt.value}
                id={`danhgia-${opt.value}`}
                label={opt.label}
                checked={!!danhGia[opt.value]}
                disabled={isView}
                onChange={(e) => setDanhGia((p) => ({ ...p, [opt.value]: e.target.checked }))}
              />
            ))}
          </div>
          <div className="flex flex-col gap-1.5 mt-2">
            <Label htmlFor="danhGiaNote">Mô tả chi tiết (nếu có)</Label>
            <Textarea
              id="danhGiaNote"
              placeholder="Mô tả thêm về kết quả hoạt động, khó khăn, nguyên nhân..."
              value={danhGiaNote}
              onChange={(e) => setDanhGiaNote(e.target.value)}
              readOnly={isView}
              className={roFieldClass}
              rows={3}
            />
          </div>
        </div>
      </Card>

      {/* ===== Phần III: Kiến nghị ===== */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Phần III. Kiến nghị</CardTitle>
        </CardHeader>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="kienNghi">Kiến nghị với cơ quan quản lý nhà nước</Label>
          <Textarea
            id="kienNghi"
            placeholder="Nêu các kiến nghị, đề xuất với cơ quan quản lý nhà nước về hoạt động đầu tư ra nước ngoài..."
            value={kienNghi}
            onChange={(e) => setKienNghi(e.target.value)}
            readOnly={isView}
            className={roFieldClass}
            rows={4}
          />
        </div>
      </Card>

      {/* ===== Phần IV: Cam kết ===== */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Phần IV. Cam kết</CardTitle>
        </CardHeader>
        <div className="flex flex-col gap-4">
          <Checkbox
            id="camket"
            label="Tôi cam kết những thông tin khai trong báo cáo này là đúng sự thật và chịu trách nhiệm trước pháp luật về nội dung đã khai."
            checked={camKet}
            disabled={isView}
            onChange={(e) => setCamKet(e.target.checked)}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label required={!isView} htmlFor="nguoiDaiDien">Người đại diện theo pháp luật</Label>
              <Input
                id="nguoiDaiDien"
                placeholder="Họ và tên người đại diện"
                value={nguoiDaiDien}
                onChange={(e) => setNguoiDaiDien(e.target.value)}
                readOnly={isView}
                className={roFieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="chucVu">Chức vụ</Label>
              <Input
                id="chucVu"
                placeholder="Chức vụ của người đại diện"
                value={chucVu}
                onChange={(e) => setChucVu(e.target.value)}
                readOnly={isView}
                className={roFieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label required={!isView} htmlFor="ngayLap">Ngày lập báo cáo</Label>
              <Input
                id="ngayLap"
                placeholder="DD/MM/YYYY"
                value={ngayLap}
                onChange={(e) => setNgayLap(e.target.value)}
                readOnly={isView}
                className={roFieldClass}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* ===== Phần V: Hồ sơ kèm theo ===== */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Phần V. Hồ sơ kèm theo</CardTitle>
        </CardHeader>
        <div className="flex flex-col gap-3">
          <p className="text-[13px] text-[#6b7280]">Đánh dấu các tài liệu đính kèm trong hồ sơ báo cáo:</p>
          <div className="grid grid-cols-2 gap-3">
            {hoSoOptions.map((opt) => (
              <Checkbox
                key={opt.value}
                id={`hoso-${opt.value}`}
                label={opt.label}
                checked={!!hoSo[opt.value]}
                disabled={isView}
                onChange={(e) => setHoSo((p) => ({ ...p, [opt.value]: e.target.checked }))}
              />
            ))}
          </div>
          {!isView && (
            <div className="mt-2 p-4 border-2 border-dashed border-[#e5e7eb] rounded-[10px] flex flex-col items-center gap-2 text-[13px] text-[#6b7280]">
              <span>Kéo thả tệp vào đây hoặc</span>
              <Button variant="outline" size="sm">Chọn tệp đính kèm</Button>
              <span className="text-[12px]">Định dạng hỗ trợ: PDF, DOC, DOCX, XLS, XLSX (tối đa 10MB)</span>
            </div>
          )}
        </div>
      </Card>

      {/* ===== ACTION BAR ===== */}
      {/* Figma 2322:1281 — Hủy / Xem / Lưu nháp / Gửi báo cáo */}
      <div className="flex items-center justify-end gap-4 py-4 border-t border-[#e5e7eb] mt-2">
        <Button
          variant="outline"
          onClick={() => navigate('/feature-34')}
        >
          Hủy
        </Button>
        <Button
          variant="outline"
          onClick={() => id ? navigate(`/feature-34/${id}/view`) : alert('Lưu nháp trước để xem')}
        >
          Xem
        </Button>
        <Button variant="outline" onClick={handlePrint}>
          In báo cáo
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
          <Button variant="outline" onClick={() => navigate(`/feature-34/${id}/edit`)}>
            Yêu cầu chỉnh sửa
          </Button>
        )}
      </div>
    </Container>
  );
}
