---
description: "Variant A — Multi-call: gọi get_design_context riêng từng component (3-4 calls). Cách cũ, chậm nhưng chính xác từng component."
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

### 2. Khám phá cấu trúc Figma
- Gọi **`get_metadata(nodeId="0:1", fileKey)`** trên root page
  - Lấy danh sách pages, frames, tên layers + node IDs
- Chọn homepage frame làm frame chính
- Gọi **`get_metadata(nodeId=<homepage>, fileKey)`** trên homepage
  - Xác định các shared components: tìm layers có tên BottomNavigation, Header, Card, Button...
  - Ghi nhận nodeId từng component
- Output: danh sách nodeIds của từng shared component riêng lẻ

### 3. Gen Shared Components + Trích xuất Design Tokens
- Gọi **`create_design_system_rules`** với `clientFrameworks=react`, `clientLanguages=typescript,css`
- Với **mỗi shared component** tìm thấy ở bước 2:
  - Gọi **`get_design_context(nodeId=<component>, fileKey)`** với `artifactType=REUSABLE_COMPONENT`
  - Nhận: reference code + screenshot cho component đó
  - Trích xuất tokens (colors, fonts, spacing) từ reference code
  - Gen React component bám sát Figma, dùng Tailwind classes
- **Ước tính: 3-4 lần gọi `get_design_context`** (BottomNav, Header, NewsCard, QuickAccessButton...)
- Kết hợp tokens → gen theme files:
  - `app/src/theme/colors.ts`, `typography.ts`, `spacing.ts`, `index.ts`
- Kết quả: `app/src/components/shared/` + `app/src/theme/`

### 4. Setup Routing cơ bản
- Tạo `app/src/router.tsx` với React Router (BrowserRouter + Routes rỗng)
- Tạo `app/src/layouts/AppLayout.tsx` — layout wrapper (mobile-first, max-width 430px centered)
- Cập nhật `app/src/main.tsx` với RouterProvider
- Chạy `npx tsc --noEmit` để verify 0 errors

### 5. Cập nhật plan & Báo cáo
- Gọi skill **`write_plan`**
- Báo cáo: project path, tokens, shared components

## Đánh giá
- **MCP calls**: get_metadata x2 + create_design_system_rules x1 + get_design_context x3~4 = **6-7 calls**
- **Ưu điểm**: Code mỗi component chính xác, screenshot riêng từng component
- **Nhược điểm**: Chậm nhất, nhiều calls nhất
