---
description: "Variant C — Smart-scan: quét metadata nhiều frames để tìm shared components lặp lại, rồi gọi get_design_context trên parent frame chứa nhiều nhất. Cân bằng tốc độ + độ chính xác."
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

### 2. Khám phá cấu trúc Figma + Phân tích shared components
- Gọi **`get_metadata(nodeId="0:1", fileKey)`** trên root page
  - Lấy danh sách tất cả pages + top-level frames + node IDs
- Chọn **5-8 frames đại diện** từ các nhóm chức năng khác nhau (homepage, list, detail, form, settings...)
- Gọi **`get_metadata(nodeId=<frame>, fileKey)`** trên từng frame đã chọn
  - Thu thập tên layers con của mỗi frame
- **Phân tích tần suất lặp lại**:
  - Đếm tên layer xuất hiện ở 2+ frames → đánh dấu là shared component
  - Ví dụ: "BottomNavigation" ở 5/8 frames, "Header" ở 7/8 frames → chắc chắn shared
  - "SearchBar" ở 1/8 frames → chưa phải shared, bỏ qua
- Xác định **frame nào chứa nhiều shared components nhất** → dùng cho bước 3
- Output:
  - Danh sách shared components (tên + tần suất)
  - nodeId của frame tối ưu nhất để gọi get_design_context

### 3. Gen Shared Components + Trích xuất Design Tokens
- Gọi **`create_design_system_rules`** với `clientFrameworks=react`, `clientLanguages=typescript,css`
- Gọi **`get_design_context(nodeId=<best_frame>, fileKey)`** trên frame chứa nhiều shared nhất
  - Nhận: reference code chứa phần lớn shared components
  - Tách từng component, trích tokens
- **Nếu còn shared components chưa cover** (ví dụ SearchBar chỉ có ở màn list):
  - Gọi thêm **`get_design_context`** trên frame chứa component thiếu
  - Chỉ gọi thêm khi thực sự cần, không gọi thừa
- Gen theme files:
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
- **Ghi rõ**: component nào tìm thấy ở bao nhiêu frames, component nào chỉ gọi thêm

## Đánh giá
- **MCP calls**: get_metadata x6~9 + create_design_system_rules x1 + get_design_context x1~2 = **8-12 calls**
- **Nhưng** get_metadata rất nhẹ (chỉ trả tên + nodeId, không render code) → nhanh
- **Ưu điểm**: Phát hiện shared components chính xác nhất, không bỏ sót, biết rõ component nào dùng lại nhiều
- **Nhược điểm**: Nhiều calls get_metadata nhất (nhưng mỗi call nhẹ), logic phân tích phức tạp hơn
