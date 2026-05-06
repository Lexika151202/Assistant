// Feature: 1 - Dashboard tổng quan hệ thống báo cáo
// Screen: Dashboard
// Figma Node: 287:3

import { useState, useMemo } from 'react';
import { Button } from '../../components/shared/Button';
import { Input } from '../../components/shared/Input';
import { Table, THead, TBody, TR, TH, TD } from '../../components/shared/Table';
import { Badge } from '../../components/shared/Badge';

// ---- Icons (inline SVG) ----

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 14L10.667 10.667M12 6.667A5.333 5.333 0 1 1 1.333 6.667a5.333 5.333 0 0 1 10.667 0Z"
        stroke="#717182"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4h12M4.667 8h6.666M7.333 12h1.334" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4h12M4.667 8h6.666M7.333 12h1.334" stroke="#0a0a0a" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UsersIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <path d="M8 12l3 3 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AlertCircleIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <path d="M12 8v4M12 16h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ---- Static Data ----

// Địa phương tab data
const diaLuongBarData = [
  { name: 'TP.HCM', pct: 98 },
  { name: 'Hà Nội', pct: 95 },
  { name: 'Đà Nẵng', pct: 90 },
  { name: 'Bình Dương', pct: 85 },
  { name: 'Ninh Thuận', pct: 60 },
];

const diaLuongTableData = [
  { stt: 1, ten: 'Sở Kế hoạch & Đầu tư Hải Phòng', donVi: 8, chuaHoanThanh: 3 },
  { stt: 2, ten: 'Sở Kế hoạch & Đầu tư Đồng Nai', donVi: 12, chuaHoanThanh: 3 },
  { stt: 3, ten: 'Sở Kế hoạch & Đầu tư Bình Dương', donVi: 10, chuaHoanThanh: 3 },
  { stt: 4, ten: 'Sở Kế hoạch & Đầu tư Nghệ An', donVi: 9, chuaHoanThanh: 2 },
  { stt: 5, ten: 'Sở Kế hoạch & Đầu tư Thanh Hóa', donVi: 11, chuaHoanThanh: 2 },
  { stt: 6, ten: 'Sở Kế hoạch & Đầu tư Quảng Ninh', donVi: 7, chuaHoanThanh: 2 },
  { stt: 7, ten: 'Sở Kế hoạch & Đầu tư Bà Rịa - Vũng Tàu', donVi: 9, chuaHoanThanh: 2 },
  { stt: 8, ten: 'Sở Kế hoạch & Đầu tư Khánh Hòa', donVi: 6, chuaHoanThanh: 1 },
];

const chuaGuiData = [
  { stt: 1, ten: 'Sở KH&ĐT Hải Phòng', loaiBaoCao: 'Báo cáo 6 tháng - Thiếu thông tin dự án' },
  { stt: 2, ten: 'Sở KH&ĐT Bình Dương', loaiBaoCao: 'Báo cáo xúc tiến - Dữ liệu không nhất quán' },
  { stt: 3, ten: 'Sở KH&ĐT Đồng Nai', loaiBaoCao: 'Báo cáo 6 tháng - Thiếu chữ ký xác nhận' },
  { stt: 4, ten: 'Sở KH&ĐT Nghệ An', loaiBaoCao: 'Báo cáo xúc tiến - Số liệu chưa rõ ràng' },
  { stt: 5, ten: 'Sở KH&ĐT Thanh Hóa', loaiBaoCao: 'Báo cáo 6 tháng - Chưa đảm bảo yêu cầu' },
  { stt: 6, ten: 'Sở KH&ĐT Quảng Ninh', loaiBaoCao: 'Báo cáo xúc tiến - Thiếu thông tin' },
];

// Nhà đầu tư tab data
const nhaBarData = [
  { name: 'Thương mại', pct: 95 },
  { name: 'Công nghiệp', pct: 88 },
  { name: 'Năng lượng', pct: 75 },
  { name: 'Nông nghiệp', pct: 70 },
  { name: 'Dịch vụ', pct: 55 },
];

const nhaLinhVucData = [
  { stt: 1, linhVuc: 'Thương mại', tongSo: 120, daHoanThanh: 114, chuaHoanThanh: 4, quaHan: 2 },
  { stt: 2, linhVuc: 'Công nghiệp', tongSo: 98, daHoanThanh: 86, chuaHoanThanh: 8, quaHan: 4 },
  { stt: 3, linhVuc: 'Năng lượng', tongSo: 45, daHoanThanh: 34, chuaHoanThanh: 7, quaHan: 4 },
  { stt: 4, linhVuc: 'Nông nghiệp', tongSo: 32, daHoanThanh: 22, chuaHoanThanh: 7, quaHan: 3 },
  { stt: 5, linhVuc: 'Dịch vụ', tongSo: 55, daHoanThanh: 30, chuaHoanThanh: 15, quaHan: 10 },
];

