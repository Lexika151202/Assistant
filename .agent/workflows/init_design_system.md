---
description: "Phase 0 - Khởi tạo dự án React Web (Vite + Tailwind) chạy được trên local, kết nối Figma MCP, trích xuất design system THỰC TẾ và gen shared components. Dùng khi bắt đầu dự án lần đầu."
---

## Steps

### 1. Khởi tạo project Vite + React
- Kiểm tra nếu chưa có `app/package.json` → khởi tạo: `npm create vite@latest app -- --template react-ts`
- Cài dependencies: `cd app && npm install react-router-dom tailwindcss @tailwindcss/vite`
- Setup Tailwind: thêm plugin `@tailwindcss/vite` vào `vite.config.ts`, thêm `@import "tailwindcss"` vào `app/src/index.css`
- Tạo cấu trúc thư mục: `src/pages/`, `src/components/shared/`, `src/theme/`, `src/hooks/`, `src/services/`, `src/types/`, `src/layouts/`

### 2. Khám phá cấu trúc Figma
- Gọi MCP tool **`get_metadata`** (không truyền nodeId → lấy structure từ selection/active page)
  - Lấy danh sách tất cả pages, frames, components
  - Ghi nhận node IDs quan trọng
- Nếu designer đã select sẵn group → gọi **`get_metadata`** trên selection đó
- Output bước này: danh sách nodeIds cho design system frames + shared component frames

### 3. Trích xuất Design Tokens THỰC TẾ từ Figma
- Gọi MCP tool **`get_variable_defs`** trên nodeId phù hợp
  - Params: `clientFrameworks=react`, `clientLanguages=typescript,css`
  - Nhận: tất cả design variables (colors, spacing, typography...) từ file Figma
- Gọi MCP tool **`create_design_system_rules`**
  - Params: `clientFrameworks=react`, `clientLanguages=typescript,css`
  - Nhận: quy tắc design system chuẩn
- Gọi MCP tool **`get_design_context`** trên 2-3 frames đại diện (nếu `get_variable_defs` trả về ít tokens)
  - Trích xuất thêm colors/fonts từ reference code
- **Kết hợp tất cả** → gen files:
  - `app/src/theme/colors.ts` — bảng màu
  - `app/src/theme/typography.ts` — font config
  - `app/src/theme/spacing.ts` — spacing scale
  - `app/src/theme/index.ts` — re-export
  - `app/tailwind.config.ts` — extend Tailwind với tokens từ Figma (nếu cần custom beyond Tailwind defaults)

### 4. Gen Shared Components từ Figma thật
- Dùng `get_metadata` để tìm shared components trong Figma (Button, Input, Card, Header...)
- Với mỗi component tìm thấy:
  - Gọi MCP tool **`get_design_context(nodeId)`** với `artifactType=REUSABLE_COMPONENT`
  - Nhận: reference code + screenshot + metadata
  - Gen React component bám sát Figma, dùng Tailwind classes + theme tokens
- Kết quả: files trong `app/src/components/shared/` bám sát 100% thiết kế

### 5. Setup Routing cơ bản
- Tạo `app/src/router.tsx` với React Router (BrowserRouter + Routes rỗng)
- Tạo `app/src/layouts/AppLayout.tsx` — layout wrapper cơ bản (mobile-first, max-width 430px centered)
- Cập nhật `app/src/main.tsx` với RouterProvider
- Chạy `npx tsc --noEmit` để verify 0 errors

### 6. Cập nhật plan & Báo cáo

- Gọi skill **`write_plan`**:
  - Nếu file `figma-to-code-plan.yaml` chưa tồn tại → gọi `write-plan init-project` trước
  - Gọi `write-plan init-phase0` với `components_generated: [Button, Card, Badge, ...]`
- Báo cáo:
  - Project path: `cd app && npm run dev`
  - Design tokens đã trích xuất (liệt kê nguồn: Figma variable vs reference code)
  - Shared components đã gen
  - Tokens nào dùng giá trị mặc định (không tìm thấy trong Figma)
