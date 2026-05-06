// Feature: 42 - Tình hình thu hút đầu tư vào KCN
// Screen: Detail view — nhập liệu theo KCN (Tab nước ngoài + Tab trong nước)
// Figma Nodes: 2241:1240 (tab nước ngoài), 2241:1684 (tab trong nước)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/shared/Container';

type TabType = 'nuocNgoai' | 'trongNuoc';

// ---- Columns definition ----
const COLUMNS_NUOC_NGOAI = [
  'STT',
  'Tên KCN',
  'Số DA cấp mới',
  'Vốn ĐK mới (tr.USD)',
  'Số DA tăng vốn',
  'Vốn tăng (tr.USD)',
  'Số DA giảm vốn',
  'Vốn giảm (tr.USD)',
  'Số DA thu hồi',
  'Vốn thu hồi (tr.USD)',
  'Biến động DT (ha)',
  'Doanh thu (tr.USD)',
  'Xuất khẩu (tr.USD)',
  'Nhập khẩu (tr.USD)',
  'Nộp NS (tỷ VNĐ)',
  'Xóa',
] as const;

const COLUMNS_TRONG_NUOC = [
  'STT',
  'Tên KCN',
  'Số DA cấp mới',
  'Vốn ĐK mới (tỷ VNĐ)',
  'Số DA tăng vốn',
  'Vốn tăng (tỷ VNĐ)',
  'Số DA giảm vốn',
  'Vốn giảm (tỷ VNĐ)',
  'Số DA thu hồi',
  'Vốn thu hồi (tỷ VNĐ)',
  'Biến động DT (ha)',
  'Doanh thu (tỷ VNĐ)',
  'Xuất khẩu (tỷ VNĐ)',
  'Nhập khẩu (tỷ VNĐ)',
  'Nộp NS (tỷ VNĐ)',
  'Xóa',
] as const;

// Numeric fields (indices 2–14 in both column sets — everything except STT, Tên KCN, Xóa)
const NUM_FIELDS = 13; // indices 2..14

interface KCNDataRow {
  id: string;
  tenKCN: string;
  values: number[]; // length = NUM_FIELDS (13 numeric values)
}

const initialNuocNgoaiRows: KCNDataRow[] = [
  {
    id: 'kn1',
    tenKCN: 'KCN Tân Thuận',
    values: Array(NUM_FIELDS).fill(0),
  },
];

const initialTrongNuocRows: KCNDataRow[] = [
  {
    id: 'tn1',
    tenKCN: 'KCN Việt Nam - Singapore',
    values: Array(NUM_FIELDS).fill(0),
  },
];

function computeTotals(rows: KCNDataRow[]): number[] {
  const totals = Array(NUM_FIELDS).fill(0);
  for (const row of rows) {
    for (let i = 0; i < NUM_FIELDS; i++) {
      totals[i] += row.values[i] ?? 0;
    }
  }
  return totals;
}

interface EditableTableProps {
  columns: readonly string[];
  rows: KCNDataRow[];
  onChangeKCNName: (id: string, value: string) => void;
  onChangeValue: (id: string, fieldIndex: number, value: number) => void;
  onDeleteRow: (id: string) => void;
  onAddRow: () => void;
}

