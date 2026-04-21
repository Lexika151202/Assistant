---
name: parse_feature_input
description: "Phân rã chức năng hệ thống từ nhiều nguồn input (xlsx, doc, md, image, text). Output là cây phân rã feature có đánh số thứ tự theo format chuẩn."
disable-model-invocation: true
argument-hint: <đường dẫn file xlsx/doc/md/image HOẶC mô tả tính năng>
---

# Skill: Parse Feature Input

## Input: $ARGUMENTS

## Mục tiêu
Đọc input → trả về **cây phân rã chức năng** (feature tree) đánh số thứ tự. Không ghi file.

## Bước 1 — Xác định loại input

| Loại | Nhận biết | Hành động |
|------|-----------|-----------|
| Markdown | `.md` | → **FAST-PATH** (Bước 2A) |
| XLSX/XLS | `.xlsx`, `.xls` | → Bước 2B |
| DOC/DOCX | `.doc`, `.docx` | → Bước 2B |
| Image | `.png`, `.jpg`, `.jpeg`, `.webp` | → Bước 2B |
| Text | Không phải file path | → Bước 2C |

---

## Bước 2A — FAST-PATH: Markdown (ưu tiên tốc độ)

File markdown đã có cấu trúc tree → chỉ cần **normalize**, KHÔNG phân tích ngữ nghĩa.

1. Đọc file bằng Read tool
2. Nhận diện cấu trúc hiện có:
   - `## N. TÊN` → Module (cấp 1)
   - `├── N.N Tên` → Nhóm (cấp 2)  
   - `│   ├── N Tên` → Chi tiết (cấp 3) — số flat cần re-number
3. **Re-number** theo format: `cấp1.cấp2.cấp3[.cấp4]`
   - Giữ nguyên số module gốc (1, 2, 3...)
   - Giữ nguyên số nhóm gốc (1.1, 1.2, 2.1...)
   - Chỉ re-number cấp 3+: số flat `1, 2, 3...` → `2.1.1, 2.1.2, 2.1.3...`
4. **Normalize format**: đảm bảo tree characters (`├──`, `└──`, `│`) đúng quy tắc
5. Output ngay — KHÔNG giải thích quá trình

**Quy tắc re-number cấp 3:**
- Đếm thứ tự trong nhóm cha: item đầu = `.1`, item tiếp = `.2`, ...
- Ví dụ: dưới `2.1` có `1, 2, 3, 4, 5` → thành `2.1.1, 2.1.2, 2.1.3, 2.1.4, 2.1.5`

---

## Bước 2B — Xử lý file binary (xlsx / doc / image)

1. Đọc file bằng tool phù hợp
2. Trích xuất danh sách features theo cấp bậc
3. Đánh số thứ tự theo format chuẩn
4. Output feature tree

---

## Bước 2C — Mô tả text (đề xuất usecase)

1. Xác định domain, đối tượng sử dụng, platform
2. Đề xuất modules → nhóm → chức năng chi tiết
3. **Hỏi xác nhận** trước khi output chính thức

---

## Format output

Tham khảo: `.claude/skills/parse_feature_input/references/feature_list_template.md`

**Quy tắc:**
- Cấp 1 (Module): `N.` + VIẾT HOA — dùng `## ` heading
- Cấp 2 (Nhóm): `N.N` + Viết hoa đầu câu — dùng `├──`/`└──`
- Cấp 3+ (Chi tiết): `N.N.N[.N]` + Viết hoa đầu câu — dùng `│   ├──`/`│   └──`
- Item cuối cùng trong nhóm dùng `└──`, còn lại dùng `├──`

## Lưu ý
- **Không bỏ bớt** nội dung từ input
- **Giữ nguyên ngôn ngữ** gốc
- **Xử lý trùng lặp**: phát hiện → gom lại
- Output là feature tree thuần túy, KHÔNG kèm giải thích
