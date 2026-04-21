---
description: "Phân rã chức năng hệ thống từ nhiều nguồn input. Hỗ trợ file xlsx/doc/image hoặc mô tả text. Output là cây phân rã feature có đánh số thứ tự. Ví dụ: /init_feature_list path/to/file.xlsx hoặc /init_feature_list Hệ thống quản lý kho hàng"
---

## Steps

### 1. Parse input & tạo feature tree

**Fast-path (file `.md`):**
- Chạy `python tools/parse_md_to_list.py --input <path> --output docs/feature_list.md`
- Nếu cần đặt tên hệ thống: thêm `--name "Tên hệ thống"`
- Nếu script thành công (exit code 0) → **nhảy thẳng bước 3**, bỏ qua bước 2
- Nếu script lỗi → fallback sang phương án AI bên dưới

**Fallback (không phải `.md` hoặc script lỗi):**
- Gọi skill **`parse_feature_input`** với [InputSource]
- Skill tự xác định loại input và chọn fast-path phù hợp
- Nếu input là text mô tả → skill sẽ đề xuất usecases và hỏi user confirm
- Kết quả: feature tree đã format (chưa ghi file)
- **QUAN TRỌNG**: Không giải thích quá trình, output feature tree trực tiếp

### 2. Tạo file output
- Đường dẫn: `docs/feature_list.md`
- Nếu file đã tồn tại → ghi đè (không hỏi)
- Tạo file markdown với header `# Phân rã chức năng - <Tên hệ thống>` kèm metadata (nguồn, ngày tạo)
- Encoding UTF-8

### 3. Báo cáo ngắn gọn (3 dòng max)
- Tổng: N modules, M nhóm, K chức năng chi tiết
- File: `docs/feature_list.md`
- Gợi ý: xem lại và chỉnh sửa nếu cần