function EditableTable({
  columns,
  rows,
  onChangeKCNName,
  onChangeValue,
  onDeleteRow,
  onAddRow,
}: EditableTableProps) {
  const totals = computeTotals(rows);

  return (
    <div className="flex flex-col gap-6">
      {/* Add KCN button row */}
      <div className="flex justify-end">
        <button
          onClick={onAddRow}
          className="h-[36px] px-4 flex items-center gap-2 bg-[#a50000] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#8a0000] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
            <path
              d="M8 3v10M3 8h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Thêm khu công nghiệp
        </button>
      </div>

      {/* Table */}
      <div className="border border-[#e5e7eb] rounded-[10px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: '1400px' }}>
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[rgba(0,0,0,0.1)]">
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-2 py-[10px] text-left text-[14px] font-medium text-[#0a0a0a] whitespace-nowrap"
                    style={{
                      width:
                        col === 'STT'
                          ? '42px'
                          : col === 'Tên KCN'
                            ? '200px'
                            : col === 'Xóa'
                              ? '52px'
                              : '130px',
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Data rows */}
              {rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className="border-b border-[rgba(0,0,0,0.1)] last:border-0"
                >
                  {/* STT */}
                  <td className="px-2 py-[8.5px]">
                    <div className="h-[36px] w-[26px] flex items-center bg-[#f3f3f5] rounded-[8px] px-[12px] text-[14px] text-[#0a0a0a]">
                      {rowIndex + 1}
                    </div>
                  </td>

                  {/* Tên KCN */}
                  <td className="px-2 py-[8.5px]">
                    <div className="h-[36px] flex items-center justify-between bg-[#f3f3f5] rounded-[8px] px-3">
                      <input
                        className="flex-1 bg-transparent text-[14px] font-medium text-[#0a0a0a] outline-none"
                        value={row.tenKCN}
                        onChange={(e) => onChangeKCNName(row.id, e.target.value)}
                      />
                      <svg className="w-4 h-4 text-[#6a7282] shrink-0 ml-2" fill="none" viewBox="0 0 16 16">
                        <path
                          d="M12 4L4 12M4 4l8 8"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </td>

                  {/* Numeric fields */}
                  {row.values.map((val, fi) => (
                    <td key={fi} className="px-2 py-[8.5px]">
                      <div className="h-[36px] flex items-center bg-[#f3f3f5] rounded-[8px] px-3">
                        <input
                          type="number"
                          className="w-full bg-transparent text-[14px] text-[#717182] outline-none"
                          value={val}
                          onChange={(e) =>
                            onChangeValue(row.id, fi, Number(e.target.value))
                          }
                        />
                      </div>
                    </td>
                  ))}

                  {/* Delete */}
                  <td className="px-2 py-[8.5px]">
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
                  </td>
                </tr>
              ))}

              {/* Tổng cộng row */}
              <tr className="bg-[#f9fafb]">
                {/* STT cell - empty in totals */}
                <td />
                {/* Tổng cộng label spans Tên KCN */}
                <td className="px-2 py-[8px]">
                  <span className="text-[14px] font-semibold text-[#0a0a0a]">Tổng cộng</span>
                </td>
                {/* Totals */}
                {totals.map((total, fi) => (
                  <td key={fi} className="px-2 py-[8px]">
                    <span className="text-[14px] font-semibold text-[#0a0a0a]">{total}</span>
                  </td>
                ))}
                {/* Empty delete cell */}
                <td />
              </tr>
            </tbody>
          </table>
        </div>
        {/* Horizontal scroll hint */}
        <div className="h-[5px] mx-4 my-2 bg-[#939393] rounded-[5px] opacity-30" />
      </div>
    </div>
  );
}

