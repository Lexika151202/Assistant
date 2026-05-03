// Feature: 33 - Báo cáo định kỳ năm tình hình hoạt động dự án đầu tư tại nước ngoài (Mẫu I.16)
// Screen: Form Lập / Chỉnh sửa / Xem báo cáo (Mẫu I.16)
// Figma Node: 1559:2503

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../../components/shared/Container';
import { Heading } from '../../components/shared/Heading';
import { Button } from '../../components/shared/Button';
import { Input } from '../../components/shared/Input';
import { Textarea } from '../../components/shared/Textarea';
import { Label } from '../../components/shared/Label';
import { Checkbox } from '../../components/shared/Checkbox';
import { Badge } from '../../components/shared/Badge';

interface ReportI16FormProps {
  mode?: 'create' | 'edit' | 'view';
}

interface Investor {
  id: string;
  name: string;
  taxCode: string;
  phone: string;
  address: string;
}

interface IndicatorRow {
  key: string;
  label: string;
  unit: string;
  isGroup?: boolean;
  indent?: number;
  isTextDesc?: boolean;
}

const indicatorRows: IndicatorRow[] = [
  { key: 'g1', label: '1. Vốn đã chuyển ra nước ngoài', unit: '', isGroup: true },
  { key: 'g1a', label: 'Tiền', unit: 'USD', indent: 1 },
  { key: 'g1b', label: 'Máy móc, thiết bị, hàng hoá', unit: 'USD', indent: 1 },
  { key: 'g1c', label: 'Tài sản khác', unit: 'USD', indent: 1 },

  { key: 'g2', label: '2. Lao động', unit: '', isGroup: true },
  { key: 'g2a', label: 'Số lao động làm việc cho dự án tại thời điểm báo cáo', unit: 'Người', indent: 1 },
  { key: 'g2b', label: 'Số lao động Việt Nam (1) = (2) + (3)', unit: 'Người', indent: 1 },
  { key: 'g2c', label: 'Số lao động đưa từ Việt Nam ra (2)', unit: 'Người', indent: 1 },
  { key: 'g2d', label: 'Số lao động Việt Nam tại nước tiếp nhận đầu tư (3)', unit: 'Người', indent: 1 },
  { key: 'g2e', label: 'Số lao động nước ngoài', unit: 'Người', indent: 1 },

  { key: 'g3', label: '3. Kết quả kinh doanh', unit: '', isGroup: true },
  { key: 'g3a', label: 'Doanh thu', unit: 'USD', indent: 1 },
  { key: 'g3b', label: 'Lợi nhuận', unit: 'USD', indent: 1 },
  { key: 'g3c', label: 'Nguồn thu khác (ghi rõ, nếu có)', unit: 'USD', indent: 1 },
  { key: 'g3d', label: 'Nghĩa vụ tài chính ở nước ngoài (ghi rõ, nếu có)', unit: 'USD', indent: 1 },

  { key: 'g4', label: '4. Tiền chuyển về Việt Nam', unit: '', isGroup: true },
  { key: 'g4a', label: 'Lợi nhuận', unit: 'USD', indent: 1 },
  { key: 'g4b', label: 'Các khoản khác (ghi rõ, ví dụ: thu hồi vốn góp, vốn vay...)', unit: 'USD', indent: 1 },
  { key: 'g4c', label: 'Nghĩa vụ tài chính tại Việt Nam (ghi rõ, nếu có)', unit: 'USD', indent: 1 },

  { key: 'g5', label: '5. Tiền giữ lại để tái đầu tư', unit: '', isGroup: true },
  { key: 'g5a', label: 'Tiền giữ lại để tái đầu tư', unit: 'USD', indent: 1 },

  { key: 'g6', label: '6. Tỷ lệ thu hồi vốn', unit: '', isGroup: true },
  { key: 'g6a', label: 'Tỷ lệ thu hồi vốn', unit: '%', indent: 1 },

  { key: 'g7', label: '7. Kết quả về tiếp cận công nghệ hiện đại, nâng cao năng lực cán bộ', unit: '', isGroup: true },
  { key: 'g7a', label: 'Kết quả về tiếp cận công nghệ hiện đại, nâng cao năng lực cán bộ', unit: 'Mô tả', indent: 1, isTextDesc: true },
];

