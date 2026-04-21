---
description: "Variant B — Single-call: gọi get_design_context 1 lần trên parent frame, tách components từ kết quả. Nhanh nhất."
args: "[Figma URL] — URL file Figma (https://figma.com/design/:fileKey/...)"
---

## Yêu cầu đầu vào
- **Bắt buộc**: URL Figma file (extract fileKey từ URL)
- Nếu user không cung cấp URL → hỏi trước khi chạy

## Steps

### 1. Khởi tạo project Vite + React
- Kiểm tra nếu chưa có `app/package.json` → khởi tạo: `npm create vite@latest app -- --template react-ts`
- Cài dependencies: `cd app && npm install react-router-dom tailwindcss @tailwindcss/vite`
- Setup Tailwind: thêm plugin `@tailwindcss/vite` vào `vite.config.ts`, thêm `@import "tailwindcss"` vào `app/src/index.css`
- Tạo cấu trúc thư mục: `src/pages/`, `src/components/shared/`, `src/theme/`, `src/hooks/`, `src/services/`, `src/types/`, `src/layouts/`

### 2. Khám phá cấu trúc Figma + Chọn parent frame
- Gọi **`get_metadata(nodeId="0:1", fileKey)`** trên root page
  - Lấy danh sách pages, frames, tên layers + node IDs
- Chọn **1 frame đại diện lớn nhất** (ưu tiên: homepage/trang chủ)
  - Tiêu chí: frame chứa nhiều shared components nhất (Header, BottomNav, Card...)
- Output: 1 nodeId của parent frame

### 3. Gen Shared Components + Trích xuất Design Tokens (1 call)
- Gọi **`create_design_system_rules`** với `clientFrameworks=react`, `clientLanguages=typescript,css`
- Gọi **`get_design_context(nodeId=<parent_frame>, fileKey)`** — **CHỈ 1 LẦN**
  - Nhận: reference code chứa toàn bộ cây con (Header, BottomNav, Card, Button... đều nằm trong)
  - Nhận: screenshot toàn bộ frame
- **Từ reference code trả về**:
  - Xác định shared components: tìm các block code có tên layer rõ ràng (BottomNavigation, Header, Container với pattern lặp...)
  - Tách từng component thành file React riêng
  - Trích xuất tokens: colors (hex), fonts, spacing, border-radius
- Gen theme files:
  - `app/src/theme/colors.ts`, `typography.ts`, `spacing.ts`, `index.ts`
- Kết quả: `app/src/components/shared/` + `app/src/theme/`

**⚠️ Lưu ý rủi ro**:
- Nếu parent frame quá lớn (>100 layers) → response có thể bị cắt → thiếu components
- Components không có ở parent frame này sẽ bị bỏ sót
- Screenshot chỉ có 1 ảnh toàn cảnh, không có ảnh riêng từng component

### 4. Setup Routing cơ bản
- Tạo `app/src/router.tsx` với React Router (BrowserRouter + Routes rỗng)
- Tạo `app/src/layouts/AppLayout.tsx` — layout wrapper (mobile-first, max-width 430px centered)
- Cập nhật `app/src/main.tsx` với RouterProvider
- Chạy `npx tsc --noEmit` để verify 0 errors

### 5. Cập nhật plan & Báo cáo
- Gọi skill **`write_plan`**
- Báo cáo: project path, tokens, shared components
- **Ghi chú nếu có components bị thiếu** do response bị cắt

## Đánh giá
- **MCP calls**: get_metadata x1 + create_design_system_rules x1 + get_design_context x1 = **3 calls**
- **Ưu điểm**: Nhanh nhất, ít calls nhất
- **Nhược điểm**: Có thể thiếu components không nằm trong parent frame, response lớn có thể bị cắt
