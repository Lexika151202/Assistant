---
description: "Phân rã chức năng hệ thống từ file MD (markdown table) thành bảng chuẩn 3 cấp Module > Feature > Function. AI phân tích, tách/gộp, phân loại lại theo tiêu chí chuẩn. Ví dụ: /decompose_functions docs/input.md"
---

## Tiêu chí phân rã 3 cấp

Luôn bám sát định nghĩa dưới đây khi quyết định dòng nào thuộc level nào:

### Module (Mã: M1, M2, ...)
- **Định nghĩa**: Một phân hệ nghiệp vụ lớn, độc lập về domain
- **Dấu hiệu nhận biết**: Có thể tách thành ứng dụng/menu chính riêng biệt
- **Ví dụ**: "Quản lý đầu tư nước ngoài", "Dashboard & Báo cáo"
- **KHÔNG phải module**: Một nhóm báo cáo cùng loại (đó là Feature)

### Feature (Mã: M1.F1, M1.F2, ...)
- **Định nghĩa**: Một nhóm chức năng hoàn chỉnh phục vụ 1 mục tiêu nghiệp vụ cụ thể
- **Dấu hiệu nhận biết**: Tương đương 1 màn hình chính hoặc 1 user story lớn, chứa nhiều thao tác con
- **Ví dụ**: "Dashboard tổng quan NĐT", "Báo cáo tình hình thực hiện dự án"
- **KHÔNG phải feature**: Một thao tác đơn lẻ như "Lọc", "Xuất PDF" (đó là Function)

### Function (STT tăng dần: 1, 2, 3, ...)
- **Định nghĩa**: Một hành động/thao tác đơn lẻ mà user thực hiện
- **Dấu hiệu nhận biết**: Map được thành 1 nút bấm, 1 form, 1 API call, hoặc 1 UI interaction cụ thể
- **Ví dụ**: "Tạo mới dự án", "Xem chi tiết", "Lọc theo thời gian", "Xuất PDF"
- **KHÔNG phải function**: Cụm gộp "Thêm/Sửa/Xóa" (phải tách thành 3 function riêng)

## Quy tắc phân rã

### Quy tắc tách

1. **Tách function gộp**: Nếu 1 dòng chứa nhiều hành động **độc lập về nghiệp vụ** nối bằng "+", "/", "&", "và", dấu phẩy, hoặc xuống dòng `<br>` → tách thành nhiều function riêng biệt. Ghi note "tách từ: ..." cho mỗi function được tách. **Trước khi tách, phải kiểm tra qua bộ tiêu chí tính độc lập ở mục dưới.**

### Tiêu chí đánh giá tính độc lập của Function

Một function chỉ được coi là **function độc lập** khi đáp ứng ĐỦ CẢ 3 điều kiện sau:

**(a) Khác mục đích nghiệp vụ**: Function phải phục vụ 1 mục tiêu nghiệp vụ riêng biệt, không phải chỉ là 1 bước trong chuỗi thao tác liên tiếp để hoàn thành 1 mục tiêu duy nhất.
- ✅ "Kê đơn thuốc" vs "Chỉ định dịch vụ kỹ thuật" → khác mục đích → 2 function
- ❌ "Lập giấy chuyển tuyến" vs "In giấy chuyển tuyến" vs "Ký số giấy chuyển tuyến" → cùng mục đích "Cấp giấy chuyển tuyến" → 1 function

**(b) Có thể thực hiện độc lập**: User có thể chủ động chọn thực hiện hoặc không thực hiện function đó, tại thời điểm khác nhau, không bắt buộc phải đi liền với function khác.
- ✅ "Kê đơn thuốc mua ngoài" vs "Kê đơn thuốc từ kho" → user chọn 1 trong 2, thời điểm khác nhau → 2 function
- ❌ "Nhập thông tin BN" vs "Nhập thông tin BHYT" → luôn nhập cùng lúc trên cùng 1 form → 1 function

**(c) Tương ứng 1 UI interaction riêng biệt**: Function phải map được thành 1 nút bấm, 1 form, hoặc 1 màn hình riêng — không phải chỉ là 1 field/section trong cùng 1 form.
- ✅ "Xem danh sách chờ khám" → 1 tab/màn hình riêng → 1 function
- ❌ "Nhập chẩn đoán sơ bộ" vs "Nhập chẩn đoán chính" → 2 field trên cùng 1 form khám → không phải 2 function

