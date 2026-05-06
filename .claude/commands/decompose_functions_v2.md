---
description: "Phân rã chức năng hệ thống từ file MD (markdown table) thành bảng chuẩn 3 cấp Module > Feature > Function. AI phân tích, tách/gộp, phân loại lại theo tiêu chí chuẩn. Ví dụ: /decompose_functions_v2 docs/input.md"
---

## Tiêu chí phân rã 3 cấp

Luôn bám sát định nghĩa dưới đây khi quyết định dòng nào thuộc level nào:

### Module (Mã: M1, M2, ...)
- **Định nghĩa**: Một phân hệ nghiệp vụ lớn, độc lập về domain
- **Dấu hiệu nhận biết**: Có thể tách thành ứng dụng/menu chính riêng biệt
- **Ví dụ**: "Quản lý nhân sự", "Quản lý kho", "Dashboard & Báo cáo", "Quản lý bán hàng"
- **KHÔNG phải module**: Một nhóm báo cáo cùng loại (đó là Feature), một nhóm cài đặt (đó là Feature)

### Feature (Mã: M1.F1, M1.F2, ...)
- **Định nghĩa**: Một nhóm chức năng hoàn chỉnh phục vụ 1 mục tiêu nghiệp vụ cụ thể
- **Dấu hiệu nhận biết**: Tương đương 1 màn hình chính hoặc 1 user story lớn, chứa nhiều thao tác con
- **Ví dụ**: "Quản lý đơn hàng", "Báo cáo doanh thu", "Cấu hình quyền truy cập"
- **KHÔNG phải feature**: Một thao tác đơn lẻ như "Lọc", "Xuất PDF", "Xóa" (đó là Function)

### Function (STT tăng dần: 1, 2, 3, ...)
- **Định nghĩa**: Một hành động/thao tác đơn lẻ mà user thực hiện
- **Dấu hiệu nhận biết**: Map được thành 1 nút bấm, 1 form, 1 API call, hoặc 1 UI interaction cụ thể
- **Ví dụ**: "Tạo mới đơn hàng", "Xem chi tiết", "Lọc theo thời gian", "In hóa đơn"
- **KHÔNG phải function**: Cụm gộp "Thêm/Sửa/Xóa" (phải tách thành 3 function riêng)

## Nhận diện phong cách viết input

Trước khi phân rã, nhận diện phong cách viết của input để áp dụng rule phù hợp. Các pattern phổ biến:

### P1. Viết gộp bằng ký hiệu nối
Dùng "+", "/", "&", "và", dấu phẩy, `<br>`, dấu chấm phẩy, hoặc xuống dòng để nối nhiều hành động.
- Ví dụ: "Thêm/Sửa/Xóa nhân viên", "Tạo + duyệt + gửi đơn hàng", "Nhập thông tin, lưu, in phiếu"
- **Xử lý**: Tách từng hành động, kiểm tra tính độc lập trước khi quyết định tách hay gộp

### P2. Viết gộp bằng cụm CRUD
Dùng các cụm viết tắt hoặc gộp chung các thao tác CRUD.
- Ví dụ: "CRUD quản lý user", "Quản lý danh mục (thêm, sửa, xóa)", "Quản lý thông tin nhân viên"
- **Xử lý**: Tách thành các function riêng: Xem danh sách + Tìm kiếm + Tạo mới + Chỉnh sửa + Xóa (tùy context)

### P3. Viết mô tả dài, chứa nhiều function ẩn
Dùng câu văn dài mô tả flow, bên trong chứa nhiều hành động.
- Ví dụ: "Cho phép người dùng tạo đơn hàng mới, chọn sản phẩm từ kho, áp dụng mã giảm giá, xác nhận và thanh toán"
- **Xử lý**: Phân tích câu, tách từng hành động có mục đích nghiệp vụ riêng

### P4. Viết sub-step chi tiết
Liệt kê từng bước nhỏ trong 1 quy trình như thể mỗi bước là 1 function.
- Ví dụ: "Nhập tên khách hàng", "Nhập số điện thoại", "Nhập địa chỉ", "Nhấn nút Lưu"
- **Xử lý**: Gộp các sub-step thành 1 function theo mục đích nghiệp vụ (G2, G6)

