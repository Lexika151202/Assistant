---
description: "Phase 0 - Khởi tạo dự án React Web (Vite + Tailwind), trích xuất design tokens + gen shared components từ Figma. Yêu cầu: URL Figma."
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
- Gọi MCP tool **`get_metadata(nodeId="0:1", fileKey=<extracted>)`** trên root page
  - Lấy danh sách tất cả pages, frames, tên layers + node IDs
- Từ kết quả, **chọn lọc 2-3 frames đại diện** (homepage, 1 màn list, 1 màn form) để dùng ở bước 3
- Output bước này: danh sách nodeIds đại diện + nodeIds cho shared components (BottomNav, Header...)

### 3. Gen Shared Components + Trích xuất Design Tokens
- Gọi **`create_design_system_rules`** với `clientFrameworks=react`, `clientLanguages=typescript,css`
  - Nhận: quy tắc design system chuẩn → áp dụng khi gen components
- Với mỗi shared component tìm thấy ở bước 2 (BottomNavigation, Header, Card...):
  - Gọi **`get_design_context(nodeId, fileKey)`** với `artifactType=REUSABLE_COMPONENT`
  - Nhận: reference code + screenshot
  - **Đồng thời trích xuất tokens** từ reference code: colors, fonts, spacing, border-radius
  - Gen React component bám sát Figma, dùng Tailwind classes
- Nếu cần bổ sung tokens → gọi thêm `get_design_context` trên 1-2 frames đại diện
- **Kết hợp tất cả tokens** → gen files:
  - `app/src/theme/colors.ts` — bảng màu
  - `app/src/theme/typography.ts` — font config
  - `app/src/theme/spacing.ts` — spacing scale
  - `app/src/theme/index.ts` — re-export
- Kết quả: files trong `app/src/components/shared/` + `app/src/theme/`

### 4. Setup Routing cơ bản
- Tạo `app/src/router.tsx` với React Router (BrowserRouter + Routes rỗng)
- Tạo `app/src/layouts/AppLayout.tsx` — layout wrapper cơ bản (mobile-first, max-width 430px centered)
- Cập nhật `app/src/main.tsx` với RouterProvider
- Chạy `npx tsc --noEmit` để verify 0 errors

### 5. Cập nhật plan & Báo cáo
- Gọi skill **`write_plan`**:
  - Nếu file `figma-to-code-plan.yaml` chưa tồn tại → gọi `write-plan init-project` trước
  - Gọi `write-plan init-phase0` với `components_generated: [...]`
- Báo cáo:
  - Project path: `cd app && npm run dev`
  - Design tokens đã trích xuất
  - Shared components đã gen