### Quy tắc gộp (KHÔNG tách)

Áp dụng các quy tắc sau để gộp lại thay vì tách:

**G1. Workflow liền mạch**: Nếu các bước luôn thực hiện tuần tự trên cùng 1 đối tượng và user không có lý do dừng giữa chừng → gộp thành 1 function. Đặt tên theo mục đích cuối cùng. **Ngoại lệ: "In" luôn tách thành function riêng** (xem G7).
- "Lập + Ký số + Đẩy cổng giấy chuyển tuyến" → **"Tạo mới giấy chuyển tuyến"** (note: bao gồm lập, ký số, đẩy cổng BHYT)
- "In giấy chuyển tuyến" → **"In giấy chuyển tuyến"** (function riêng)

**G2. Cùng form/màn hình nhập liệu**: Nếu nhiều thành phần là các section/field trên cùng 1 form → gộp thành 1 function theo tên form đó.
- "Nhập TT BN + người thân + BHYT + đăng ký khám" → **"Nhập thông tin đăng ký khám"** (note: bao gồm thông tin BN, người thân, BHYT)
- "Nhập chẩn đoán sơ bộ + chính + kèm theo + sinh hiệu" → **"Nhập thông tin khám bệnh"** (note: chẩn đoán, sinh hiệu)

**G3. Cùng control UI chỉ khác tham số**: Nếu các thao tác dùng chung 1 ô tìm kiếm/1 bộ lọc chỉ khác giá trị filter → gộp thành 1 function. Tuy nhiên, Tìm kiếm và Lọc vẫn là 2 function riêng biệt (xem bảng action chuẩn).
- "Tìm BN theo ID / SĐT / CCCD / thẻ BHYT" → **"Tìm kiếm bệnh nhân"** (note: theo ID, SĐT, CCCD, thẻ BHYT) — 1 function, không tách thành 4
- "Lọc theo loại nhập / nguồn nhập / ngày tháng" → **"Lọc hóa đơn theo tiêu chí"** (note: loại nhập, nguồn nhập, ngày tháng) — 1 function, không tách thành 3

**G4. Hành động hệ thống tự động**: Nếu 1 bước là hệ thống tự thực hiện (không cần user thao tác) → không tách riêng, gộp vào function trigger nó.
- "Sinh STT chờ khám" → gộp vào "Lưu đăng ký khám" (hệ thống tự sinh sau khi lưu)

**G5. Xử trí/phân loại cùng dropdown**: Nếu các option là lựa chọn trong cùng 1 dropdown/radio → gộp thành 1 function, liệt kê options trong note.
- "Xử trí BN: cho về / vào viện / chuyển viện" → **"Xử trí bệnh nhân"** (note: cho về, vào viện, chuyển viện)

**G6. Nhập liệu + Lưu = Tạo mới**: Nếu các bước mô tả việc nhập dữ liệu vào form rồi lưu/submit trên cùng 1 đối tượng → gộp thành 1 function duy nhất với action "Tạo mới". Việc chỉ nhập liệu hoặc chỉ lưu không có ý nghĩa chức năng độc lập. **Ngoại lệ: "In" luôn tách riêng** (xem G7).
- "Nhập thông tin đăng ký khám" + "Lưu thông tin đăng ký khám" + "Sinh STT" → **"Tạo mới đăng ký khám"** (note: bao gồm nhập TT BN/người thân/BHYT, lưu, sinh STT)
- "In phiếu đăng ký khám" → **"In phiếu đăng ký khám"** (function riêng)
- "Nhập thông tin chuyển viện" + "Ký số" + "Đẩy cổng" → **"Tạo mới giấy chuyển tuyến"** (note: bao gồm nhập, ký số, đẩy cổng BHYT)
- "In giấy chuyển tuyến" → **"In giấy chuyển tuyến"** (function riêng)

**G7. In luôn là function riêng**: Bất kể "In" xuất hiện trong workflow nào (Tạo mới, Kết thúc khám, Cấp giấy...), luôn tách thành 1 function độc lập. Lý do: In là 1 thao tác UI riêng biệt (nút In, preview, chọn máy in), cần thiết kế riêng, và user có thể chọn in hoặc không in.
- "In phiếu đăng ký khám", "In đơn thuốc", "In bảng kê chi phí", "In giấy chuyển tuyến" → mỗi cái là 1 function riêng
- "In lại phiếu X" → cũng là function riêng (action = **In**)

### Chuẩn hóa tên action