const progressOptions = [
  { value: 'onSchedule', label: 'Đúng tiến độ' },
  { value: 'delayed', label: 'Chậm tiến độ' },
  { value: 'difficulties', label: 'Khó khăn, vướng mắc' },
  { value: 'unable', label: 'Không có khả năng triển khai' },
];

const forecastRows = [
  { key: 'f1', label: 'Tiền' },
  { key: 'f2', label: 'Máy móc, thiết bị, hàng hoá' },
  { key: 'f3', label: 'Tài sản khác' },
];

const descriptionFields: { key: string; label: string; placeholder: string }[] = [
  { key: 'currentStatus', label: 'Tình trạng dự án hiện nay', placeholder: 'Mô tả tình trạng dự án...' },
  { key: 'progressDesc', label: 'Tiến độ thực hiện', placeholder: 'Mô tả tiến độ thực hiện...' },
  { key: 'objectiveStatus', label: 'Tình hình thực hiện mục tiêu', placeholder: 'Mô tả tình hình thực hiện mục tiêu...' },
  { key: 'capitalUse', label: 'Mục đích sử dụng vốn', placeholder: 'Mô tả mục đích sử dụng vốn...' },
  { key: 'socialWelfare', label: 'An sinh xã hội', placeholder: 'Mô tả các vấn đề an sinh xã hội...' },
  { key: 'otherIssues', label: 'Các vấn đề khác', placeholder: 'Mô tả các vấn đề khác...' },
];