### P5. Viết chung chung, thiếu chi tiết
Chỉ ghi tên chức năng ngắn gọn, không rõ scope.
- Ví dụ: "Quản lý đơn hàng", "Báo cáo", "Cài đặt hệ thống"
- **Xử lý**: Dùng cột mô tả nghiệp vụ (nếu có) để suy ra các function con. Nếu không có mô tả → giữ nguyên 1 function, ghi note "cần làm rõ scope"

### P6. Viết workflow tuần tự
Liệt kê các bước tuần tự của 1 quy trình: nhập → duyệt → ký → in → gửi.
- Ví dụ: "Lập phiếu → Trình duyệt → Phê duyệt → In phiếu → Gửi email thông báo"
- **Xử lý**: Áp dụng G1 (gộp workflow liền mạch) + G7 (In tách riêng). Chỉ giữ các bước mà user chủ động thực hiện tại thời điểm khác nhau

## Quy tắc phân rã

### Quy tắc tách

1. **Tách function gộp**: Nếu 1 dòng chứa nhiều hành động **độc lập về nghiệp vụ** (nhận diện qua pattern P1-P6 ở trên) → tách thành nhiều function riêng biệt. Ghi note "tách từ: ..." cho mỗi function được tách. **Trước khi tách, phải kiểm tra qua bộ tiêu chí tính độc lập ở mục dưới.**

### Tiêu chí đánh giá tính độc lập của Function

Một function chỉ được coi là **function độc lập** khi đáp ứng ĐỦ CẢ 3 điều kiện sau:

**(a) Khác mục đích nghiệp vụ**: Function phải phục vụ 1 mục tiêu nghiệp vụ riêng biệt, không phải chỉ là 1 bước trong chuỗi thao tác liên tiếp để hoàn thành 1 mục tiêu duy nhất.
- ✅ "Tạo đơn hàng" vs "Duyệt đơn hàng" → khác mục đích, khác người thực hiện → 2 function
- ❌ "Nhập thông tin đơn hàng" vs "Lưu đơn hàng" → cùng mục đích "Tạo mới đơn hàng" → 1 function

**(b) Có thể thực hiện độc lập**: User có thể chủ động chọn thực hiện hoặc không thực hiện function đó, tại thời điểm khác nhau, không bắt buộc phải đi liền với function khác.
- ✅ "Xuất báo cáo PDF" vs "Xuất báo cáo Excel" → user chọn 1 trong 2, thời điểm khác nhau → 2 function
- ❌ "Nhập tên khách hàng" vs "Nhập số điện thoại" → luôn nhập cùng lúc trên cùng 1 form → 1 function

**(c) Tương ứng 1 UI interaction riêng biệt**: Function phải map được thành 1 nút bấm, 1 form, hoặc 1 màn hình riêng — không phải chỉ là 1 field/section trong cùng 1 form.
- ✅ "Xem danh sách đơn hàng" → 1 tab/màn hình riêng → 1 function
- ❌ "Nhập mã sản phẩm" vs "Nhập số lượng" → 2 field trên cùng 1 form → không phải 2 function

### Quy tắc gộp (KHÔNG tách)

Áp dụng các quy tắc sau để gộp lại thay vì tách:

**G1. Workflow liền mạch**: Nếu các bước luôn thực hiện tuần tự trên cùng 1 đối tượng và user không có lý do dừng giữa chừng → gộp thành 1 function. Đặt tên theo mục đích cuối cùng. **Ngoại lệ: "In" luôn tách thành function riêng** (xem G7).
- "Lập phiếu + Ký số + Gửi duyệt" → **"Tạo mới phiếu [X]"** (note: bao gồm lập, ký số, gửi duyệt)
- "Nhập đơn hàng + Tính tổng + Xác nhận" → **"Tạo mới đơn hàng"** (note: bao gồm nhập, tính tổng, xác nhận)

**G2. Cùng form/màn hình nhập liệu**: Nếu nhiều thành phần là các section/field trên cùng 1 form → gộp thành 1 function theo tên form đó.
- "Nhập thông tin cá nhân + địa chỉ + liên hệ" → **"Tạo mới hồ sơ nhân viên"** (note: bao gồm thông tin cá nhân, địa chỉ, liên hệ)