export default function ReportKCNDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('nuocNgoai');

  // Nước ngoài state
  const [nuocNgoaiRows, setNuocNgoaiRows] = useState<KCNDataRow[]>(initialNuocNgoaiRows);

  // Trong nước state
  const [trongNuocRows, setTrongNuocRows] = useState<KCNDataRow[]>(initialTrongNuocRows);

  // --- Handlers for nước ngoài ---
  function handleNNChangeKCNName(id: string, value: string) {
    setNuocNgoaiRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, tenKCN: value } : r))
    );
  }
  function handleNNChangeValue(id: string, fi: number, value: number) {
    setNuocNgoaiRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const vals = [...r.values];
        vals[fi] = value;
        return { ...r, values: vals };
      })
    );
  }
  function handleNNDeleteRow(id: string) {
    setNuocNgoaiRows((prev) => prev.filter((r) => r.id !== id));
  }
  function handleNNAddRow() {
    setNuocNgoaiRows((prev) => [
      ...prev,
      {
        id: `kn${Date.now()}`,
        tenKCN: '',
        values: Array(NUM_FIELDS).fill(0),
      },
    ]);
  }

  // --- Handlers for trong nước ---
  function handleTNChangeKCNName(id: string, value: string) {
    setTrongNuocRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, tenKCN: value } : r))
    );
  }
  function handleTNChangeValue(id: string, fi: number, value: number) {
    setTrongNuocRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const vals = [...r.values];
        vals[fi] = value;
        return { ...r, values: vals };
      })
    );
  }
  function handleTNDeleteRow(id: string) {
    setTrongNuocRows((prev) => prev.filter((r) => r.id !== id));
  }
  function handleTNAddRow() {
    setTrongNuocRows((prev) => [
      ...prev,
      {
        id: `tn${Date.now()}`,
        tenKCN: '',
        values: Array(NUM_FIELDS).fill(0),
      },
    ]);
  }

  return (
    <Container>
      {/* Header: Quay lại + tiêu đề + breadcrumb info */}
      <div className="flex items-start gap-4 mb-6">
        {/* Quay lại button */}
        <button
          className="h-[32px] flex items-center gap-1 text-[14px] font-medium text-[#0a0a0a] hover:text-[#a50000] transition-colors shrink-0"
          onClick={() => navigate('/feature-42')}
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

        {/* Title + breadcrumb info */}
        <div className="flex flex-col gap-[2px]">
          <h1 className="font-semibold text-[24px] leading-[36px] text-[#101828]">
            Tình hình thu hút đầu tư vào khu công nghiệp trong kỳ báo cáo
          </h1>
          <p className="text-[14px] text-[#4a5565]">
            Mã báo cáo: BC-2026-001 • Kỳ báo cáo: Quý 1
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="inline-flex bg-[#ececf0] rounded-[14px] p-[3px]">
          <button
            className={`h-[29px] px-[9px] py-[5px] rounded-[14px] text-[14px] font-medium text-[#0a0a0a] transition-all ${
              activeTab === 'nuocNgoai'
                ? 'bg-white border border-transparent shadow-sm'
                : 'bg-transparent hover:bg-white/50'
            }`}
            onClick={() => setActiveTab('nuocNgoai')}
          >
            Dự án đầu tư nước ngoài
          </button>
          <button
            className={`h-[29px] px-[9px] py-[5px] rounded-[14px] text-[14px] font-medium text-[#0a0a0a] transition-all ${
              activeTab === 'trongNuoc'
                ? 'bg-white border border-transparent shadow-sm'
                : 'bg-transparent hover:bg-white/50'
            }`}
            onClick={() => setActiveTab('trongNuoc')}
          >
            Dự án đầu tư trong nước
          </button>
        </div>
      </div>

      {/* Tab panel: Dự án đầu tư nước ngoài */}
      {activeTab === 'nuocNgoai' && (
        <EditableTable
          columns={COLUMNS_NUOC_NGOAI}
          rows={nuocNgoaiRows}
          onChangeKCNName={handleNNChangeKCNName}
          onChangeValue={handleNNChangeValue}
          onDeleteRow={handleNNDeleteRow}
          onAddRow={handleNNAddRow}
        />
      )}

      {/* Tab panel: Dự án đầu tư trong nước */}
      {activeTab === 'trongNuoc' && (
        <EditableTable
          columns={COLUMNS_TRONG_NUOC}
          rows={trongNuocRows}
          onChangeKCNName={handleTNChangeKCNName}
          onChangeValue={handleTNChangeValue}
          onDeleteRow={handleTNDeleteRow}
          onAddRow={handleTNAddRow}
        />
      )}

      {/* Action bar: Hủy / Lưu nháp / Gửi báo cáo */}
      <div className="flex items-center justify-end gap-4 mt-8 pb-8">
        <button
          className="h-[40px] px-[13px] py-[6px] bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[14px] font-medium text-[#0a0a0a] hover:bg-[#f3f3f5] transition-colors"
          onClick={() => navigate('/feature-42')}
        >
          Hủy
        </button>

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
    </Container>
  );
}