const ndtChamNopData = [
  { stt: 1, ten: 'Công ty ABC', duAn: 'Nhà máy sản xuất', diaPhuong: 'Bình Dương', linhVuc: 'Công nghiệp', quaHan: '8 ngày' },
  { stt: 2, ten: 'Công ty CP XYZ', duAn: 'Dự án thương mại điện tử', diaPhuong: 'Hà Nội', linhVuc: 'Thương mại', quaHan: '5 ngày' },
  { stt: 3, ten: 'Công ty CP Đầu tư DEF', duAn: 'Dự án năng lượng tái tạo', diaPhuong: 'Ninh Thuận', linhVuc: 'Năng lượng', quaHan: '12 ngày' },
  { stt: 4, ten: 'Tập đoàn GHI', duAn: 'Khu đô thị mới', diaPhuong: 'TP.HCM', linhVuc: 'Thương mại', quaHan: '3 ngày' },
  { stt: 5, ten: 'Công ty TNHH JKL', duAn: 'Nhà máy xi măng', diaPhuong: 'Hà Nội', linhVuc: 'Công nghiệp', quaHan: '7 ngày' },
];

// ---- Sub-components ----

interface StatCardProps {
  label: string;
  value: number | string;
  bg: string;
  border: string;
  textColor: string;
  icon: React.ReactNode;
}

function StatCard({ label, value, bg, border, textColor, icon }: StatCardProps) {
  return (
    <div
      className="flex-1 rounded-[14px] p-6 flex items-start justify-between min-w-0"
      style={{ backgroundColor: bg, border: `1.778px solid ${border}` }}
    >
      <div className="flex flex-col gap-1">
        <p className="text-[14px] leading-[20px] opacity-80" style={{ color: textColor }}>
          {label}
        </p>
        <p className="text-[30px] leading-[36px] font-bold" style={{ color: textColor }}>
          {value}
        </p>
      </div>
      <div className="opacity-60 shrink-0">{icon}</div>
    </div>
  );
}

// Donut chart (CSS conic-gradient)
interface DonutChartProps {
  segments: { pct: number; color: string; label: string }[];
}