**G3. Cùng control UI chỉ khác tham số**: Nếu các thao tác dùng chung 1 ô tìm kiếm/1 bộ lọc chỉ khác giá trị filter → gộp thành 1 function. Tuy nhiên, Tìm kiếm và Lọc vẫn là 2 function riêng biệt (xem bảng action chuẩn).
- "Tìm theo tên / mã / email / SĐT" → **"Tìm kiếm [đối tượng]"** (note: theo tên, mã, email, SĐT) — 1 function, không tách thành 4
- "Lọc theo trạng thái / ngày tạo / phòng ban" → **"Lọc [đối tượng] theo tiêu chí"** (note: trạng thái, ngày tạo, phòng ban) — 1 function, không tách thành 3

**G4. Hành động hệ thống tự động**: Nếu 1 bước là hệ thống tự thực hiện (không cần user thao tác) → không tách riêng, gộp vào function trigger nó.
- "Sinh mã đơn hàng" → gộp vào "Tạo mới đơn hàng" (hệ thống tự sinh sau khi lưu)
- "Gửi email xác nhận tự động" → gộp vào function trigger (nếu tự động), hoặc tách riêng (nếu user bấm nút gửi)

**G5. Phân loại/xử trí cùng dropdown**: Nếu các option là lựa chọn trong cùng 1 dropdown/radio → gộp thành 1 function, liệt kê options trong note.
- "Chuyển trạng thái: chờ xử lý / đang xử lý / hoàn thành / hủy" → **"Thực hiện chuyển trạng thái [đối tượng]"** (note: chờ xử lý, đang xử lý, hoàn thành, hủy)

**G6. Nhập liệu + Lưu = Tạo mới**: Nếu các bước mô tả việc nhập dữ liệu vào form rồi lưu/submit trên cùng 1 đối tượng → gộp thành 1 function duy nhất với action "Tạo mới". Việc chỉ nhập liệu hoặc chỉ lưu không có ý nghĩa chức năng độc lập. **Ngoại lệ: "In" luôn tách riêng** (xem G7).
- "Nhập thông tin + Lưu + Sinh mã" → **"Tạo mới [đối tượng]"** (note: bao gồm nhập, lưu, sinh mã)
- "Nhập thông tin + Lưu + In phiếu" → **"Tạo mới [đối tượng]"** + **"In phiếu [đối tượng]"** (In tách riêng theo G7)

**G7. In luôn là function riêng**: Bất kể "In" xuất hiện trong workflow nào, luôn tách thành 1 function độc lập. Lý do: In là 1 thao tác UI riêng biệt (nút In, preview, chọn máy in), cần thiết kế riêng, và user có thể chọn in hoặc không in.
- "In phiếu nhập kho", "In hóa đơn", "In báo cáo", "In biên bản" → mỗi cái là 1 function riêng
- "In lại phiếu X" → cũng là function riêng (action = **In**)

### Chuẩn hóa tên action

Khi đặt tên function, **BẮT BUỘC** dùng bảng action chuẩn dưới đây thay cho các mô tả gốc. Mục đích: thống nhất cách gọi, dễ phân loại function, tránh nhiễu do sub-step.