export default function ReportI16Form({ mode = 'create' }: ReportI16FormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isView = mode === 'view';
  const isCreate = mode === 'create';

  // General
  const [projectCode, setProjectCode] = useState(isCreate ? '' : 'DA-2024-001');
  const [reportYear, setReportYear] = useState(isCreate ? '2026' : '2025');
  const [representativeOffice, setRepresentativeOffice] = useState('');

  // Investors
  const [investors, setInvestors] = useState<Investor[]>([
    { id: '1', name: isCreate ? '' : 'Công ty TNHH Đầu tư ABC', taxCode: isCreate ? '' : '0123456789', phone: isCreate ? '' : '024-12345678', address: isCreate ? '' : '123 Đường Láng, Đống Đa, Hà Nội' },
    { id: '2', name: isCreate ? '' : 'Công ty Cổ phần Đầu tư XYZ', taxCode: isCreate ? '' : '0987654321', phone: isCreate ? '' : '024-87654321', address: isCreate ? '' : '456 Nguyễn Trãi, Thanh Xuân, Hà Nội' },
  ]);
  const [reporterPhone, setReporterPhone] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');

  // Project info
  const [projectId, setProjectId] = useState(isCreate ? '' : 'VN-LA-2024-001');
  const [issueDate, setIssueDate] = useState('');
  const [adjustments, setAdjustments] = useState('');
  const [licenseNo, setLicenseNo] = useState('');
  const [licenseDate, setLicenseDate] = useState('');
  const [issuingAuthority, setIssuingAuthority] = useState('');
  const [projectNameAbroad, setProjectNameAbroad] = useState(isCreate ? '' : 'Dự án khai thác khoáng sản tại Lào');
  const [hqAddress, setHqAddress] = useState(isCreate ? '' : 'Tỉnh Savannakhet, Lào');
  const [repPhone, setRepPhone] = useState('');
  const [repEmail, setRepEmail] = useState('');
  const [objective, setObjective] = useState('');

  // Indicators — v1..v3 = "Thực hiện năm báo cáo" (inv1/inv2/total), v4..v6 = "Luỹ kế" (inv1/inv2/total)
  type IndicatorVals = { v1: string; v2: string; v3: string; v4: string; v5: string; v6: string };
  const [indicatorValues, setIndicatorValues] = useState<Record<string, IndicatorVals>>(() => {
    const init: Record<string, IndicatorVals> = {};
    indicatorRows.forEach((r) => { init[r.key] = { v1: '', v2: '', v3: '', v4: '', v5: '', v6: '' }; });
    return init;
  });

  // Progress
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [progressNote, setProgressNote] = useState('');

  // Descriptions (Phần V)
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});

  // Forecast (Phần VI)
  const [forecast, setForecast] = useState<Record<string, { v1: string; v2: string; v3: string }>>(() =>
    Object.fromEntries(forecastRows.map((r) => [r.key, { v1: '', v2: '', v3: '' }]))
  );

  function addInvestor() {
    setInvestors((prev) => [...prev, { id: String(Date.now()), name: '', taxCode: '', phone: '', address: '' }]);
  }
  function removeInvestor(id: string) {
    setInvestors((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));
  }
  function updateInvestor(id: string, field: keyof Investor, value: string) {
    setInvestors((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  }
  function updateIndicator(key: string, field: keyof IndicatorVals, value: string) {
    setIndicatorValues((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  }
  function updateForecast(key: string, field: 'v1' | 'v2' | 'v3', value: string) {
    setForecast((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  }

  function handleSaveDraft() { alert('Đã lưu nháp.'); }
  function handleSubmit() {
    if (confirm('Gửi báo cáo? Sau khi gửi sẽ không thể chỉnh sửa trực tiếp.')) {
      alert('Đã gửi báo cáo.');
      navigate('/feature-33');
    }
  }
  function handleCancel() {
    if (confirm('Hủy bỏ các thay đổi và quay lại?')) navigate('/feature-33');
  }

  const pageTitle =
    mode === 'create' ? 'Lập báo cáo định kỳ năm – Hoạt động dự án đầu tư tại nước ngoài (Mẫu I.16)' :
    mode === 'edit' ? 'Chỉnh sửa báo cáo định kỳ năm – Mẫu I.16' :
    'Xem báo cáo định kỳ năm – Mẫu I.16';

  const roClass = isView ? 'bg-[#f9fafb]' : '';
  const investorNames = investors.map((i, idx) => i.name || `Nhà đầu tư ${idx + 1}`);

  return (
    <Container>
      {/* Breadcrumb */}
      <nav className="text-[13px] text-[#6a7282] mb-2">
        <span className="cursor-pointer hover:text-[#a50000]" onClick={() => navigate('/')}>Trang chủ</span>
        <span className="mx-2">›</span>
        <span className="cursor-pointer hover:text-[#a50000]" onClick={() => navigate('/feature-33')}>Báo cáo định kỳ</span>
        <span className="mx-2">›</span>
        <span className="text-[#0a0a0a]">Lập báo cáo năm</span>
      </nav>

      {/* Title + status badge */}
      <div className="flex items-start justify-between mb-5">
        <Heading level={1} className="!text-[24px] !leading-[32px] !font-semibold">{pageTitle}</Heading>
        {!isCreate && (
          <Badge tone={mode === 'view' ? 'success' : 'warning'}>
            {mode === 'view' ? 'Đã nộp' : 'Lưu nháp'}
          </Badge>
        )}
      </div>

      {/* === ProjectSelector (card riêng, top) === */}
      <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-6 mb-4">
        <div className="max-w-[640px]">
          <Label required={!isView} htmlFor="projectCode">Chọn dự án</Label>
          <div className="mt-2">
            {isView ? (
              <Input id="projectCode" value={projectCode} readOnly className={roClass} />
            ) : (
              <select
                id="projectCode"
                className="w-full h-10 px-3 bg-white border border-[#e5e7eb] rounded-[8px] text-[14px] text-[#0a0a0a] outline-none"
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
              >
                <option value="">-- Chọn dự án ĐTRNN --</option>
                <option value="DA-2024-001">Dự án 1 - Khai thác khoáng sản tại Lào</option>
                <option value="DA-2024-002">Dự án 2 - Sản xuất linh kiện điện tử tại Singapore</option>
                <option value="DA-2024-003">Dự án 3 - Trồng cao su tại Thái Lan</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* === THÔNG TIN CHUNG === */}
      <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-6 mb-4">
        <h2 className="text-[16px] font-bold uppercase text-[#0a0a0a] tracking-wide mb-4">Thông tin chung</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label required={!isView}>Năm báo cáo</Label>
            <Input placeholder="VD: 2026" value={reportYear} onChange={(e) => setReportYear(e.target.value)} readOnly={isView} className={roClass} />
            <span className="text-[12px] text-[#6a7282] italic">Thời hạn nộp: Trước ngày 15/02 năm sau</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label required={!isView}>Cơ quan đại diện Việt Nam tại nước tiếp nhận đầu tư</Label>
            <Input placeholder="Nhập Cơ quan đại diện Việt Nam tại nước tiếp nhận đầu tư" value={representativeOffice} onChange={(e) => setRepresentativeOffice(e.target.value)} readOnly={isView} className={roClass} />
          </div>
        </div>
      </div>

      {/* === PHẦN I === */}
      <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-6 mb-4">
        <h2 className="text-[16px] font-bold text-[#0a0a0a] mb-4">Phần I - Thông tin nhà đầu tư</h2>

        <div className="flex flex-col gap-5">
          {investors.map((inv, idx) => (
            <div key={inv.id} className="border border-[#e5e7eb] rounded-[10px] p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[14px] font-semibold text-[#0a0a0a]">Nhà đầu tư {idx + 1}</h4>
                {!isView && investors.length > 1 && (
                  <Button size="sm" variant="ghost" onClick={() => removeInvestor(inv.id)}>✕ Xóa</Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label>Tên nhà đầu tư</Label>
                  <Input placeholder="Nhập tên nhà đầu tư" value={inv.name} onChange={(e) => updateInvestor(inv.id, 'name', e.target.value)} readOnly={isView} className={roClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Mã số thuế</Label>
                  <Input placeholder="Nhập mã số thuế" value={inv.taxCode} onChange={(e) => updateInvestor(inv.id, 'taxCode', e.target.value)} readOnly={isView} className={roClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Số điện thoại</Label>
                  <Input placeholder="Nhập số điện thoại" value={inv.phone} onChange={(e) => updateInvestor(inv.id, 'phone', e.target.value)} readOnly={isView} className={roClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Địa chỉ</Label>
                  <Input placeholder="Nhập địa chỉ" value={inv.address} onChange={(e) => updateInvestor(inv.id, 'address', e.target.value)} readOnly={isView} className={roClass} />
                </div>
              </div>
            </div>
          ))}

          {!isView && (
            <Button variant="outline" size="sm" onClick={addInvestor} className="self-start">+ Thêm nhà đầu tư</Button>
          )}

          {/* Thông tin người làm báo cáo */}
          <div className="border-t border-[#e5e7eb] pt-4">
            <h4 className="text-[14px] font-semibold text-[#0a0a0a] mb-3">Thông tin người làm báo cáo</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label required={!isView}>Số điện thoại người làm báo cáo</Label>
                <Input placeholder="Nhập số điện thoại" value={reporterPhone} onChange={(e) => setReporterPhone(e.target.value)} readOnly={isView} className={roClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label required={!isView}>Email</Label>
                <Input placeholder="Nhập email" value={reporterEmail} onChange={(e) => setReporterEmail(e.target.value)} readOnly={isView} className={roClass} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === PHẦN II === */}
      <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-6 mb-4">
        <h2 className="text-[16px] font-bold text-[#0a0a0a] mb-4">Phần II - Thông tin hoạt động đầu tư ra nước ngoài</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5 col-span-2">
            <Label>Mã số dự án ĐTRNN / Số xác nhận ĐKGD ngoại hối</Label>
            <Input placeholder="VN-XX-YYYY-NNN" value={projectId} onChange={(e) => setProjectId(e.target.value)} readOnly={isView} className={roClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Ngày cấp</Label>
            <Input placeholder="DD/MM/YYYY" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} readOnly={isView} className={roClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Điều chỉnh (nếu có)</Label>
            <Input placeholder="Số lần điều chỉnh..." value={adjustments} onChange={(e) => setAdjustments(e.target.value)} readOnly={isView} className={roClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Số giấy phép / Văn bản chấp thuận</Label>
            <Input placeholder="Nhập số GP/VB" value={licenseNo} onChange={(e) => setLicenseNo(e.target.value)} readOnly={isView} className={roClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Ngày cấp</Label>
            <Input placeholder="DD/MM/YYYY" value={licenseDate} onChange={(e) => setLicenseDate(e.target.value)} readOnly={isView} className={roClass} />
          </div>
          <div className="flex flex-col gap-1.5 col-span-2">
            <Label>Cơ quan cấp</Label>
            <Input placeholder="Nhập cơ quan cấp" value={issuingAuthority} onChange={(e) => setIssuingAuthority(e.target.value)} readOnly={isView} className={roClass} />
          </div>
          <div className="flex flex-col gap-1.5 col-span-2">
            <Label>Tên dự án / Tổ chức kinh tế ở nước ngoài</Label>
            <Input placeholder="Nhập tên dự án" value={projectNameAbroad} onChange={(e) => setProjectNameAbroad(e.target.value)} readOnly={isView} className={roClass} />
          </div>
          <div className="flex flex-col gap-1.5 col-span-2">
            <Label>Địa chỉ trụ sở tại nước ngoài</Label>
            <Input placeholder="Nhập địa chỉ trụ sở" value={hqAddress} onChange={(e) => setHqAddress(e.target.value)} readOnly={isView} className={roClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>SĐT người đại diện</Label>
            <Input placeholder="Nhập số điện thoại" value={repPhone} onChange={(e) => setRepPhone(e.target.value)} readOnly={isView} className={roClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Email</Label>
            <Input placeholder="Nhập email" value={repEmail} onChange={(e) => setRepEmail(e.target.value)} readOnly={isView} className={roClass} />
          </div>
          <div className="flex flex-col gap-1.5 col-span-2">
            <Label>Mục tiêu hoạt động chính</Label>
            <Textarea placeholder="Mô tả mục tiêu hoạt động chính của dự án..." value={objective} onChange={(e) => setObjective(e.target.value)} readOnly={isView} className={roClass} rows={3} />
          </div>
        </div>
      </div>

      {/* === PHẦN III === */}
      <div className="bg-white border border-[#e5e7eb] rounded-[10px] mb-4 overflow-hidden">
        <div className="p-6 pb-4">
          <h2 className="text-[16px] font-bold text-[#0a0a0a]">Phần III - Tình hình thực hiện hoạt động đầu tư</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-t border-[#e5e7eb] text-[13px]">
            <thead>
              <tr className="bg-[#f9fafb]">
                <th rowSpan={2} className="px-4 py-3 text-left font-semibold text-[#364153] border-b border-r border-[#e5e7eb] min-w-[280px]">Tên chỉ tiêu</th>
                <th rowSpan={2} className="px-3 py-3 text-left font-semibold text-[#364153] border-b border-r border-[#e5e7eb] w-[90px]">Đơn vị tính</th>
                <th colSpan={3} className="px-3 py-2 text-center font-semibold text-[#364153] border-b border-r border-[#e5e7eb] bg-[#fef2f2]">Thực hiện năm báo cáo</th>
                <th colSpan={3} className="px-3 py-2 text-center font-semibold text-[#364153] border-b border-[#e5e7eb] bg-[#eff6ff]">Luỹ kế từ khi cấp GCNĐK ĐTRNN đến hết năm báo cáo</th>
              </tr>
              <tr className="bg-[#f9fafb]">
                <th className="px-2 py-2 text-center text-[12px] font-medium text-[#6a7282] border-b border-r border-[#e5e7eb] bg-[#fef2f2]">{investorNames[0]}</th>
                <th className="px-2 py-2 text-center text-[12px] font-medium text-[#6a7282] border-b border-r border-[#e5e7eb] bg-[#fef2f2]">{investorNames[1] || 'Nhà đầu tư 2'}</th>
                <th className="px-2 py-2 text-center text-[12px] font-medium text-[#6a7282] border-b border-r border-[#e5e7eb] bg-[#fef2f2]">Tổng các nhà đầu tư</th>
                <th className="px-2 py-2 text-center text-[12px] font-medium text-[#6a7282] border-b border-r border-[#e5e7eb] bg-[#eff6ff]">{investorNames[0]}</th>
                <th className="px-2 py-2 text-center text-[12px] font-medium text-[#6a7282] border-b border-r border-[#e5e7eb] bg-[#eff6ff]">{investorNames[1] || 'Nhà đầu tư 2'}</th>
                <th className="px-2 py-2 text-center text-[12px] font-medium text-[#6a7282] border-b border-[#e5e7eb] bg-[#eff6ff]">Tổng các nhà đầu tư</th>
              </tr>
            </thead>
            <tbody>
              {indicatorRows.map((row) => {
                const indentPx = (row.indent || 0) * 16;
                const vals = indicatorValues[row.key];
                if (row.isGroup) {
                  return (
                    <tr key={row.key} className="bg-[#f9fafb]">
                      <td colSpan={8} className="px-4 py-2.5 font-semibold text-[#0a0a0a] border-b border-[#e5e7eb]">
                        {row.label}
                      </td>
                    </tr>
                  );
                }
                if (row.isTextDesc) {
                  return (
                    <tr key={row.key} className="border-b border-[#e5e7eb]">
                      <td className="px-4 py-2 text-[#0a0a0a] border-r border-[#e5e7eb]" style={{ paddingLeft: 16 + indentPx }}>{row.label}</td>
                      <td className="px-3 py-2 text-[#6a7282] border-r border-[#e5e7eb]">{row.unit}</td>
                      <td colSpan={3} className="px-2 py-2 border-r border-[#e5e7eb]">
                        {isView ? <span>{vals.v1 || '—'}</span> : (
                          <Textarea placeholder="Nhập..." value={vals.v1} onChange={(e) => updateIndicator(row.key, 'v1', e.target.value)} rows={2} />
                        )}
                      </td>
                      <td colSpan={3} className="px-2 py-2">
                        {isView ? <span>{vals.v4 || '—'}</span> : (
                          <Textarea placeholder="Nhập..." value={vals.v4} onChange={(e) => updateIndicator(row.key, 'v4', e.target.value)} rows={2} />
                        )}
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={row.key} className="border-b border-[#e5e7eb]">
                    <td className="px-4 py-2 text-[#0a0a0a] border-r border-[#e5e7eb]" style={{ paddingLeft: 16 + indentPx }}>{row.label}</td>
                    <td className="px-3 py-2 text-[#6a7282] border-r border-[#e5e7eb]">{row.unit}</td>
                    {(['v1','v2','v3','v4','v5','v6'] as const).map((f, i) => (
                      <td key={f} className={`px-1 py-1 ${i === 2 || i === 5 ? 'bg-[#f9fafb]' : ''} ${i < 5 ? 'border-r' : ''} border-[#e5e7eb]`}>
                        {isView ? (
                          <span className="px-2">{vals[f] || '0'}</span>
                        ) : (
                          <input
                            type="text"
                            className={`w-full h-8 px-2 text-[13px] text-right rounded-[4px] border border-transparent hover:border-[#e5e7eb] focus:border-[#a50000] outline-none ${i === 2 || i === 5 ? 'bg-[#f9fafb] font-medium' : 'bg-white'}`}
                            placeholder="0"
                            readOnly={i === 2 || i === 5}
                            value={vals[f]}
                            onChange={(e) => updateIndicator(row.key, f, e.target.value)}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* === PHẦN IV === */}
      <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-6 mb-4">
        <h2 className="text-[16px] font-bold text-[#0a0a0a] mb-4">Phần IV - Tiến độ</h2>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[13px] text-[#364153] mb-2 font-medium">Tình trạng (có thể chọn nhiều mục)</p>
            <div className="grid grid-cols-2 gap-3">
              {progressOptions.map((opt) => (
                <Checkbox
                  key={opt.value}
                  id={`progress-${opt.value}`}
                  label={opt.label}
                  checked={!!progress[opt.value]}
                  disabled={isView}
                  onChange={(e) => setProgress((p) => ({ ...p, [opt.value]: e.target.checked }))}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Trình bày lý do/giải pháp khắc phục</Label>
            <Textarea placeholder="Mô tả lý do/giải pháp khắc phục" value={progressNote} onChange={(e) => setProgressNote(e.target.value)} readOnly={isView} className={roClass} rows={4} />
          </div>
        </div>
      </div>

      {/* === PHẦN V === */}
      <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-6 mb-4">
        <h2 className="text-[16px] font-bold text-[#0a0a0a] mb-4">Phần V - Mô tả</h2>
        <div className="flex flex-col gap-4">
          {descriptionFields.map((f) => (
            <div key={f.key} className="flex flex-col gap-1.5">
              <Label>{f.label}</Label>
              <Textarea
                placeholder={f.placeholder}
                value={descriptions[f.key] || ''}
                onChange={(e) => setDescriptions((d) => ({ ...d, [f.key]: e.target.value }))}
                readOnly={isView}
                className={roClass}
                rows={3}
              />
            </div>
          ))}
        </div>
      </div>

      {/* === PHẦN VI === */}
      <div className="bg-white border border-[#e5e7eb] rounded-[10px] mb-4 overflow-hidden">
        <div className="p-6 pb-4">
          <h2 className="text-[16px] font-bold text-[#0a0a0a]">Phần VI - Dự kiến năm tới</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-t border-[#e5e7eb] text-[13px]">
            <thead>
              <tr className="bg-[#f9fafb]">
                <th className="px-4 py-3 text-left font-semibold text-[#364153] border-b border-r border-[#e5e7eb] min-w-[280px]">Loại</th>
                <th className="px-3 py-3 text-center font-semibold text-[#364153] border-b border-r border-[#e5e7eb]">{investorNames[0]}</th>
                <th className="px-3 py-3 text-center font-semibold text-[#364153] border-b border-r border-[#e5e7eb]">{investorNames[1] || 'Nhà đầu tư 2'}</th>
                <th className="px-3 py-3 text-center font-semibold text-[#364153] border-b border-[#e5e7eb]">Tổng các nhà đầu tư</th>
              </tr>
            </thead>
            <tbody>
              {forecastRows.map((row) => {
                const vals = forecast[row.key];
                return (
                  <tr key={row.key} className="border-b border-[#e5e7eb] last:border-0">
                    <td className="px-4 py-2 text-[#0a0a0a] border-r border-[#e5e7eb]">{row.label}</td>
                    {(['v1','v2','v3'] as const).map((f, i) => (
                      <td key={f} className={`px-1 py-1 ${i === 2 ? 'bg-[#f9fafb]' : ''} ${i < 2 ? 'border-r' : ''} border-[#e5e7eb]`}>
                        {isView ? (
                          <span className="px-2">{vals[f] || '0'}</span>
                        ) : (
                          <input
                            type="text"
                            className={`w-full h-8 px-2 text-[13px] text-right rounded-[4px] border border-transparent hover:border-[#e5e7eb] focus:border-[#a50000] outline-none ${i === 2 ? 'bg-[#f9fafb] font-medium' : 'bg-white'}`}
                            placeholder="0"
                            readOnly={i === 2}
                            value={vals[f]}
                            onChange={(e) => updateForecast(row.key, f, e.target.value)}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* === ACTION BAR === */}
      <div className="sticky bottom-0 bg-white border-t border-[#e5e7eb] py-3 flex items-center justify-end gap-3 -mx-8 px-8">
        <Button variant="ghost" onClick={handleCancel}>Hủy</Button>
        <Button variant="outline" onClick={() => id && navigate(`/feature-33/${id}/view`)}>👁 Xem</Button>
        {!isView && (
          <>
            <Button variant="outline" onClick={handleSaveDraft}>Lưu nháp</Button>
            <Button variant="primary" onClick={handleSubmit}>Gửi báo cáo</Button>
          </>
        )}
        {isView && (
          <Button variant="primary" onClick={() => navigate(`/feature-33/${id}/edit`)}>Yêu cầu chỉnh sửa</Button>
        )}
      </div>
    </Container>
  );
}
