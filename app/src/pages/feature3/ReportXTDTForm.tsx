import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../../components/shared/Container';
import { Button } from '../../components/shared/Button';
import { Card, CardHeader, CardTitle } from '../../components/shared/Card';
import { Input } from '../../components/shared/Input';
import { Label } from '../../components/shared/Label';
import { Badge } from '../../components/shared/Badge';
import { Breadcrumb } from '../../components/shared/Breadcrumb';

interface ReportXTDTFormProps {
  mode?: 'create' | 'edit' | 'view';
}

type ActiveTab = 'tab1' | 'tab2' | 'tab3' | 'tab4';

const thCls = 'px-3 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a]';
const tdCls = 'px-3 py-3 text-[14px] text-[#0a0a0a]';
const thGroupCls = 'px-3 py-[6px] text-center text-[14px] font-medium text-[#0a0a0a] border-b border-[#e5e7eb]';

function Tab1BaoCaoKetQua({ isView, soCongVan, setSoCongVan, namBaoCao, setNamBaoCao }: {
  isView: boolean; soCongVan: string; setSoCongVan: (v: string) => void;
  namBaoCao: string; setNamBaoCao: (v: string) => void;
}) {
  const roFieldClass = isView ? 'bg-[#f9fafb]' : '';
  return (
    <>
      <div className="mb-4">
        <h2 className="font-bold text-[20px] leading-[28px] text-[#101828]">
          Mẫu B.IV.2: Báo cáo kết quả thực hiện chương trình xúc tiến đầu tư
        </h2>
        <p className="text-[14px] text-[#4a5565] mt-1">Của Bộ/ Ủy ban nhân dân cấp tỉnh</p>
      </div>
      <Card className="mb-6">
        <CardHeader><CardTitle>THÔNG TIN ĐỊNH DANH</CardTitle></CardHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label required={!isView} htmlFor="soCongVan">Số công văn</Label>
            <Input id="soCongVan" placeholder="Số: ............" value={soCongVan}
              onChange={(e) => setSoCongVan(e.target.value)} readOnly={isView} className={roFieldClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label required={!isView} htmlFor="namBaoCao">Năm báo cáo</Label>
            <SelectYear id="namBaoCao" value={namBaoCao} onChange={setNamBaoCao} disabled={isView} />
          </div>
        </div>
      </Card>
    </>
  );
}

function Tab2BieuTongHop({ isView }: { isView: boolean }) {
  return (
    <>
      <div className="mb-4">
        <h2 className="font-bold text-[20px] leading-[28px] text-[#101828]">
          Mẫu B.IV.3: Biểu tổng hợp tình hình thực hiện chương trình xúc tiến đầu tư
        </h2>
        <p className="text-[14px] text-[#4a5565] mt-1">Của Bộ/ Ủy ban nhân dân cấp tỉnh</p>
      </div>
      <Card className="mb-6">
        <CardHeader><CardTitle>Thông tin liên kết</CardTitle></CardHeader>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label required={!isView}>Kèm theo công văn số</Label>
            <Input placeholder="Nhập số công văn" readOnly={isView} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label required={!isView}>Năm</Label>
            <Input placeholder="2026" readOnly={isView} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label required={!isView}>Tên Bộ/UBND cấp tỉnh lập báo cáo</Label>
            <Input placeholder="Bộ tài chính" readOnly={isView} />
          </div>
        </div>
      </Card>
      <Card padded={false} className="mb-6">
        <div className="p-6 pb-4 flex items-center justify-between">
          <CardTitle>Bảng dữ liệu</CardTitle>
          {!isView && <Button variant="outline" size="sm">+ Thêm hàng</Button>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-t border-[#e5e7eb] min-w-[1400px]">
            <thead className="bg-[#f3f4f6]">
              <tr>
                <th rowSpan={2} className={`${thCls} w-[50px]`}>STT</th>
                <th rowSpan={2} className={thCls}>Tên hoạt động xúc tiến đầu tư</th>
                <th rowSpan={2} className={`${thCls} w-[120px]`}>Loại hoạt động</th>
                <th rowSpan={2} className={`${thCls} w-[110px]`}>Thời gian tổ chức</th>
                <th rowSpan={2} className={`${thCls} w-[140px]`}>Đơn vị chủ trì thực hiện</th>
                <th colSpan={2} className={thGroupCls}>Địa điểm tổ chức</th>
                <th rowSpan={2} className={`${thCls} w-[130px]`}>Địa bàn/tỉnh/vùng kêu gọi đầu tư</th>
                <th rowSpan={2} className={`${thCls} w-[120px]`}>Đơn vị phối hợp</th>
                <th colSpan={3} className={thGroupCls}>Kinh phí</th>
                <th colSpan={3} className={thGroupCls}>Kinh phí quyết toán</th>
                <th rowSpan={2} className={`${thCls} w-[70px]`}>Hành động</th>
              </tr>
              <tr>
                <th className={`${thCls} w-[100px]`}>Trong nước</th>
                <th className={`${thCls} w-[100px]`}>Nước ngoài</th>
                <th className={`${thCls} w-[100px]`}>NS Bộ/địa phương</th>
                <th className={`${thCls} w-[100px]`}>CT XTTĐT quốc gia</th>
                <th className={`${thCls} w-[80px]`}>Khác</th>
                <th className={`${thCls} w-[100px]`}>NS Bộ/địa phương</th>
                <th className={`${thCls} w-[100px]`}>CT XTTĐT quốc gia</th>
                <th className={`${thCls} w-[80px]`}>Khác</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#e5e7eb] hover:bg-[#f9fafb]">
                <td className={`${tdCls} text-center`}>1</td>
                <td className={tdCls}><Input placeholder="Nhập tên hoạt động" /></td>
                <td className={tdCls}><Input placeholder="Chọn loại" /></td>
                <td className={tdCls}><Input placeholder="Thời gian" /></td>
                <td className={tdCls}><Input placeholder="Đơn vị" /></td>
                <td className={tdCls}><Input placeholder="Địa điểm" /></td>
                <td className={tdCls}><Input placeholder="Địa điểm" /></td>
                <td className={tdCls}><Input placeholder="Địa bàn" /></td>
                <td className={tdCls}><Input placeholder="Đơn vị" /></td>
                <td className={tdCls}><Input placeholder="0" /></td>
                <td className={tdCls}><Input placeholder="0" /></td>
                <td className={tdCls}><Input placeholder="0" /></td>
                <td className={tdCls}><Input placeholder="0" /></td>
                <td className={tdCls}><Input placeholder="0" /></td>
                <td className={tdCls}><Input placeholder="0" /></td>
                <td className={tdCls}><Button variant="ghost" size="sm">Xóa</Button></td>
              </tr>
              <tr className="border-t border-[#e5e7eb] bg-[#f9fafb] font-semibold">
                <td colSpan={9} className={`${tdCls} text-right`}>TỔNG</td>
                <td className={tdCls}>0</td><td className={tdCls}>0</td><td className={tdCls}>0</td>
                <td className={tdCls}>0</td><td className={tdCls}>0</td><td className={tdCls}>0</td>
                <td className={tdCls} />
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

const tab3ProjectDb: Record<string, { doiTac: string; diaDiem: string; nganh: string; quyMo: string; tongVon: string; tinhHinh: string }> = {
  'DA-001': { doiTac: 'Tập đoàn Samsung', diaDiem: 'KCN Bắc Ninh', nganh: 'Công nghệ cao', quyMo: '500 lao động', tongVon: '150,000', tinhHinh: 'Đang triển khai' },
  'DA-002': { doiTac: 'Toyota Motor Corp.', diaDiem: 'KCN Vĩnh Phúc', nganh: 'Sản xuất ô tô', quyMo: '800 lao động', tongVon: '250,000', tinhHinh: 'Hoàn thành giai đoạn 1' },
  'DA-003': { doiTac: 'Intel Corporation', diaDiem: 'TP. Hồ Chí Minh', nganh: 'Công nghệ thông tin', quyMo: '300 lao động', tongVon: '400,000', tinhHinh: 'Đang xây dựng' },
};

function Tab3CamKetDauTu({ isView }: { isView: boolean }) {
  const cols = ['STT', 'Tên dự án', 'Đối tác', 'Địa điểm dự án', 'Ngành/Lĩnh vực',
    'Quy mô, công suất', 'Tổng vốn ĐT (triệu đồng)', 'Tình hình triển khai', 'Hành động'];

  const [selectedProject, setSelectedProject] = useState('');
  const [doiTac, setDoiTac] = useState('');
  const [diaDiem, setDiaDiem] = useState('');
  const [nganh, setNganh] = useState('');
  const [quyMo, setQuyMo] = useState('');
  const [tongVon, setTongVon] = useState('');
  const [tinhHinh, setTinhHinh] = useState('');

  const rowFieldsDisabled = isView || !selectedProject;
  const roFieldCls = rowFieldsDisabled ? 'bg-[#f9fafb]' : '';

  function handleProjectSelect(code: string) {
    setSelectedProject(code);
    const data = tab3ProjectDb[code];
    if (data) {
      setDoiTac(data.doiTac); setDiaDiem(data.diaDiem); setNganh(data.nganh);
      setQuyMo(data.quyMo); setTongVon(data.tongVon); setTinhHinh(data.tinhHinh);
    } else {
      setDoiTac(''); setDiaDiem(''); setNganh('');
      setQuyMo(''); setTongVon(''); setTinhHinh('');
    }
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-bold text-[20px] leading-[28px] text-[#101828]">
          Mẫu B.IV.4: Báo cáo tình hình thực hiện các cam kết/thỏa thuận
        </h2>
        <p className="text-[14px] text-[#4a5565] mt-1">Hợp tác đầu tư/Chủ trương đầu tư</p>
      </div>
      <Card className="mb-6">
        <CardHeader><CardTitle>Thông tin đơn vị</CardTitle></CardHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label required={!isView}>Cơ quan lập báo cáo</Label>
            <Input placeholder="Nhập tên cơ quan lập báo cáo" readOnly={isView} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label required={!isView}>Năm</Label>
            <Input placeholder="2026" readOnly={isView} />
          </div>
        </div>
      </Card>
      <Card padded={false} className="mb-6">
        <div className="p-6 pb-4 flex items-center justify-between">
          <CardTitle>Danh sách cam kết đầu tư</CardTitle>
          {!isView && <Button variant="outline" size="sm">+ Thêm hàng</Button>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-t border-[#e5e7eb] min-w-[1100px]">
            <thead className="bg-[#f3f4f6]">
              <tr>{cols.map((c) => <th key={c} className={thCls}>{c}</th>)}</tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#e5e7eb] hover:bg-[#f9fafb]">
                <td className={`${tdCls} text-center`}>1</td>
                <td className={tdCls}>
                  {isView ? (
                    <Input value={selectedProject} readOnly className="bg-[#f9fafb]" />
                  ) : (
                    <select
                      className="w-full h-10 px-3 bg-white border border-[#e5e7eb] rounded-[8px] text-[14px] text-[#0a0a0a] outline-none"
                      value={selectedProject}
                      onChange={(e) => handleProjectSelect(e.target.value)}
                    >
                      <option value="">-- Chọn dự án --</option>
                      <option value="DA-001">Nhà máy sản xuất linh kiện điện tử</option>
                      <option value="DA-002">Nhà máy lắp ráp ô tô</option>
                      <option value="DA-003">Trung tâm R&D chip bán dẫn</option>
                    </select>
                  )}
                </td>
                <td className={tdCls}><Input placeholder="Đối tác" value={doiTac} onChange={(e) => setDoiTac(e.target.value)} readOnly={rowFieldsDisabled} className={roFieldCls} /></td>
                <td className={tdCls}><Input placeholder="Địa điểm" value={diaDiem} onChange={(e) => setDiaDiem(e.target.value)} readOnly={rowFieldsDisabled} className={roFieldCls} /></td>
                <td className={tdCls}><Input placeholder="Ngành" value={nganh} onChange={(e) => setNganh(e.target.value)} readOnly={rowFieldsDisabled} className={roFieldCls} /></td>
                <td className={tdCls}><Input placeholder="Quy mô" value={quyMo} onChange={(e) => setQuyMo(e.target.value)} readOnly={rowFieldsDisabled} className={roFieldCls} /></td>
                <td className={tdCls}><Input placeholder="0" value={tongVon} onChange={(e) => setTongVon(e.target.value)} readOnly={rowFieldsDisabled} className={roFieldCls} /></td>
                <td className={tdCls}><Input placeholder="Tình hình thực hiện..." value={tinhHinh} onChange={(e) => setTinhHinh(e.target.value)} readOnly={rowFieldsDisabled} className={roFieldCls} /></td>
                <td className={tdCls}><Button variant="ghost" size="sm">Xóa</Button></td>
              </tr>
              <tr className="border-t border-[#e5e7eb] bg-[#f9fafb] font-semibold">
                <td colSpan={6} className={`${tdCls} text-right`}>TỔNG SỐ</td>
                <td className={tdCls}>{tongVon || '0'}</td><td className={tdCls} /><td className={tdCls} />
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function Tab4DuAnDTNN({ isView }: { isView: boolean }) {
  return (
    <>
      <div className="mb-4">
        <h2 className="font-bold text-[20px] leading-[28px] text-[#101828]">
          Mẫu A.IV.4: Danh mục dự án ĐTNN đang có nhà đầu tư quan tâm
        </h2>
        <p className="text-[14px] text-[#4a5565] mt-1">Hợp tác đầu tư/Chủ trương đầu tư</p>
      </div>
      <Card className="mb-6">
        <CardHeader><CardTitle>Thông tin đơn vị</CardTitle></CardHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label required={!isView}>Cơ quan lập báo cáo</Label>
            <Input placeholder="Nhập tên cơ quan lập báo cáo" readOnly={isView} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label required={!isView}>Năm</Label>
            <Input placeholder="2026" readOnly={isView} />
          </div>
        </div>
      </Card>
      <Card padded={false} className="mb-6">
        <div className="p-6 pb-4 flex items-center justify-between">
          <CardTitle>Danh sách cam kết đầu tư</CardTitle>
          {!isView && <Button variant="outline" size="sm">+ Thêm hàng</Button>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-t border-[#e5e7eb] min-w-[1700px]">
            <thead className="bg-[#f3f4f6]">
              <tr>
                <th rowSpan={2} className={`${thCls} w-[50px]`}>STT</th>
                <th rowSpan={2} className={thCls}>Tên nhà đầu tư *</th>
                <th rowSpan={2} className={`${thCls} w-[100px]`}>Nước đăng ký</th>
                <th rowSpan={2} className={thCls}>Tên dự án</th>
                <th rowSpan={2} className={`${thCls} w-[130px]`}>Vốn đăng ký dự kiến (USD)</th>
                <th rowSpan={2} className={`${thCls} w-[100px]`}>Ngành cấp 1</th>
                <th rowSpan={2} className={thCls}>Mục tiêu dự án</th>
                <th rowSpan={2} className={`${thCls} w-[100px]`}>Địa điểm</th>
                <th rowSpan={2} className={`${thCls} w-[100px]`}>Diện tích đất (m²)</th>
                <th colSpan={3} className={thGroupCls}>Thuộc danh mục dự án thu hút đầu tư</th>
                <th rowSpan={2} className={thCls}>Đề xuất</th>
                <th rowSpan={2} className={`${thCls} w-[50px]`} />
              </tr>
              <tr>
                <th className={`${thCls} w-[90px]`}>Quốc gia</th>
                <th className={`${thCls} w-[90px]`}>Lĩnh vực</th>
                <th className={`${thCls} w-[90px]`}>Địa phương</th>
              </tr>
            </thead>
            <tbody>
              {[
                { stt: '1', ten: 'Samsung Electronics Co., Ltd.', nuoc: 'Hàn Quốc', duAn: 'Nhà máy sản xuất linh kiện điện tử', von: '500,000,000', nganh: 'Công nghiệp chế tạo', mucTieu: 'Sản xuất linh kiện điện tử, xuất khẩu', diaDiem: 'KCN Bắc Ninh', dienTich: '150,000', qg: 'Có', lv: 'Công nghệ cao', dp: 'Ưu tiên' },
                { stt: '2', ten: 'Toyota Motor Corporation', nuoc: 'Nhật Bản', duAn: 'Nhà máy lắp ráp ô tô', von: '800,000,000', nganh: 'Sản xuất ô tô', mucTieu: 'Lắp ráp và phân phối ô tô trong nước', diaDiem: 'KCN Vĩnh Phúc', dienTich: '250,000', qg: 'Có', lv: 'Công nghiệp', dp: 'Trọng điểm' },
                { stt: '3', ten: 'Intel Corporation', nuoc: 'Hoa Kỳ', duAn: 'Trung tâm R&D chip bán dẫn', von: '1,200,000,000', nganh: 'Công nghệ thông tin', mucTieu: 'Nghiên cứu và phát triển chip bán dẫn', diaDiem: 'TP. Hồ Chí Minh', dienTich: '80,000', qg: 'Có', lv: 'Công nghệ cao', dp: 'Ưu tiên cao' },
              ].map((r) => (
                <tr key={r.stt} className="border-t border-[#e5e7eb] hover:bg-[#f9fafb]">
                  <td className={`${tdCls} text-center`}>{r.stt}</td>
                  <td className={tdCls}>{r.ten}</td>
                  <td className={tdCls}>{r.nuoc}</td>
                  <td className={tdCls}>{r.duAn}</td>
                  <td className={`${tdCls} text-right`}>{r.von}</td>
                  <td className={tdCls}>{r.nganh}</td>
                  <td className={tdCls}>{r.mucTieu}</td>
                  <td className={tdCls}>{r.diaDiem}</td>
                  <td className={`${tdCls} text-right`}>{r.dienTich}</td>
                  <td className={tdCls}>{r.qg}</td>
                  <td className={tdCls}>{r.lv}</td>
                  <td className={tdCls}>{r.dp}</td>
                  <td className={tdCls}><Input placeholder="Nhập đề xuất..." readOnly={isView} /></td>
                  <td className={tdCls}>{!isView && (
                    <button className="text-[#6b7280] hover:text-[#ef4444]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                    </button>
                  )}</td>
                </tr>
              ))}
              <tr className="border-t border-[#e5e7eb] bg-[#f9fafb] font-semibold">
                <td colSpan={4} className={`${tdCls} text-right`}>TỔNG: 3</td>
                <td className={`${tdCls} text-right`}>2,500,000,000</td>
                <td colSpan={9} className={tdCls} />
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function SelectYear({ id, value, onChange, disabled }: {
  id: string; value: string; onChange: (v: string) => void; disabled: boolean;
}) {
  return (
    <div className="relative">
      <select id={id}
        className={`w-full h-10 pl-3 pr-8 bg-[#f3f3f5] border border-transparent rounded-[8px] text-[14px] font-medium text-[#0a0a0a] outline-none appearance-none cursor-pointer ${disabled ? 'bg-[#f9fafb]' : ''}`}
        value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
        <option value="">Chọn năm</option>
        {[2022, 2023, 2024, 2025, 2026].map((y) => <option key={y} value={String(y)}>{y}</option>)}
      </select>
      <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a0a0a]" fill="none" viewBox="0 0 16 16">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function ReportXTDTForm({ mode = 'create' }: ReportXTDTFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isView = mode === 'view';
  const isCreate = mode === 'create';

  const [activeTab, setActiveTab] = useState<ActiveTab>('tab1');
  const [soCongVan, setSoCongVan] = useState(isCreate ? '' : 'CV-2025-001');
  const [namBaoCao, setNamBaoCao] = useState(isCreate ? '' : '2025');

  const tabs: { key: ActiveTab; label: string }[] = [
    { key: 'tab1', label: 'Tab 1: Báo cáo kết quả' },
    { key: 'tab2', label: 'Tab 2: Biểu tổng hợp' },
    { key: 'tab3', label: 'Tab 3: Cam kết đầu tư' },
    { key: 'tab4', label: 'Tab 4: Dự án ĐTNN' },
  ];

  const showSubmit = activeTab === 'tab4';

  return (
    <Container>
      <Breadcrumb items={[
        { label: 'Trang chủ', to: '/' },
        { label: 'Tổng hợp báo cáo theo phân hệ', to: '/feature-2' },
        { label: 'Quản lý xúc tiến đầu tư', to: '/feature-3' },
        { label: mode === 'create' ? 'Lập báo cáo' : mode === 'edit' ? 'Chỉnh sửa' : 'Xem chi tiết' },
      ]} />

      <div className="flex items-start justify-between mb-0">
        <h1 className="font-bold text-[24px] leading-[32px] text-[#101828]">
          LẬP BỘ BÁO CÁO XÚC TIẾN ĐẦU TƯ
        </h1>
        {!isCreate && (
          <Badge tone={mode === 'view' ? 'success' : 'warning'}>
            {mode === 'view' ? 'Đã nộp' : 'Lưu nháp'}
          </Badge>
        )}
      </div>

      <div className="border-b border-[#e5e7eb] mb-6 mt-4">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-[25px] py-[13px] text-[14px] font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'border border-[#a50000] text-[#a50000]'
                  : 'border border-transparent text-[#0a0a0a] hover:text-[#a50000]'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'tab1' && (
        <Tab1BaoCaoKetQua isView={isView} soCongVan={soCongVan} setSoCongVan={setSoCongVan}
          namBaoCao={namBaoCao} setNamBaoCao={setNamBaoCao} />
      )}
      {activeTab === 'tab2' && <Tab2BieuTongHop isView={isView} />}
      {activeTab === 'tab3' && <Tab3CamKetDauTu isView={isView} />}
      {activeTab === 'tab4' && <Tab4DuAnDTNN isView={isView} />}

      <div className="flex items-center justify-end gap-4 py-4 border-t border-[#e5e7eb] mt-6">
        <Button variant="outline" onClick={() => navigate('/feature-3')}>Hủy</Button>
        <Button variant="outline" onClick={() => id ? navigate(`/feature-3/${id}/view`) : alert('Lưu nháp trước để xem')}>Xem</Button>
        {!isView && (
          <>
            <Button variant="secondary" onClick={() => alert('Đã lưu nháp.')}>Lưu nháp</Button>
            {showSubmit && (
              <Button variant="primary" onClick={() => { if (confirm('Gửi báo cáo?')) { alert('Đã gửi.'); navigate('/feature-3'); } }}>
                Gửi báo cáo
              </Button>
            )}
          </>
        )}
        {isView && (
          <Button variant="outline" onClick={() => navigate(`/feature-3/${id}/edit`)}>Chỉnh sửa</Button>
        )}
      </div>
    </Container>
  );
}