| Action chuẩn | Mô tả gốc thường gặp (mapping) | Ý nghĩa |
|---|---|---|
| **Xem** | Hiển thị, Load, View, Danh sách (khi chỉ hiển thị dữ liệu tĩnh) | Hiển thị dữ liệu/màn hình, không có thao tác tìm kiếm hay lọc chủ động |
| **Tìm kiếm** | Tìm kiếm, Tra cứu, Search, Lookup | User nhập keyword/tiêu chí để tìm bản ghi cụ thể. Là function riêng vì cần thiết kế UI ô tìm kiếm, logic matching |
| **Lọc** | Lọc, Filter, Bộ lọc, Lọc theo tiêu chí | User chọn điều kiện (dropdown, date range, checkbox) để thu hẹp danh sách. Là function riêng vì cần thiết kế UI bộ lọc, logic filter |
| **Tạo mới** | Nhập + Lưu, Lập, Tạo, Thêm mới, Đăng ký, Cấp (giấy/phiếu), CRUD (phần Create) | Tạo 1 bản ghi/đối tượng mới (bao gồm cả nhập liệu, lưu, và các bước tự động sau lưu như sinh mã, ký số, gửi duyệt) |
| **Chỉnh sửa** | Sửa, Cập nhật, Chỉnh sửa, Edit, CRUD (phần Update) | Thay đổi thông tin đã có |
| **Xóa** | Xóa, Hủy (bản ghi), Remove, Delete, CRUD (phần Delete) | Xóa bản ghi khỏi hệ thống |
| **Duyệt** | Duyệt, Phê duyệt, Approve, Xác nhận, Confirm | Xác nhận/phê duyệt 1 yêu cầu |
| **In** | In, In lại, In phiếu, In đơn, In giấy, In bảng kê, In biên bản, Print | In tài liệu/phiếu/đơn. **Luôn là function riêng** — kể cả khi nằm trong workflow Tạo mới (xem G7) |
| **Xuất** | Xuất PDF, Xuất Excel, Export, Download báo cáo | Xuất dữ liệu ra file |
| **Cấu hình** | Cài đặt, Thiết lập, Config, Setting, Mapping, Ánh xạ | Thiết lập tham số hệ thống |
| **Kết nối** | Kết nối, Tích hợp, Liên thông, Sync, Đồng bộ, Đẩy dữ liệu (khi là action chính) | Tích hợp với hệ thống bên ngoài |
| **Thực hiện** | Các thao tác nghiệp vụ đặc thù không thuộc CRUD: thanh toán, chuyển kho, gọi loa, phân công... | Thao tác nghiệp vụ đặc thù |
| **Tải về** | Tải về, Download, Tải file, Import file | Tải file/tài liệu về hệ thống hoặc từ hệ thống |

**Quy tắc phân biệt Xem / Tìm kiếm / Lọc:**
- Nếu màn hình chỉ hiển thị danh sách/chi tiết mà user không cần nhập gì → **Xem**
- Nếu user nhập keyword vào ô search để tìm → **Tìm kiếm** (function riêng)
- Nếu user chọn điều kiện từ dropdown/date picker/checkbox để thu hẹp danh sách → **Lọc** (function riêng)
- Một Feature có thể có cả 3: "Xem danh sách X" + "Tìm kiếm X" + "Lọc X theo tiêu chí" — đây là 3 function riêng biệt vì mỗi cái cần thiết kế UI và logic riêng

**Quy tắc áp dụng:**
- Luôn đặt action chuẩn ở đầu tên function: "**Tạo mới** đơn hàng", "**Xem** danh sách sản phẩm"
- Nếu mô tả gốc là workflow "Lập + Ký + Gửi + In [đối tượng]" → tách thành: **Tạo mới** [đối tượng] (gộp lập+ký+gửi) + **In** [đối tượng] (riêng)
- Nếu mô tả gốc là "In lại [đối tượng]" → action = **In** (đối tượng đã tồn tại, chỉ in lại)
- Nếu mô tả gốc chỉ có "Nhập thông tin X" mà không rõ có Lưu không → vẫn coi là **Tạo mới** (nhập mà không lưu thì vô nghĩa)
- Nếu mô tả gốc là "CRUD [đối tượng]" hoặc "Quản lý [đối tượng]" → tách thành: Xem + Tìm kiếm + Tạo mới + Chỉnh sửa + Xóa (5 function). Nếu mô tả có đề cập thêm Lọc/In/Duyệt → tách thêm tương ứng

### Quy tắc khác