Khi đặt tên function, **BẮT BUỘC** dùng bảng action chuẩn dưới đây thay cho các mô tả gốc. Mục đích: thống nhất cách gọi, dễ phân loại function, tránh nhiễu do sub-step.

| Action chuẩn | Mô tả gốc thường gặp (mapping) | Ý nghĩa |
|---|---|---|
| **Xem** | Hiển thị, Load, View, Danh sách (khi chỉ hiển thị dữ liệu tĩnh) | Hiển thị dữ liệu/màn hình, không có thao tác tìm kiếm hay lọc chủ động |
| **Tìm kiếm** | Tìm kiếm, Tra cứu, Search, Lookup | User nhập keyword/tiêu chí để tìm bản ghi cụ thể. Là function riêng vì cần thiết kế UI ô tìm kiếm, logic matching |
| **Lọc** | Lọc, Filter, Bộ lọc, Lọc theo tiêu chí | User chọn điều kiện (dropdown, date range, checkbox) để thu hẹp danh sách. Là function riêng vì cần thiết kế UI bộ lọc, logic filter |
| **Tạo mới** | Nhập + Lưu, Lập, Tạo, Thêm mới, Đăng ký, Cấp (giấy/phiếu) | Tạo 1 bản ghi/đối tượng mới (bao gồm cả nhập liệu, lưu, và các bước tự động sau lưu như sinh mã, in, ký số, đẩy cổng) |
| **Chỉnh sửa** | Sửa, Cập nhật, Chỉnh sửa, Edit | Thay đổi thông tin đã có |
| **Xóa** | Xóa, Hủy (bản ghi), Xóa đăng ký | Xóa bản ghi khỏi hệ thống |
| **Duyệt** | Duyệt, Phê duyệt, Approve | Xác nhận/phê duyệt 1 yêu cầu |
| **In** | In, In lại, In phiếu, In đơn, In giấy, In bảng kê, In biên bản | In tài liệu/phiếu/đơn. **Luôn là function riêng** — kể cả khi nằm trong workflow Tạo mới (xem G7) |
| **Xuất** | Xuất PDF, Xuất Excel, Export | Xuất dữ liệu ra file |
| **Cấu hình** | Cài đặt, Thiết lập, Config, Mapping, Ánh xạ | Thiết lập tham số hệ thống |
| **Kết nối** | Kết nối, Tích hợp, Liên thông, Đẩy cổng (khi là action chính, không phải sub-step) | Tích hợp với hệ thống bên ngoài |
| **Thực hiện** | Phát thuốc, Thu tiền, Chuyển PK, Xử trí, Gọi loa | Thao tác nghiệp vụ đặc thù không thuộc CRUD |

**Quy tắc phân biệt Xem / Tìm kiếm / Lọc:**
- Nếu màn hình chỉ hiển thị danh sách/chi tiết mà user không cần nhập gì → **Xem**
- Nếu user nhập keyword vào ô search để tìm → **Tìm kiếm** (function riêng)
- Nếu user chọn điều kiện từ dropdown/date picker/checkbox để thu hẹp danh sách → **Lọc** (function riêng)
- Một Feature có thể có cả 3: "Xem danh sách X" + "Tìm kiếm X" + "Lọc X theo tiêu chí" — đây là 3 function riêng biệt vì mỗi cái cần thiết kế UI và logic riêng

**Quy tắc áp dụng:**
- Luôn đặt action chuẩn ở đầu tên function: "**Tạo mới** đăng ký khám", "**Xem** danh sách chờ khám"
- Nếu mô tả gốc là "Lập + In + Ký số + Đẩy cổng giấy X" → action = **Tạo mới** (vì đó là workflow tạo ra 1 đối tượng mới)
- Nếu mô tả gốc là "In lại phiếu X" → action = **In** (vì đối tượng đã tồn tại, chỉ in lại)
- Nếu mô tả gốc chỉ có "Nhập thông tin X" mà không rõ có Lưu không → vẫn coi là **Tạo mới** (nhập mà không lưu thì vô nghĩa)

### Quy tắc khác

