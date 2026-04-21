---
name: gen-screen
description: "Gen code React Web (.tsx) chạy được cho 1 page từ design context (Figma MCP hoặc specs). Code phải bám sát 100% thiết kế về layout, colors, typography, content. Dùng Tailwind CSS."
disable-model-invocation: true
argument-hint: <tên page/component>
---

# Skill: Gen React Web Page

## Input: $ARGUMENTS (tên page/component)

## Mục tiêu
Sinh ra file React (.tsx) chạy được, **bám sát 100% thiết kế** — không bịa layout, không bịa màu sắc, không bịa nội dung text. Dùng Tailwind CSS cho styling.

## Yêu cầu trước khi gọi

**Nếu spec_source: figma:**
- Design context đã có sẵn từ MCP tool `get_design_context(nodeId)` — bao gồm:
  - Reference code (layout structure, colors, typography)
  - Screenshot (hình ảnh trực quan)
  - Metadata (kích thước, spacing, node tree)

**Nếu spec_source: specs:**
- `spec_description` đã có từ plan YAML
- Design tokens đã đọc từ `app/src/theme/`
- Ảnh tham chiếu (nếu có) từ `spec_files`

**Cả 2:**
- Project đã khởi tạo tại `app/`
- Theme đã setup trong `app/src/theme/`

## Quy tắc gen code

### Nguyên tắc vàng
1. **Layout** → copy chính xác từ reference code / spec_description, dùng Tailwind classes
2. **Colors** → dùng chính xác mã màu từ design, map sang Tailwind custom colors hoặc inline
3. **Typography** → chính xác font size, font weight, line height
4. **Content** → chính xác text content (tiếng Việt, tiêu đề, label...)
5. **Component tree** → chính xác số lượng và thứ tự các element

### Xử lý xung đột Theme vs Design
- Nếu theme đã define `primary: '#1B3B6F'` nhưng design dùng `#2D5BFF`:
  → **Ưu tiên design**, cập nhật theme HOẶC dùng inline style + comment
- Nếu theme thiếu token mà design cần:
  → Dùng Tailwind arbitrary values `[#hex]` + thêm comment `// TODO: Add to theme`

### Cấu trúc file page
```typescript
// Feature: [Feature ID] - [Feature Name]
// Page: [Page Name]
// Figma Node: [nodeId]      (nếu spec_source: figma)

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PageName() {
  const navigate = useNavigate();
  // ... code bám sát design context
  return (
    <div className="min-h-screen bg-white">
      {/* JSX structure CHÍNH XÁC theo design */}
    </div>
  );
}
```

### Quy tắc bắt buộc
1. **Export default function**
2. **Figma node ID** trong header comment (nếu spec_source: figma)
3. **Reference code** từ `get_design_context` → chuyển sang React + Tailwind
4. **Text content** từ design — KHÔNG dịch, KHÔNG thay đổi nội dung
5. **Mock data** — dữ liệu mẫu lấy từ text có sẵn trong design
6. **React Router** — useNavigate, useParams cho navigation
7. **Mobile-first layout** — max-w-[430px] mx-auto cho mobile viewport

### Quy trình chuyển đổi Reference Code → React + Tailwind
1. CSS classes → Tailwind utility classes
2. `display: flex` → `flex`
3. `gap: 8px` → `gap-2`
4. `padding: 16px` → `p-4`
5. `color: #xxx` → `text-[#xxx]` hoặc custom color class
6. `font-size: 14px` → `text-sm`
7. `border-radius: 8px` → `rounded-lg`
8. `box-shadow` → `shadow-md` hoặc custom shadow
9. Icons → dùng inline SVG hoặc lucide-react

## Output
- File `.tsx` chạy được, bám sát design
- Trả về: đường dẫn file, route path, params cần thêm vào router
- Liệt kê những chỗ khác biệt so với design (nếu không thể chuyển đổi 1:1)

## Gen từ specs (không có Figma reference code)
1. Đọc `spec_description` → xây dựng component tree
2. Dùng design tokens từ `app/src/theme/` (colors, typography, spacing)
3. Nội dung suy luận từ specs → thêm comment `// INFERRED from specs — verify with designer`

## Giới hạn
- Mỗi lần gọi chỉ gen 1 file
- KHÔNG tự sáng tạo UI — chỉ chuyển đổi từ design context
- KHÔNG cập nhật YAML plan hoặc router