2. **Loại bỏ dòng trống**: Bỏ qua dòng chỉ có STT mà không có nội dung
3. **Chuẩn hóa tên**: Đặt tên function theo format: **[Action chuẩn] + [Đối tượng]**. Viết ngắn gọn, rõ ràng, bỏ ký tự thừa
4. **Phát hiện trùng lặp**: Nếu nhiều Feature có cùng bộ function giống nhau (vd: Xem + Tìm kiếm + Tạo mới + Chỉnh sửa + Xóa), ghi note "pattern lặp: CRUD" để user nhận biết
5. **Đánh STT liên tục**: Function được đánh STT tăng dần từ 1, không ngắt quãng, xuyên suốt toàn bộ bảng
6. **Sửa STT gốc lỗi**: File input có thể có STT trùng, thiếu, hoặc không liên tục → bỏ qua STT gốc, đánh lại từ đầu
7. **Sử dụng các cột context bổ sung**: File input có 4 cột cố định (STT, Module, Nhóm chức năng, Chức năng chi tiết). Tất cả các cột phía sau cột thứ 4 đều là **cột context bổ sung** — có thể mang nhiều tên và format khác nhau:

   **Các dạng cột context thường gặp:**
   - Mô tả nghiệp vụ / Description / Chi tiết / Nội dung — diễn giải chi tiết chức năng
   - Q&A / Hỏi đáp — câu hỏi và trả lời làm rõ yêu cầu (vd: "Q: Ai duyệt? A: Trưởng phòng")
   - Note / Ghi chú — thông tin bổ sung, ràng buộc, ngoại lệ
   - Ví dụ / Example — minh họa cách hoạt động
   - Điều kiện / Condition / Rule — quy tắc nghiệp vụ, điều kiện xử lý
   - Bất kỳ cột nào khác có nội dung liên quan đến chức năng

   **Cách sử dụng context:**
   - Tổng hợp thông tin từ TẤT CẢ các cột context (không chỉ 1 cột) để hiểu đầy đủ scope của function
   - Dùng context để quyết định tách/gộp chính xác hơn — context giúp phân biệt function thực sự độc lập vs sub-step
   - Phân loại đúng level (Module/Feature/Function) khi tên cột gốc mơ hồ
   - Trích xuất thông tin nghiệp vụ quan trọng ghi vào cột Note (vd: "cần duyệt 2 cấp", "tự động gửi email thông báo")
   - Nhận diện function ẩn chưa được liệt kê trong tên nhưng context đề cập (vd: tên ghi "Duyệt" nhưng Q&A đề cập "sau duyệt gửi thông báo" → tách thêm function "Gửi thông báo" nếu user phải bấm nút gửi)
   - Nhận diện ràng buộc nghiệp vụ ảnh hưởng đến thiết kế (vd: "chỉ trưởng phòng mới được duyệt", "cần ký số trước khi gửi") → ghi vào Note

## Format output

File: `docs/functional_decomposition.md`

```markdown
# Phân rã chức năng - <Tên hệ thống>

> Nguồn: <tên file input>
> Phân rã bởi AI theo tiêu chí 3 cấp: Module > Feature > Function

| STT | Module | Feature | Function | Refer | Note |
|-----|--------|---------|----------|-------|------|
| 1 | **M1.** <Tên module> | **M1.F1.** <Tên feature> | <Tên function> | 5 | |
| 2 | | | <Function tiếp theo> | 6,7 | |
| 3 | | **M1.F2.** <Tên feature> | <Tên function> | 10 | |
| 4 | **M2.** <Tên module> | **M2.F1.** <Tên feature> | <Tên function> | 15 | |
```

Quy tắc format:
- Module chỉ ghi ở dòng function đầu tiên của module, các dòng sau để trống
- Feature chỉ ghi ở dòng function đầu tiên của feature, các dòng sau để trống
- Mỗi dòng đều có STT (chỉ function mới có STT)
- Cột Refer: chứa STT gốc từ file input mà function này được tạo ra. Nếu gộp từ nhiều dòng → liệt kê bằng dấu phẩy (vd: `10,11`). Nếu tách từ 1 dòng → ghi STT dòng đó. Mục đích: cho phép VLOOKUP ngược về file Excel gốc
- Cột Note: KHÔNG dùng mã nội bộ (G1-G7, NV, P1-P6). Phải ghi đầy đủ truy xuất nguồn theo format dưới đây

### Format cột Note — Truy xuất nguồn

Mỗi function trong output PHẢI ghi rõ nguồn gốc từ input để phục vụ kiểm tra và xác minh. Format gồm 2 phần:

**Phần 1 — Nguồn gốc (BẮT BUỘC):**
- `Gốc STT[X]:` — function giữ nguyên từ dòng input STT X
- `Gộp từ STT[X]+STT[Y]:` — function được gộp từ nhiều dòng input, kèm lý do gộp
- `Tách từ STT[X]:` — function được tách ra từ 1 dòng input, kèm lý do tách

**Phần 2 — Thông tin context (ghi nếu có):**
Trích xuất thông tin nghiệp vụ quan trọng từ các cột context, gắn nhãn theo tên cột gốc:
- `MTNV:` — trích từ cột Mô tả nghiệp vụ
- `Q&A:` — trích từ cột Q&A / Câu hỏi
- `Trả lời:` — trích từ cột Trả lời
- `Ghi chú:` — trích từ cột Ghi chú / Note
- Nếu cột context có tên khác (Điều kiện, Ví dụ, Rule...) → dùng tên cột đó làm nhãn