2. **Loại bỏ dòng trống**: Bỏ qua dòng chỉ có STT mà không có nội dung
3. **Chuẩn hóa tên**: Đặt tên function theo format: **[Action chuẩn] + [Đối tượng]**. Viết ngắn gọn, rõ ràng, bỏ ký tự thừa
4. **Phát hiện trùng lặp**: Nếu nhiều Feature có cùng bộ function giống nhau (vd: Lập + Gửi + Sửa + Xem + Duyệt + In), ghi note "pattern lặp: CRUD+Approve" để user nhận biết
5. **Đánh STT liên tục**: Function được đánh STT tăng dần từ 1, không ngắt quãng, xuyên suốt toàn bộ bảng
6. **Sửa STT gốc lỗi**: File input có thể có STT trùng, thiếu, hoặc không liên tục → bỏ qua STT gốc, đánh lại từ đầu
7. **Sử dụng Mô tả nghiệp vụ**: Nếu file input có cột "Mô tả nghiệp vụ" (hoặc tương đương như "Mô tả", "Description", "Chi tiết"), dùng nội dung cột này để:
   - Hiểu chính xác hơn scope của function → quyết định tách/gộp chính xác hơn
   - Phân loại đúng level (Module/Feature/Function) khi tên cột gốc mơ hồ
   - Trích xuất thông tin nghiệp vụ quan trọng ghi vào cột Note (vd: "cần duyệt 2 cấp", "tự động gửi email thông báo")
   - Nhận diện function ẩn chưa được liệt kê trong tên nhưng mô tả đề cập (vd: tên ghi "Duyệt" nhưng mô tả đề cập cả "gửi thông báo sau duyệt" → tách thêm function "Gửi thông báo")

## Format output

File: `docs/functional_decomposition.md`

```markdown
# Phân rã chức năng - <Tên hệ thống>

> Nguồn: <tên file input>
> Phân rã bởi AI theo tiêu chí 3 cấp: Module > Feature > Function

| STT | Module | Feature | Function | Note |
|-----|--------|---------|----------|------|
| 1 | **M1.** <Tên module> | **M1.F1.** <Tên feature> | <Tên function> | |
| 2 | | | <Function tiếp theo> | |
| 3 | | **M1.F2.** <Tên feature> | <Tên function> | |
| 4 | **M2.** <Tên module> | **M2.F1.** <Tên feature> | <Tên function> | |
```

Quy tắc format:
- Module chỉ ghi ở dòng function đầu tiên của module, các dòng sau để trống
- Feature chỉ ghi ở dòng function đầu tiên của feature, các dòng sau để trống
- Mỗi dòng đều có STT (chỉ function mới có STT)
- Cột Note: ghi mô tả bằng ngôn ngữ tự nhiên — lý do tách/gộp, pattern lặp, thông tin nghiệp vụ. KHÔNG dùng mã nội bộ (G1-G7, NV) trong note

## Steps

### 1. Đọc file input

- Đọc file input từ đường dẫn user cung cấp: $ARGUMENTS
- Nếu không có argument → hỏi user đường dẫn file
- Format: `.md` (markdown table)
- Xác định tên hệ thống từ nội dung file hoặc tên file

### 2. Phân tích & phân rã

**Bước 2a — Nhận diện cấu trúc gốc:**
- Xác định cột nào tương ứng Module / Feature (nhóm chức năng) / Function (chức năng)
- Xác định cột Mô tả nghiệp vụ nếu có (các tên phổ biến: "Mô tả nghiệp vụ", "Mô tả", "Description", "Chi tiết", "Nội dung")
- Nhận diện các dòng trống, STT lỗi, dòng gộp

**Bước 2b — Phân rã theo tiêu chí:**
- Áp dụng tiêu chí 3 cấp ở trên để phân loại mỗi dòng
- Dùng mô tả nghiệp vụ (nếu có) làm context bổ sung khi quyết định phân loại và tách/gộp
- Tách các function gộp (kể cả function ẩn phát hiện từ mô tả nghiệp vụ)
- Loại bỏ dòng trống
- Đánh STT mới liên tục

**Bước 2c — Phát hiện pattern:**
- Nhận diện các Feature có bộ function giống nhau
- Ghi vào cột Note
- Ghi thông tin nghiệp vụ quan trọng từ cột mô tả vào Note (prefix "NV:")

### 3. Ghi file output

- Ghi ra `docs/functional_decomposition.md` theo format ở trên
- Nếu file đã tồn tại → ghi đè
- Encoding UTF-8

### 4. Báo cáo (max 5 dòng)

- Tổng: N modules, M features, K functions
- Đã tách: X function từ dòng gộp
- Đã loại: Y dòng trống
- Pattern lặp: liệt kê nếu có
- File: `docs/functional_decomposition.md`
