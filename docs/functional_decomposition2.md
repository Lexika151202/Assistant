# Phân rã chức năng - Trạm Y Tế / HIS

> Nguồn: docs/Trạm Y Tế _ HIS.md
> Phân rã bởi AI theo tiêu chí 3 cấp: Module > Feature > Function

| STT | Module | Feature | Function | Note |
|-----|--------|---------|----------|------|
| 1 | **M1.** Tiếp đón - Tiếp nhận bệnh nhân | **M1.F1.** Giao diện tiếp đón BN | Tìm kiếm bệnh nhân | Gốc STT[2]:<br>- MTNV: BN cũ tìm theo SĐT/CCCD/BHYT, BN lần đầu tra cứu cổng BHYT |
| 2 | | | Tạo mới đăng ký khám | Gộp từ STT[1]+STT[3]+STT[4]: gộp load danh mục + nhập TT BN/người thân/BHYT/đăng ký khám + lưu/sinh STT chờ khám<br>- MTNV: có các input (combobox, textbox) để chọn, nhập liệu; lưu vào bảng đăng ký khám, lưu vào hàng đợi khám<br>- Ghi chú (STT[4]): chọn PK, kiểu khám (nội, sản, RHM) → tính tiền khám luôn; KSK tính nhiều mục (khám, XN, siêu âm, X-quang)<br>- Ghi chú (STT[4]): chức năng lớn, tính tiền khám bệnh, có thể sinh QR thanh toán không dùng tiền mặt, đẩy XML Checkin lên cổng BHYT |
| 3 | | | In phiếu đăng ký khám | Tách từ STT[4]+STT[6]: tách "In" thành function riêng<br>- MTNV: sau khi lưu → in phiếu (sau nếu có App/SMS/Zalo OA thì không cần in)<br>- Q&A: đã có chức năng In nhưng chưa có template tham khảo phiếu in |
| 4 | | | Xem danh sách phòng khám - phân luồng BN | Gốc STT[5] |
| 5 | | **M1.F2.** Danh sách đã tiếp đón | Xem danh sách BN đã tiếp đón | Tách từ STT[7]: tách Xem<br>- MTNV: các chức năng trong danh sách BN đã đăng ký, đã tiếp đón xong |
| 6 | | | Tìm kiếm BN đã tiếp đón | Tách từ STT[7]: tách Tìm kiếm (theo họ tên, giới tính, ngày sinh, số thẻ BH, điện thoại) |
| 7 | | | In lại phiếu đăng ký khám | Gốc STT[8] |
| 8 | | | Chỉnh sửa thông tin đăng ký | Gốc STT[9]:<br>- Trả lời: chỉnh sửa các thông tin về BN, hành chính, thẻ BH, nghề nghiệp, nơi giới thiệu |
| 9 | | | Thực hiện chuyển phòng khám | Gốc STT[10]:<br>- Q&A: có phải là 1 dạng update thông tin không?<br>- Trả lời: khác với chỉnh sửa TT — chuyển PK phải tính lại tiền, mã dịch vụ |
| 10 | | | Xóa thông tin đăng ký | Gốc STT[11] |
| 11 | | **M1.F3.** Báo cáo tiếp đón | Xem báo cáo tiếp đón | Tách từ STT[12]: tách Xem (danh sách tiếp đón theo CCCD, BHYT; thời gian chờ BN) |
| 12 | | | Lọc báo cáo tiếp đón theo tiêu chí | Tách từ STT[12]: tách Lọc (theo CCCD, BHYT, thời gian chờ)<br>- Q&A: khảo sát trực tiếp |
| 13 | **M2.** Khám bệnh phòng khám | **M2.F1.** Danh sách chờ khám - đang khám | Xem danh sách chờ khám | Tách từ STT[13]: tách 3 trạng thái danh sách |
| 14 | | | Xem danh sách đang khám | Tách từ STT[13] |
| 15 | | | Xem danh sách đã khám | Tách từ STT[13] |
| 16 | | | Thực hiện chọn BN để khám | Tách từ STT[13]: "để BS chọn BN" |
| 17 | | **M2.F2.** Danh sách đợi khám ngoài PK | Xem danh sách chờ khám ngoài PK | Tách từ STT[14]: tách Xem<br>- MTNV: BN ngồi chờ ngoài PK nhìn thấy danh sách, xem sắp đến lượt. TH1: TYT có màn hình thì sử dụng. TH2: TYT không có thiết bị → hiển thị cho nhân viên tiếp đón gọi thủ công (số đang khám, số chờ, số đến lượt) |
| 18 | | | Thực hiện gọi loa BN vào PK | Tách từ STT[14]: tách "gọi loa"<br>- MTNV: gọi họ tên BN, số thứ tự mời BN vào PK |
| 19 | | **M2.F3.** Cài đặt gói chỉ định template | Cấu hình gói dịch vụ chỉ định nhanh | Gốc STT[15]:<br>- MTNV: tương tự cài đặt gói của tiếp đón, tham khảo cài đặt đơn thuốc mẫu |
| 20 | | **M2.F4.** Cài đặt sổ tay gõ tắt | Cấu hình từ điển gõ tắt theo user | Gốc STT[16]:<br>- MTNV: VD gõ BNVP → load "BN ho và sốt, thở khò khè...". 1. Từ điển dùng chung toàn ĐV, 2. Từ điển cá nhân. Phù hợp chuyên khoa bệnh thường gặp |
| 21 | | **M2.F5.** Cài đặt đơn thuốc mẫu template | Cấu hình đơn thuốc mẫu theo mã bệnh | Gốc STT[17]:<br>- Q&A: cần những thông tin gì để cấu hình?<br>- Trả lời: cần danh mục thuốc, tồn thực tế tại kho; khi thay đổi thầu/hết thuốc thì đơn mẫu phải sửa lại |
| 22 | | **M2.F6.** Giao diện khám bệnh | Xem thông tin chi tiết BN | Gốc STT[18] |
| 23 | | | Xem lịch sử khám bệnh các lần trước | Gốc STT[19] |
| 24 | | | Xem thông tin chi phí - tạm ứng | Gốc STT[20]:<br>- MTNV: tính tiền công khám, chỉ định DVKT → cần tạm ứng bao nhiêu, chi trả còn lại<br>- Q&A: cần thông tin cấu hình chi phí thuốc, dịch vụ<br>- Trả lời: cho BS nhìn tổng quát chi phí, cảnh báo BN vượt tạm ứng → cần tạm ứng thêm hoặc đi thanh toán |
| 25 | | | Tạo mới phiếu khám bệnh | Gộp từ STT[21]+STT[22]: cùng form nhập liệu khám bệnh (chẩn đoán sơ bộ/chính/kèm theo, sinh hiệu + phiếu khám theo mẫu) |
| 26 | | | Tạo mới chỉ định dịch vụ kỹ thuật | Gốc STT[23]:<br>- MTNV: BS chỉ định XN, CĐHA-TDCN, PTTT, ký số<br>- Q&A: đã có form chỉ định nhưng chưa có thông tin cấu hình để lựa chọn<br>- Trả lời: cần danh mục DVKT, cấu hình giá theo đối tượng/ngày hiệu lực<br>- Ghi chú: chức năng lớn, tính tiền, đẩy chi phí phát sinh lên cổng |
| 27 | | | In phiếu chỉ định | Tách từ STT[23]: tách "In" |
| 28 | | | Kết nối LIS-PACS | Gốc STT[24]:<br>- MTNV: nên có giao diện đẩy lại chỉ định khi đẩy lỗi<br>- Ghi chú: nhiều thông tin, nhiều API cần làm |
| 29 | | | Xem kết quả CLS | Gốc STT[25]:<br>- MTNV: BS lâm sàng xem kết quả để quyết định kê đơn cho về / nhập viện / chuyển viện |
| 30 | | | Tạo mới đơn thuốc từ kho | Tách từ STT[26]: tách kho vs tủ trực vì nguồn thuốc khác nhau<br>- Q&A: đã có form kê đơn nhưng chưa có thông tin cấu hình thuốc<br>- Trả lời: cần danh mục thuốc, thuốc phải còn tồn kho, áp dụng quy tắc nhập xuất, trừ tồn khả dụng<br>- Ghi chú: chức năng lớn, tính tiền, trừ tồn khả dụng, đẩy thông tin vào module Dược chờ cấp phát, đẩy đơn thuốc quốc gia |
| 31 | | | Tạo mới đơn thuốc từ tủ trực | Tách từ STT[26]: tủ trực là nguồn thuốc riêng |
| 32 | | | In đơn thuốc | Tách từ STT[26]: tách "In" |
| 33 | | | Tạo mới đơn thuốc mua ngoài | Gốc STT[27]:<br>- MTNV: kê đơn cho BN tự ra ngoài mua<br>- Ghi chú: không có kho, không có danh mục, user tự gõ hoặc import danh mục từ cổng Dược Quốc Gia |
| 34 | | | Thực hiện xử trí bệnh nhân | Gốc STT[28]:<br>- MTNV: xử trí cho BN: vào viện, chuyển viện, cấp đơn cho về; đồng thời chọn kết quả khám/điều trị<br>- Q&A: chưa có mẫu in tham khảo<br>- Trả lời: không cần mẫu, chỉ là list để chọn |
| 35 | | | Tạo mới giấy vào viện | Gốc STT[29]:<br>- Q&A: chưa có mẫu nhập liệu tham khảo<br>- Trả lời: mẫu giấy theo thông tư, cần xác định thông tư |
| 36 | | | In giấy vào viện | Tách từ STT[29]: tách "In" |
| 37 | | | Tạo mới giấy chuyển tuyến | Gộp từ STT[30]+STT[31]: gộp nhập thông tin + ký số + đẩy cổng BHYT<br>- Q&A (STT[30]): chưa có mẫu nhập liệu<br>- Trả lời (STT[30]): mẫu giấy theo thông tư<br>- Q&A (STT[31]): tham khảo trên mẫu tờ khai<br>- Trả lời (STT[31]): tương tác API với cổng BHYT |
| 38 | | | In giấy chuyển tuyến | Tách từ STT[30]: tách "In" |
| 39 | | | Tạo mới phiếu thủ thuật | Gốc STT[32]:<br>- MTNV: các thủ thuật ngoài CLS cần phiếu thực hiện (thông tin người thực hiện → đẩy cổng BHYT, tính tiền phụ cấp), ký số<br>- Ghi chú: kỹ thuật viên thực hiện, điều dưỡng nhập dữ liệu, cần đẩy cổng BHYT |
| 40 | | | In phiếu thủ thuật | Tách từ STT[32]: tách "In" |
| 41 | | | Tải lên tài liệu y số hóa | Gốc STT[33]:<br>- MTNV: lưu dạng ảnh/PDF (giấy chuyển tuyến, cam kết chữ ký tươi, kết quả gửi khám)<br>- Ghi chú: ngoài dữ liệu nhập tay, cần import giấy tờ ngoài vào bệnh án chung; chức năng độc lập |
| 42 | | | Thực hiện chuyển khám | Tách từ STT[34]: tách "chuyển khám"<br>- Q&A: khi chọn chuyển khám, HT mở giao diện mới hay đóng hồ sơ?<br>- Trả lời: mở giao diện phụ trên màn hình khám để nhập liệu, vẫn thao tác trên hồ sơ này (chưa kết thúc khám nên chưa đóng)<br>- Ghi chú: chuyển khám sang PK B: giá = giá gốc × 30% |
| 43 | | | Thực hiện đổi phòng khám | Tách từ STT[34]: tách "đổi phòng khám"<br>- Ghi chú: không thay đổi giá, không tính thêm |
| 44 | | | Thực hiện trả BN về danh sách chờ | Tách từ STT[34]: tách "trả về danh sách chờ" |
| 45 | | | In giấy hẹn khám | Tách từ STT[34]: tách "In" |
| 46 | | | Thực hiện kết thúc khám | Gốc STT[38]:<br>- MTNV: ký số XML, đẩy cổng BHYT<br>- Ghi chú: HT tự động tạo file XML theo chuẩn → ký số → đẩy lên cổng BHYT; module quản lý BH có theo dõi và đẩy thủ công riêng khi đẩy tự động lỗi |
| 47 | | | In bảng kê chi phí KCB | Tách từ STT[38]: tách "In"<br>- MTNV: in bảng kê ra kế toán thanh toán, ký số bảng kê (tiền khám, CLS, thủ thuật) |
| 48 | | **M2.F7.** Tra cứu hồ sơ khám bệnh | Tìm kiếm BN đã khám | Gốc STT[39]:<br>- MTNV: cho phép tìm lại thông tin BN đã đến khám |
| 49 | | **M2.F8.** Danh sách giấy chuyển tuyến | Xem danh sách giấy chuyển tuyến | Tách từ STT[40]: tách Xem<br>- Q&A: user có cần xuất Excel báo cáo cho SYT/BHYT?<br>- Trả lời: thường không cần, chủ yếu đơn vị theo dõi báo cáo chuyên môn |
| 50 | | | Tìm kiếm giấy chuyển tuyến | Tách từ STT[40]: tách Tìm kiếm |
| 51 | | | Thực hiện đẩy cổng giấy chuyển tuyến | Tách từ STT[40]: tách "đẩy cổng" |
| 52 | | | In lại phiếu chuyển viện | Tách từ STT[40]: tách "In" |
| 53 | | **M2.F9.** Trả kết quả khám sức khỏe | Tạo mới giấy KSK xin việc | Tách từ STT[41]: tách KSK xin việc vs KSK lái xe<br>- Q&A: kết quả cuối lấy tự động hay user tự gõ? Quy trình đẩy cổng đẩy ngay hay cuối ngày?<br>- Trả lời: KSK có nhiều mục, nhiều chuyên khoa kết hợp, mỗi CK khám-ký kết quả riêng, bước cuối mới đẩy tổng thể lên cổng |
| 54 | | | Tạo mới giấy KSK lái xe | Tách từ STT[41]: bao gồm lập, ký số, đẩy cổng |
| 55 | | | In giấy khám sức khỏe | Tách từ STT[41]: tách "In" |
| 56 | | **M2.F10.** Cấp giấy báo tử | Tạo mới giấy báo tử | Gốc STT[42]: bao gồm ký số, đẩy cổng |
| 57 | | | In giấy báo tử | Tách từ STT[42]: tách "In" |
| 58 | | **M2.F11.** Cấp giấy chứng nhận nghỉ ốm BHXH | Tạo mới giấy nghỉ ốm BHXH | Gốc STT[43] |
| 59 | | | In giấy nghỉ ốm BHXH | Tách từ STT[43]: tách "In" |
| 60 | | **M2.F12.** Cấp giấy chứng nhận nghỉ dưỡng thai BHXH | Tạo mới giấy nghỉ dưỡng thai BHXH | Gốc STT[44] |
| 61 | | | In giấy nghỉ dưỡng thai BHXH | Tách từ STT[44]: tách "In" |
| 62 | | **M2.F13.** Báo cáo chuyên môn PK | Xem báo cáo danh sách khám bệnh theo thời gian | Tách từ STT[45] |
| 63 | | | Xem báo cáo hoạt động khám bệnh | Tách từ STT[45] |
| 64 | | **M2.F14.** Dự trù bổ sung thuốc tủ trực PK | Tạo mới phiếu dự trù bổ sung thuốc tủ trực | Gốc STT[46]:<br>- MTNV: mỗi PK có tủ trực (PK cấp cứu, RHM, TMH), hết thì dự trù bổ sung; tồn vào tủ thuốc dự trù; chức năng dành riêng cho PK, không liên quan thuốc kê cho BN; tạo phiếu → form input → in phiếu → gửi khoa Dược duyệt (hàng đợi phát thuốc + vào kho PK)<br>- Q&A: thuốc phục vụ tại chỗ (thủ thuật, cấp cứu) không phải thuốc kê đơn? HT phân biệt thuốc dùng tại chỗ vs thuốc kê đơn? Tính tiền trong phiếu? |
| 65 | | | In phiếu dự trù | Tách từ STT[46]: tách "In" |
| 66 | | | Thực hiện trả thuốc về kho | Gốc STT[47] |
| 67 | **M3.** Viện phí / BHYT | **M3.F1.** Thu tiền viện phí | Xem danh sách chờ thu viện phí | Gốc STT[49]:<br>- MTNV: được tạo từ bước kết thúc khám bệnh |
| 68 | | | Tìm kiếm BN cần thu tiền | Tách từ STT[48]: tách Tìm kiếm |
| 69 | | | Xem thông tin chi tiết BN | Gốc STT[50] |
| 70 | | | Xem bảng kê chi phí chi tiết BN | Gốc STT[51]:<br>- MTNV: tính tiền tổng, công thức tính, in được HĐ điện tử cho BN |
| 71 | | | Thực hiện thu tiền viện phí | Gốc STT[52]:<br>- MTNV: hiển thị chi tiết số tiền, các mục cần thu; view tổng quát |
| 72 | | | Kết nối in hóa đơn điện tử | Gốc STT[53]:<br>- MTNV: API |
| 73 | | **M3.F2.** Báo cáo thu tiền viện phí | Xem báo cáo danh sách thu tiền hàng ngày | Gốc STT[54]:<br>- MTNV: cần thu thập mẫu báo cáo |
| 74 | | **M3.F3.** Quản lý đẩy XML cổng BHYT | Tạo mới và đẩy file XML BHYT | Gốc STT[55]:<br>- MTNV: theo chuẩn 130 (chuẩn XML mới nhất 3176); màn hình theo dõi đẩy cổng BHYT |
| 75 | | | Thực hiện đẩy thủ công khi tự động lỗi | Tách từ STT[55]: tách đẩy thủ công |
| 76 | | | Xem kiểm tra dữ liệu XML | Tách từ STT[55]: tách check dữ liệu đúng/sai, chạy chuyên đề chống xuất toán BHYT |
| 77 | **M4.** Quản lý kho dược - Nghiệp vụ | **M4.F1.** Nhập hóa đơn | Xem danh sách hóa đơn đã nhập | Tách từ STT[56]: tách Xem<br>- MTNV: màn hình chung quản lý nhập thuốc vào kho từ hóa đơn/chứng từ NCC |
| 78 | | | Lọc hóa đơn theo tiêu chí | Tách từ STT[56]: tách Lọc (loại nhập, nguồn nhập, ngày tháng năm) |
| 79 | | | Tạo mới hóa đơn nhập | Gốc STT[57] |
| 80 | | | In phiếu nhập | Tách từ STT[58]: tách "In phiếu nhập" |
| 81 | | | In biên bản kiểm nhập | Tách từ STT[58]: tách "In biên bản kiểm nhập" |
| 82 | | **M4.F2.** Duyệt phiếu xuất khoa phòng | Duyệt phiếu xuất hao phí khoa phòng | Gốc STT[59]:<br>- MTNV: duyệt phiếu xuất đi các khoa-phòng; nhận phiếu chờ từ PK → duyệt → update số lượng (hết hạn, nhập-xuất) |
| 83 | | **M4.F3.** Xuất kho khác | Thực hiện xuất kiểm nghiệm | Tách từ STT[60] |
| 84 | | | Thực hiện xuất hủy | Tách từ STT[60]:<br>- MTNV: tạo phiếu xuất hủy, thanh lý → lưu → trừ tồn → in phiếu ký xác nhận |
| 85 | | | Thực hiện xuất chương trình | Tách từ STT[60] |
| 86 | | | Thực hiện xuất cho phân trạm trực thuộc | Tách từ STT[60] |
| 87 | | **M4.F4.** Tồn kho hạn dùng chi tiết | Xem tồn kho chi tiết từng kho | Gốc STT[61]:<br>- MTNV: hiển thị tồn kho thuốc, thông tin thẻ kho, thông tin chờ xuất kho |
| 88 | | **M4.F5.** Tồn kho tổng đơn vị | Xem tồn kho tổng toàn đơn vị | Gốc STT[62]:<br>- MTNV: sum tồn kho các kho, các tủ trực toàn đơn vị |
| 89 | | **M4.F6.** Chờ nhận trả kho/tủ | Xem danh sách chờ nhận trả thuốc | Gốc STT[63]:<br>- MTNV: danh sách chờ nhận trả lại thuốc khi có phiếu dự trù trả |
| 90 | | **M4.F7.** Phiếu trả nhà cung cấp | Tạo mới phiếu trả thuốc/vật tư cho NCC | Gốc STT[64]:<br>- MTNV: màn hình quản lý tạo phiếu xuất trả NCC |
| 91 | | **M4.F8.** Liên thông đơn thuốc quốc gia | Kết nối liên thông đơn thuốc quốc gia | Gốc STT[65]:<br>- MTNV: quản lý gửi dữ liệu liên thông sau khi kê đơn cho BN |
| 92 | **M5.** Quản lý kho dược - Danh mục | **M5.F1.** Hàng hóa vật tư | Xem danh sách hàng hóa | Tách từ STT[66]: tách Xem<br>- MTNV: các màn hình quản lý danh mục (CRUD) |
| 93 | | | Tạo mới hàng hóa | Tách từ STT[66]: tách Tạo mới, bao gồm import từ Excel |
| 94 | | | Chỉnh sửa hàng hóa | Tách từ STT[66]: tách Chỉnh sửa |
| 95 | | **M5.F2.** Phân loại dược | Cấu hình danh mục phân loại dược | Gốc STT[67]: pattern lặp CRUD danh mục<br>- MTNV: 2 nhóm: Bù được và Bổ sung |
| 96 | | **M5.F3.** Nhóm thuốc | Cấu hình danh mục nhóm thuốc | Gốc STT[68]: pattern lặp CRUD danh mục |
| 97 | | **M5.F4.** Hoạt chất | Cấu hình danh mục hoạt chất | Gốc STT[69]: TT20, TT30, TT40; pattern lặp CRUD danh mục |
| 98 | | **M5.F5.** Đường dùng | Cấu hình danh mục đường dùng | Gốc STT[70]: pattern lặp CRUD danh mục |
| 99 | | **M5.F6.** Cảnh báo kết quả CLS | Cấu hình cảnh báo thuốc theo kết quả CLS | Gốc STT[71] |
| 100 | | **M5.F7.** Chỉ định / Chống chỉ định | Cấu hình chống chỉ định thuốc | Gốc STT[72] |
| 101 | | **M5.F8.** Tương tác thuốc | Cấu hình tương tác thuốc | Gốc STT[73] |
| 102 | | **M5.F9.** Hãng sản xuất | Cấu hình danh mục hãng sản xuất | Gốc STT[74]: pattern lặp CRUD danh mục |
| 103 | | **M5.F10.** Nhà cung cấp | Cấu hình danh mục nhà cung cấp | Gốc STT[75]: pattern lặp CRUD danh mục |
| 104 | | **M5.F11.** Quốc gia | Cấu hình danh mục quốc gia | Gốc STT[76]: pattern lặp CRUD danh mục |
| 105 | | **M5.F12.** Nguồn nhập | Cấu hình danh mục nguồn nhập | Gốc STT[77]: pattern lặp CRUD danh mục |
| 106 | | **M5.F13.** Loại nhập | Cấu hình danh mục loại nhập | Gốc STT[78]: pattern lặp CRUD danh mục |
| 107 | | **M5.F14.** Loại kê đơn | Cấu hình danh mục loại kê đơn | Gốc STT[79]: pattern lặp CRUD danh mục |
| 108 | | **M5.F15.** Thuốc mua ngoài | Cấu hình danh mục thuốc mua ngoài | Gốc STT[80]: dùng cho tab thuốc mua ngoài |
| 109 | | **M5.F16.** Thuốc gốc | Cấu hình danh mục thuốc vật tư gốc | Gốc STT[81] |
| 110 | **M6.** Quản lý kho dược - Báo cáo | **M6.F1.** Báo cáo dược | Xem báo cáo nhập xuất tồn | Tách từ STT[82]:<br>- MTNV: rất nhiều báo cáo, cần xin mẫu và est lại thời gian |
| 111 | | | Xem báo cáo nhập kho | Tách từ STT[82] |
| 112 | | | Xem báo cáo xuất kho | Tách từ STT[82] |
| 113 | | | Xem báo cáo nhập theo nhà cung cấp | Tách từ STT[82] |
| 114 | | | Xem báo cáo nhập theo hóa đơn | Tách từ STT[82] |
| 115 | | | Xem báo cáo xuất theo kho/khoa/phòng/nhóm | Tách từ STT[82] |
| 116 | | | Xem báo cáo trả thuốc | Tách từ STT[82] |
| 117 | | | Xem báo cáo kiểm kê | Tách từ STT[82] |
| 118 | | | Xem báo cáo thẻ kho | Tách từ STT[82] |
| 119 | | | Xem báo cáo nhập xuất theo khoa phòng | Tách từ STT[82] |
| 120 | **M7.** Quản lý kho dược - Cài đặt | **M7.F1.** Thành viên kiểm nhập - kiểm kê | Cấu hình thành viên kiểm nhập kiểm kê | Gốc STT[83]:<br>- MTNV: thủ kho, kế toán trưởng, lãnh đạo BV |
| 121 | | **M7.F2.** Cấu hình phiếu | Cấu hình loại phiếu in cho từng chức năng | Gốc STT[84]:<br>- MTNV: report động cho phiếu in — chưa cần thiết |
| 122 | | **M7.F3.** Ánh xạ danh mục dược quốc gia | Cấu hình ánh xạ danh mục thuốc với cổng Dược quốc gia | Gốc STT[85]:<br>- MTNV: ánh xạ giữa danh mục đang sử dụng tại BV và danh mục Dược QG; mapping giữa mã và tên thuốc trên cổng |
| 123 | | **M7.F4.** Tài khoản dược quốc gia | Cấu hình tài khoản gửi đơn thuốc quốc gia | Gốc STT[86]:<br>- MTNV: mã ĐV / mã Trạm / User / Pass |
| 124 | **M8.** Quản lý kho dược - Phòng Khám | **M8.F1.** Duyệt đơn | Xem danh sách đơn thuốc | Tách từ STT[87]: tách Xem |
| 125 | | | Lọc đơn thuốc theo tình trạng | Tách từ STT[87]: tách Lọc (chưa phát/đã phát theo ngày tháng) |
| 126 | | | Thực hiện phát thuốc cho BN | Tách từ STT[87]: tách "phát thuốc" |
| 127 | | | Thực hiện hủy phát thuốc | Tách từ STT[87]: tách "hủy phát thuốc" |
| 128 | | **M8.F2.** Nhật ký phát thuốc | Xem lịch sử phát thuốc | Gốc STT[88] |
| 129 | **M9.** Quản lý kho dược - Tủ trực | **M9.F1.** Bổ sung cơ số tủ trực | Tạo mới phiếu bổ sung CSTT | Gốc STT[89]:<br>- MTNV: bù ngay khi đã sử dụng cho BN |
| 130 | | **M9.F2.** Duyệt phiếu bổ sung CSTT | Duyệt phiếu yêu cầu từ khoa phòng | Gốc STT[90] |
| 131 | | **M9.F3.** Hoàn trả cơ số tủ trực | Tạo mới phiếu hoàn trả | Gốc STT[91] |
| 132 | | **M9.F4.** Duyệt phiếu hoàn trả CSTT | Duyệt phiếu hoàn trả | Gốc STT[92] |
| 133 | | **M9.F5.** Thu hồi cơ số tủ trực | Tạo mới phiếu thu hồi cơ số | Gốc STT[93] |
| 134 | | **M9.F6.** Xem cơ số tủ trực | Xem cơ số tủ trực | Gốc STT[94] |
| 135 | | **M9.F7.** Bù cơ số tủ trực | Duyệt bù cơ số | Gốc STT[95] |
| 136 | **M10.** Quản trị - Danh mục | **M10.F1.** Thông tin cơ sở | Cấu hình thông tin cơ sở | Gốc STT[96]:<br>- MTNV: tên đơn vị, địa chỉ, logo, số ĐT, giám đốc |
| 137 | | **M10.F2.** Nhóm dịch vụ | Cấu hình danh mục nhóm dịch vụ | Gốc STT[97]: pattern lặp CRUD danh mục<br>- MTNV: khám, XN, siêu âm, X-quang |
| 138 | | **M10.F3.** Dịch vụ kỹ thuật - Giá DVKT | Xem danh sách DVKT | Tách từ STT[98]: tách Xem<br>- MTNV: hỗ trợ quản lý và lưu thông tin giá DVKT theo thời gian, theo đối tượng |
| 139 | | | Tạo mới DVKT | Tách từ STT[98]: tách Tạo mới |
| 140 | | | Chỉnh sửa DVKT | Tách từ STT[98]: tách Chỉnh sửa, bao gồm cấu hình giá theo thời gian/đối tượng |
| 141 | | **M10.F4.** Danh mục khoa | Cấu hình danh mục khoa | Gốc STT[99]: pattern lặp CRUD danh mục |
| 142 | | **M10.F5.** Danh mục phòng | Cấu hình danh mục phòng | Gốc STT[100]: pattern lặp CRUD danh mục |
| 143 | | **M10.F6.** Danh mục giường bệnh | Cấu hình danh mục giường bệnh | Gốc STT[101]: pattern lặp CRUD danh mục |
| 144 | | **M10.F7.** Danh mục đối tượng | Cấu hình danh mục đối tượng | Gốc STT[102]: pattern lặp CRUD danh mục |
| 145 | | **M10.F8.** Phân hệ - Menu | Cấu hình phân hệ-menu | Gốc STT[103]:<br>- MTNV: quản lý và phân quyền nhân viên theo menu, theo khoa-phòng |
| 146 | | **M10.F9.** Nhân viên - Phân quyền | Xem danh sách nhân viên | Tách từ STT[104]: tách Xem |
| 147 | | | Tạo mới nhân viên | Tách từ STT[104]: tách Tạo mới |
| 148 | | | Chỉnh sửa nhân viên | Tách từ STT[104]: tách Chỉnh sửa, bao gồm phân quyền theo khoa-phòng, phân hệ-menu |
| 149 | | **M10.F10.** Danh mục máy thực hiện | Cấu hình danh mục máy thực hiện | Gốc STT[105]:<br>- MTNV: các loại máy CLS, máy thực hiện PTTT |
| 150 | | **M10.F11.** Danh mục mã Modality PACS | Cấu hình danh mục mã Modality | Gốc STT[106]:<br>- MTNV: DX = X-quang, US = siêu âm... |
| 151 | | **M10.F12.** Danh mục chỉ số xét nghiệm | Cấu hình danh mục chỉ số XN | Gốc STT[107]:<br>- MTNV: map với LIS, khi LIS trả về thì khớp kết quả, đẩy cổng theo mã chỉ số |
| 152 | **M11.** Quản trị - Cài đặt tham số | **M11.F1.** Cấu hình định mức BHYT | Cấu hình định mức BHYT | Gốc STT[108]:<br>- MTNV: mức hưởng tối đa BHYT theo số tháng lương, lương tối thiểu |
| 153 | | **M11.F2.** Cấu hình mức hưởng BHYT | Cấu hình mức hưởng BHYT theo thẻ, theo tuyến | Gốc STT[109]:<br>- MTNV: mức hưởng theo các loại đầu thẻ, theo tuyến |
| 154 | **M12.** Quản trị - Danh mục điều trị | **M12.F1.** Nguyên nhân tai biến - biến chứng | Cấu hình danh mục nguyên nhân tai biến | Gốc STT[110]: pattern lặp CRUD danh mục |
| 155 | | **M12.F2.** Nguyên nhân tử vong | Cấu hình danh mục nguyên nhân tử vong | Gốc STT[111]: pattern lặp CRUD danh mục |
| 156 | | **M12.F3.** Thời gian tử vong | Cấu hình danh mục thời gian tử vong | Gốc STT[112]: pattern lặp CRUD danh mục |
| 157 | | **M12.F4.** Tai nạn thương tích | Cấu hình danh mục tai nạn thương tích | Gốc STT[113]: pattern lặp CRUD danh mục |
| 158 | | **M12.F5.** Tai biến sản khoa | Cấu hình danh mục tai biến sản khoa | Gốc STT[114]: pattern lặp CRUD danh mục |
| 159 | | **M12.F6.** Phân loại bệnh | Cấu hình danh mục phân loại bệnh | Gốc STT[115]: loại bệnh án; pattern lặp CRUD danh mục |
| 160 | | **M12.F7.** Phân loại PTTT | Cấu hình danh mục phân loại PTTT | Gốc STT[116]: pattern lặp CRUD danh mục |
| 161 | | **M12.F8.** Nhóm bệnh truyền nhiễm | Cấu hình danh mục nhóm bệnh truyền nhiễm | Gốc STT[117]: pattern lặp CRUD danh mục |
| 162 | | **M12.F9.** Chuyên khoa | Cấu hình danh mục chuyên khoa | Gốc STT[118]: pattern lặp CRUD danh mục |
| 163 | | **M12.F10.** Địa điểm tai nạn | Cấu hình danh mục địa điểm tai nạn | Gốc STT[119]: pattern lặp CRUD danh mục |
| 164 | **M13.** Quản trị - Danh mục dùng chung | **M13.F1.** Danh mục bệnh viện | Cấu hình danh mục bệnh viện | Gốc STT[120]: pattern lặp CRUD danh mục |
| 165 | | **M13.F2.** Đơn vị hành chính | Cấu hình danh mục đơn vị hành chính | Gốc STT[121]: pattern lặp CRUD danh mục |
| 166 | | **M13.F3.** ICD-10 | Cấu hình danh mục ICD-10 | Gốc STT[122]: pattern lặp CRUD danh mục |
| 167 | | **M13.F4.** Chương bệnh ICD | Cấu hình danh mục chương bệnh ICD | Gốc STT[123]: pattern lặp CRUD danh mục |
| 168 | | **M13.F5.** Dân tộc | Cấu hình danh mục dân tộc | Gốc STT[124]: pattern lặp CRUD danh mục |
| 169 | | **M13.F6.** Quốc gia | Cấu hình danh mục quốc gia | Gốc STT[125]: pattern lặp CRUD danh mục |
| 170 | | **M13.F7.** Nghề nghiệp | Cấu hình danh mục nghề nghiệp | Gốc STT[126]: pattern lặp CRUD danh mục |
| 171 | | **M13.F8.** ICD-9 | Cấu hình danh mục ICD-9 | Gốc STT[127]: pattern lặp CRUD danh mục |
| 172 | **M14.** Quản trị - Tra cứu log | **M14.F1.** Log thao tác | Xem log thao tác người dùng | Gốc STT[128]:<br>- MTNV: tra cứu lịch sử thao tác tác động tới dữ liệu hệ thống |
| 173 | | **M14.F2.** Log Delete | Xem log Delete | Gốc STT[129] |
| 174 | | **M14.F3.** Log Update | Xem log Update | Gốc STT[130] |
| 175 | | **M14.F4.** Log kết nối LIS | Xem log kết nối LIS | Gốc STT[131] |
| 176 | | **M14.F5.** Log kết nối PACS | Xem log kết nối PACS | Gốc STT[132] |
| 177 | | **M14.F6.** Log kết nối hóa đơn điện tử | Xem log kết nối HĐĐT | Gốc STT[133] |
| 178 | | **M14.F7.** Log đăng nhập | Xem log đăng nhập | Gốc STT[134] |
| 179 | | **M14.F8.** Log tra cổng BHYT | Xem log tra cổng BHYT | Gốc STT[135] |
| 180 | | **M14.F9.** Log ký số | Xem log ký số, hủy ký số | Gốc STT[136] |
| 181 | **M15.** Quản trị - Tra cứu thông tin BN | **M15.F1.** Tìm kiếm thông tin BN | Tìm kiếm thông tin BN | Gốc STT[137]:<br>- MTNV: cho phép quản trị tìm toàn bộ thông tin KCB của BN (theo ID, số hồ sơ, ngày sinh) |
| 182 | | **M15.F2.** Tra cứu lần đến khám | Xem các lần đến khám - điều trị | Gốc STT[138] |
| 183 | | **M15.F3.** Tra cứu chi tiết lần khám | Xem thông tin chi tiết các lần đến khám | Gốc STT[139]: tiếp nhận, khám chỉ định, chi phí, hóa đơn |