**Format xuống dòng trong markdown table:**
Dùng `<br>` để xuống dòng, mỗi mục context là 1 dòng riêng với gạch đầu dòng `- `. Dòng đầu tiên luôn là nguồn gốc (không cần gạch đầu dòng).

**Ví dụ Note:**

Ví dụ 1 — function giữ nguyên, có 1 cột context:
```
Gốc STT[5]:<br>- MTNV: Hiển thị danh sách BN chờ khám theo phòng
```

Ví dụ 2 — function gộp, có nhiều cột context:
```
Gộp từ STT[10]+STT[11]: gộp nhập liệu + lưu thành Tạo mới<br>- MTNV: Nhập thông tin đăng ký khám bao gồm TT BN, người thân, BHYT<br>- Q&A: Có cần xác nhận BHYT online không?<br>- Trả lời: Có, bắt buộc check BHYT trước khi lưu
```

Ví dụ 3 — function tách, có 2 cột context:
```
Tách từ STT[15]: tách "In" thành function riêng<br>- Q&A: In phiếu có cần ký số không?<br>- Trả lời: Không cần
```

Ví dụ 4 — function giữ nguyên, chỉ có nguồn gốc (không có context đáng trích):
```
Gốc STT[20]: pattern lặp CRUD
```

**Quy tắc:**
- Mỗi function PHẢI có ít nhất phần Nguồn gốc (Gốc/Gộp/Tách) ở dòng đầu
- Mỗi cột context có nội dung đáng trích → 1 dòng riêng với `<br>- ` prefix
- Nếu chỉ có nguồn gốc mà không có context → viết trên 1 dòng, không cần `<br>`
- Chỉ trích context có giá trị nghiệp vụ — bỏ qua nội dung trống hoặc lặp lại tên function
- Ưu tiên trích: ràng buộc quyền, điều kiện xử lý, quy tắc đặc biệt, thông tin ảnh hưởng thiết kế UI

## Steps

### 1. Đọc file input

- Đọc file input từ đường dẫn user cung cấp: $ARGUMENTS
- Nếu không có argument → hỏi user đường dẫn file
- Format: `.md` (markdown table)
- Xác định tên hệ thống từ nội dung file hoặc tên file
- Cấu trúc input: 4 cột cố định (STT, Module, Nhóm chức năng, Chức năng chi tiết) + N cột context bổ sung tùy ý (mô tả, Q&A, note, điều kiện, ví dụ...)

### 2. Phân tích & phân rã

**Bước 2a — Nhận diện cấu trúc gốc:**
- Xác định 4 cột cố định: STT, Module, Nhóm chức năng (Feature), Chức năng chi tiết (Function)
- Xác định tất cả các cột từ cột thứ 5 trở đi là cột context bổ sung — ghi nhận tên và format của từng cột (mô tả, Q&A, note, điều kiện, ví dụ...)
- Nhận diện các dòng trống, STT lỗi, dòng gộp
- Nhận diện phong cách viết input (P1-P6) để áp dụng rule phù hợp

**Bước 2b — Phân rã theo tiêu chí:**
- Áp dụng tiêu chí 3 cấp ở trên để phân loại mỗi dòng
- Tổng hợp thông tin từ tất cả các cột context bổ sung làm input khi quyết định phân loại và tách/gộp
- Tách các function gộp (kể cả function ẩn phát hiện từ các cột context)
- Áp dụng quy tắc gộp G1-G7 để tránh tách quá mịn
- Chuẩn hóa tên function theo bảng action chuẩn
- Loại bỏ dòng trống
- Đánh STT mới liên tục

**Bước 2c — Ghi Note truy xuất nguồn:**
- Với mỗi function, ghi Note theo format truy xuất nguồn (xem mục "Format cột Note — Truy xuất nguồn")
- Ghi rõ nguồn gốc: Gốc STT[X] / Gộp từ STT[X]+STT[Y] / Tách từ STT[X]
- Trích xuất thông tin nghiệp vụ từ các cột context, gắn nhãn theo tên cột gốc (MTNV:, Q&A:, Trả lời:, Ghi chú:, hoặc tên cột khác)
- Nhận diện các Feature có bộ function giống nhau → ghi "pattern lặp" trong Note

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