function DonutChart({ segments }: DonutChartProps) {
  // Build conic-gradient string
  let accumulated = 0;
  const stops = segments.map((s) => {
    const start = accumulated;
    accumulated += s.pct;
    return `${s.color} ${start}% ${accumulated}%`;
  });
  const gradient = `conic-gradient(${stops.join(', ')})`;

  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0" style={{ width: 120, height: 120 }}>
        <div
          className="rounded-full"
          style={{ width: 120, height: 120, background: gradient }}
        />
        {/* Donut hole */}
        <div
          className="absolute inset-0 m-auto rounded-full bg-white"
          style={{ width: 60, height: 60, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
        />
      </div>
      <div className="flex flex-col gap-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-[13px] leading-[20px] text-[#364153]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Horizontal bar chart
interface BarChartProps {
  data: { name: string; pct: number }[];
  color: string;
}

function HorizontalBarChart({ data, color }: BarChartProps) {
  return (
    <div className="flex flex-col gap-3">
      {data.map((item) => (
        <div key={item.name} className="flex items-center gap-3">
          <span className="text-[13px] text-[#364153] w-[90px] shrink-0 text-right">{item.name}</span>
          <div className="flex-1 h-5 bg-[#f3f4f6] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${item.pct}%`, backgroundColor: color }}
            />
          </div>
          <span className="text-[13px] text-[#364153] w-10 shrink-0">{item.pct}%</span>
        </div>
      ))}
    </div>
  );
}

// ---- Tab: Địa Phương ----

function TabDiaLuong() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredChuaGui = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return chuaGuiData;
    return chuaGuiData.filter(
      (r) =>
        r.ten.toLowerCase().includes(q) ||
        r.loaiBaoCao.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const sortedBarData = useMemo(() => {
    const d = [...diaLuongBarData];
    return sortAsc ? d.sort((a, b) => b.pct - a.pct) : d.sort((a, b) => a.pct - b.pct);
  }, [sortAsc]);

  return (
    <div className="flex flex-col gap-8">
      {/* Section title */}
      <h2 className="text-[18px] leading-[28px] font-semibold text-[#101828]">
        Thống kê tổng hợp Địa phương
      </h2>

      {/* Stat cards */}
      <div className="flex gap-4">
        <StatCard
          label="Tổng số địa phương phải gửi"
          value={63}
          bg="#eff6ff"
          border="#bedbff"
          textColor="#1447e6"
          icon={<UsersIcon color="#1447e6" />}
        />
        <StatCard
          label="Đã hoàn thành"
          value={58}
          bg="#f0fdf4"
          border="#b9f8cf"
          textColor="#008236"
          icon={<CheckCircleIcon color="#008236" />}
        />
        <StatCard
          label="Chưa hoàn thành"
          value={3}
          bg="#fff7ed"
          border="#ffd6a8"
          textColor="#ca3500"
          icon={<ClockIcon color="#ca3500" />}
        />
        <StatCard
          label="Quá hạn"
          value={2}
          bg="#fef2f2"
          border="#ffc9c9"
          textColor="#c10007"
          icon={<AlertCircleIcon color="#c10007" />}
        />
      </div>

      {/* Charts row */}
      <div className="flex gap-6">
        {/* Donut chart */}
        <div className="flex-1 bg-white border border-[#e5e7eb] rounded-[14px] p-6">
          <h3 className="text-[16px] leading-[24px] font-semibold text-[#101828] mb-4">
            Tỷ lệ hoàn thành nghĩa vụ của các địa phương
          </h3>
          <DonutChart
            segments={[
              { pct: 88.7, color: '#008236', label: 'Đã hoàn thành: 88.7%' },
              { pct: 9.3, color: '#ca3500', label: 'Chưa hoàn thành: 9.3%' },
              { pct: 2.0, color: '#c10007', label: 'Quá hạn: 2.0%' },
            ]}
          />
        </div>

        {/* Bar chart */}
        <div className="flex-1 bg-white border border-[#e5e7eb] rounded-[14px] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] leading-[24px] font-semibold text-[#101828]">
              So sánh tỷ lệ hoàn thành giữa các Địa phương
            </h3>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<SortIcon />}
              onClick={() => setSortAsc((v) => !v)}
            >
              Sắp xếp thứ hạng
            </Button>
          </div>
          <HorizontalBarChart data={sortedBarData} color="#1447e6" />
        </div>
      </div>

      {/* Table: Tình hình nộp BC theo địa phương */}
      <div>
        <h3 className="text-[18px] leading-[28px] font-semibold text-[#101828] mb-4">
          Tình hình nộp BC theo địa phương
        </h3>
        <Table>
          <THead>
            <TR>
              <TH className="w-14">STT</TH>
              <TH>Tên Địa phương</TH>
              <TH>Số đơn vị trực thuộc</TH>
              <TH>Số báo cáo chưa hoàn thành</TH>
            </TR>
          </THead>
          <TBody>
            {diaLuongTableData.map((row) => (
              <TR key={row.stt}>
                <TD className="text-center">{row.stt}</TD>
                <TD className="font-medium">{row.ten}</TD>
                <TD>{row.donVi}</TD>
                <TD>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[13px] font-medium bg-[#ffedd4] text-[#9f2d00]">
                    {row.chuaHoanThanh}
                  </span>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </div>

      {/* Table: Danh sách địa phương chậm gửi BC */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[18px] leading-[28px] font-semibold text-[#101828]">
            Danh sách địa phương chậm gửi BC
          </h3>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Tìm kiếm địa phương..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<SearchIcon />}
              className="w-64"
            />
            <div className="relative">
              <button
                onClick={() => setFilterOpen((v) => !v)}
                className="bg-[#f3f3f5] border border-transparent h-10 px-3 rounded-[8px] flex items-center gap-2 hover:bg-[#e9e9ec] transition-colors text-[14px] text-[#0a0a0a]"
              >
                <FilterIcon />
                Lọc
                <ChevronDownIcon />
              </button>
              {filterOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-[#e5e7eb] rounded-[8px] shadow-md z-10 py-1 w-48">
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="w-full text-left px-3 py-2 text-[14px] hover:bg-[#f3f3f5] text-[#a50000] font-medium"
                  >
                    Tất cả
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Table>
          <THead>
            <TR>
              <TH className="w-14">STT</TH>
              <TH>Tên Địa phương</TH>
              <TH>Loại báo cáo</TH>
              <TH>Thao tác</TH>
            </TR>
          </THead>
          <TBody>
            {filteredChuaGui.length === 0 ? (
              <TR>
                <TD colSpan={4} className="text-center text-[#717182] py-6">
                  Không tìm thấy kết quả
                </TD>
              </TR>
            ) : (
              filteredChuaGui.map((row) => (
                <TR key={row.stt}>
                  <TD className="text-center">{row.stt}</TD>
                  <TD className="font-medium">{row.ten}</TD>
                  <TD>{row.loaiBaoCao}</TD>
                  <TD>
                    <button className="text-[14px] text-[#1447e6] hover:underline">
                      Xem chi tiết
                    </button>
                  </TD>
                </TR>
              ))
            )}
          </TBody>
        </Table>
      </div>
    </div>
  );
}

// ---- Tab: Nhà Đầu Tư ----

function TabNhaDauTu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const sortedBarData = useMemo(() => {
    const d = [...nhaBarData];
    return sortAsc ? d.sort((a, b) => b.pct - a.pct) : d.sort((a, b) => a.pct - b.pct);
  }, [sortAsc]);

  const filteredNdt = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ndtChamNopData;
    return ndtChamNopData.filter(
      (r) =>
        r.ten.toLowerCase().includes(q) ||
        r.duAn.toLowerCase().includes(q) ||
        r.diaPhuong.toLowerCase().includes(q) ||
        r.linhVuc.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // NĐT stats
  const tongNdt = 350;
  const daHoanThanh = 320;
  const chuaHoanThanh = 21;
  const quaHan = 9;

  return (
    <div className="flex flex-col gap-8">
      {/* Section title */}
      <h2 className="text-[18px] leading-[28px] font-semibold text-[#101828]">
        Thống kê tổng hợp Nhà đầu tư
      </h2>

      {/* Stat cards */}
      <div className="flex gap-4">
        <StatCard
          label="Tổng số NĐT phải nộp"
          value={tongNdt}
          bg="#eff6ff"
          border="#bedbff"
          textColor="#1447e6"
          icon={<UsersIcon color="#1447e6" />}
        />
        <StatCard
          label="Đã hoàn thành"
          value={daHoanThanh}
          bg="#f0fdf4"
          border="#b9f8cf"
          textColor="#008236"
          icon={<CheckCircleIcon color="#008236" />}
        />
        <StatCard
          label="Chưa hoàn thành"
          value={chuaHoanThanh}
          bg="#fff7ed"
          border="#ffd6a8"
          textColor="#ca3500"
          icon={<ClockIcon color="#ca3500" />}
        />
        <StatCard
          label="Quá hạn"
          value={quaHan}
          bg="#fef2f2"
          border="#ffc9c9"
          textColor="#c10007"
          icon={<AlertCircleIcon color="#c10007" />}
        />
      </div>

      {/* Charts row */}
      <div className="flex gap-6">
        {/* Donut chart */}
        <div className="flex-1 bg-white border border-[#e5e7eb] rounded-[14px] p-6">
          <h3 className="text-[16px] leading-[24px] font-semibold text-[#101828] mb-4">
            Tỷ lệ hoàn thành nghĩa vụ của các nhà đầu tư
          </h3>
          <DonutChart
            segments={[
              { pct: 91.4, color: '#008236', label: 'Đã hoàn thành: 91.4%' },
              { pct: 6.0, color: '#ca3500', label: 'Chưa hoàn thành: 6.0%' },
              { pct: 2.6, color: '#c10007', label: 'Quá hạn: 2.6%' },
            ]}
          />
        </div>

        {/* Bar chart */}
        <div className="flex-1 bg-white border border-[#e5e7eb] rounded-[14px] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] leading-[24px] font-semibold text-[#101828]">
              So sánh tỷ lệ hoàn thành giữa các lĩnh vực
            </h3>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<SortIcon />}
              onClick={() => setSortAsc((v) => !v)}
            >
              Sắp xếp thứ hạng
            </Button>
          </div>
          <HorizontalBarChart data={sortedBarData} color="#008236" />
        </div>
      </div>

      {/* Table: Tình hình nộp BC theo lĩnh vực đầu tư */}
      <div>
        <h3 className="text-[18px] leading-[28px] font-semibold text-[#101828] mb-4">
          Tình hình nộp BC theo lĩnh vực đầu tư
        </h3>
        <Table>
          <THead>
            <TR>
              <TH className="w-14">STT</TH>
              <TH>Lĩnh vực</TH>
              <TH>Tổng số</TH>
              <TH>Đã hoàn thành</TH>
              <TH>Chưa hoàn thành</TH>
              <TH>Quá hạn</TH>
            </TR>
          </THead>
          <TBody>
            {nhaLinhVucData.map((row) => (
              <TR key={row.stt}>
                <TD className="text-center">{row.stt}</TD>
                <TD className="font-medium">{row.linhVuc}</TD>
                <TD>{row.tongSo}</TD>
                <TD>
                  <Badge tone="success">{row.daHoanThanh}</Badge>
                </TD>
                <TD>
                  <Badge tone="warning">{row.chuaHoanThanh}</Badge>
                </TD>
                <TD>
                  <Badge tone="danger">{row.quaHan}</Badge>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </div>

      {/* Table: Danh sách nhà đầu tư chậm nộp BC */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[18px] leading-[28px] font-semibold text-[#101828]">
            Danh sách nhà đầu tư chậm nộp BC
          </h3>
          <Input
            placeholder="Tìm kiếm nhà đầu tư..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<SearchIcon />}
            className="w-64"
          />
        </div>
        <Table>
          <THead>
            <TR>
              <TH className="w-14">STT</TH>
              <TH>Tên NĐT</TH>
              <TH>Dự án</TH>
              <TH>Địa phương</TH>
              <TH>Lĩnh vực</TH>
              <TH>Quá hạn</TH>
            </TR>
          </THead>
          <TBody>
            {filteredNdt.length === 0 ? (
              <TR>
                <TD colSpan={6} className="text-center text-[#717182] py-6">
                  Không tìm thấy kết quả
                </TD>
              </TR>
            ) : (
              filteredNdt.map((row) => (
                <TR key={row.stt}>
                  <TD className="text-center">{row.stt}</TD>
                  <TD className="font-medium">{row.ten}</TD>
                  <TD>{row.duAn}</TD>
                  <TD>{row.diaPhuong}</TD>
                  <TD>{row.linhVuc}</TD>
                  <TD>
                    <Badge tone="danger">{row.quaHan}</Badge>
                  </TD>
                </TR>
              ))
            )}
          </TBody>
        </Table>
      </div>
    </div>
  );
}

// ---- Main Dashboard page ----

type TabKey = 'nha-dau-tu' | 'dia-phuong';

const TIME_FILTERS = ['Tất cả thời gian', 'Tháng này', 'Quý này', 'Năm nay'];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>('dia-phuong');
  const [timeFilter, setTimeFilter] = useState('Tất cả thời gian');
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);

  return (
    <div className="bg-[#f9fafb] min-h-full flex flex-col gap-6 pt-8 px-8 pb-12">
      {/* Page header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[24px] leading-[32px] font-bold text-[#101828]">
          DASHBOARD HỆ THỐNG BÁO CÁO ĐẦU TƯ QUỐC GIA
        </h1>
        <p className="text-[14px] leading-[20px] text-[#4a5565]">
          <span>Phạm vi dữ liệu: </span>
          <span className="font-semibold">Bộ Kế hoạch và Đầu tư</span>
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3">
        <span className="text-[14px] leading-[20px] font-medium text-[#364153]">
          Bộ lọc thời gian:
        </span>
        <div className="relative">
          <button
            onClick={() => setTimeDropdownOpen((v) => !v)}
            className="bg-[#f3f3f5] border border-transparent h-9 px-3 rounded-[8px] flex items-center justify-between gap-2 w-[200px] hover:bg-[#e9e9ec] transition-colors"
          >
            <span className="text-[14px] leading-[20px] font-medium text-[#0a0a0a]">
              {timeFilter}
            </span>
            <ChevronDownIcon />
          </button>
          {timeDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#e5e7eb] rounded-[8px] shadow-md z-10 py-1">
              {TIME_FILTERS.map((t) => (
                <button
                  key={t}
                  onClick={() => { setTimeFilter(t); setTimeDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-[14px] hover:bg-[#f3f3f5] ${timeFilter === t ? 'text-[#a50000] font-medium' : 'text-[#0a0a0a]'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tab list */}
      <div className="bg-white border border-[#e5e7eb] rounded-[14px] h-9 inline-flex items-center p-1 self-start">
        <button
          onClick={() => setActiveTab('nha-dau-tu')}
          className={`h-[26px] px-8 rounded-[12px] text-[14px] font-medium transition-all ${
            activeTab === 'nha-dau-tu'
              ? 'bg-[#a50000] text-white'
              : 'text-[#0a0a0a] hover:bg-[#f3f3f5]'
          }`}
        >
          Nhà đầu tư
        </button>
        <button
          onClick={() => setActiveTab('dia-phuong')}
          className={`h-[26px] px-8 rounded-[12px] text-[14px] font-medium transition-all ${
            activeTab === 'dia-phuong'
              ? 'bg-[#a50000] text-white'
              : 'text-[#0a0a0a] hover:bg-[#f3f3f5]'
          }`}
        >
          Địa phương
        </button>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'dia-phuong' ? <TabDiaLuong /> : <TabNhaDauTu />}
      </div>
    </div>
  );
}
