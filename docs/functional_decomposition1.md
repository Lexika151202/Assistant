# Phân rã chức năng - Trạm Y Tế / HIS

> Nguồn: docs/Trạm Y Tế _ HIS - WBS.md
> Phân rã bởi AI theo tiêu chí 3 cấp: Module > Feature > Function

| STT | Module | Feature | Function | Note |
|-----|--------|---------|----------|------|
| 1 | **M1.** Tiếp đón - Tiếp nhận bệnh nhân | **M1.F1.** Giao diện tiếp đón BN | Tìm kiếm bệnh nhân | theo ID, SĐT, CCCD, thẻ BHYT; bao gồm tra cứu cổng BHYT cho BN lần đầu |
| 2 | | | Tạo mới đăng ký khám | bao gồm nhập TT BN/người thân/BHYT, lưu, sinh STT; load danh mục phường xã, nghề nghiệp, đối tượng, dân tộc, quốc tịch, PK, DVKT |
| 3 | | | In phiếu đăng ký khám | tách từ workflow tạo mới đăng ký khám |
| 4 | | | Xem danh sách phòng khám - phân luồng BN | hiển thị số lượng BN đang khám, chờ khám |
| 5 | | **M1.F2.** Danh sách đã tiếp đón | Xem danh sách BN đã tiếp đón | |
| 6 | | | Tìm kiếm BN đã tiếp đón | theo họ tên, giới tính, ngày sinh, số thẻ BH, điện thoại |
| 7 | | | In lại phiếu đăng ký khám | |
| 8 | | | Chỉnh sửa thông tin đăng ký | |
| 9 | | | Thực hiện chuyển phòng khám | khi đăng ký sai PK |
| 10 | | | Xóa thông tin đăng ký | khi đăng ký sai hoặc BN bỏ về |
| 11 | | **M1.F3.** Báo cáo tiếp đón | Xem báo cáo tiếp đón | |
| 12 | | | Lọc báo cáo tiếp đón theo tiêu chí | theo CCCD, BHYT, thời gian chờ BN |
| 13 | **M2.** Khám bệnh phòng khám | **M2.F1.** Danh sách chờ khám - đang khám | Xem danh sách chờ khám | |
| 14 | | | Xem danh sách đang khám | tách từ: "chờ khám - đang khám - đã khám" |
| 15 | | | Xem danh sách đã khám | tách từ: "chờ khám - đang khám - đã khám" |
| 16 | | | Thực hiện chọn BN để khám | |
| 17 | | **M2.F2.** Danh sách đợi khám ngoài PK | Xem danh sách chờ khám ngoài PK | BN ngồi ngoài nhìn được danh sách, xem sắp đến lượt |
| 18 | | | Thực hiện gọi loa BN vào PK | gọi họ tên, số thứ tự mời BN vào PK |
| 19 | | **M2.F3.** Cài đặt gói chỉ định template | Cấu hình gói dịch vụ chỉ định nhanh | tương tự cài đặt gói của tiếp đón |
| 20 | | **M2.F4.** Cài đặt sổ tay gõ tắt | Cấu hình từ điển gõ tắt theo user | nhập mã tắt → load text đã định nghĩa, phù hợp chuyên khoa bệnh thường gặp |
| 21 | | **M2.F5.** Cài đặt đơn thuốc mẫu template | Cấu hình đơn thuốc mẫu theo mã bệnh | giảm thao tác kê đơn lặp lại |
| 22 | | **M2.F6.** Giao diện khám bệnh | Xem thông tin chi tiết BN | |
| 23 | | | Xem lịch sử khám bệnh các lần trước | |
| 24 | | | Xem thông tin chi phí - tạm ứng | |
| 25 | | | Tạo mới phiếu khám bệnh | bao gồm nhập chẩn đoán sơ bộ/chính/kèm theo, sinh hiệu, nhập phiếu khám theo mẫu |
| 26 | | | Tạo mới chỉ định dịch vụ kỹ thuật | bao gồm chỉ định, ký số; XN, CĐHA-TDCN, PTTT |
| 27 | | | In phiếu chỉ định | tách từ workflow chỉ định DVKT |
| 28 | | | Kết nối LIS-PACS | kết nối hệ thống LIS-PACS |
| 29 | | | Xem kết quả CLS | BS lâm sàng xem kết quả để quyết định kê đơn/nhập viện/chuyển viện |
| 30 | | | Tạo mới đơn thuốc từ kho | bao gồm kê đơn, ký số |
| 31 | | | Tạo mới đơn thuốc từ tủ trực | bao gồm kê đơn, ký số |
| 32 | | | In đơn thuốc | tách từ workflow kê đơn |
| 33 | | | Tạo mới đơn thuốc mua ngoài | kê đơn cho BN tự ra ngoài mua |
| 34 | | | Thực hiện xử trí bệnh nhân | cho về, vào viện, chuyển viện; đồng thời chọn kết quả khám/điều trị |
| 35 | | | Tạo mới giấy vào viện | bao gồm lập, ký số |
| 36 | | | In giấy vào viện | tách từ workflow giấy vào viện |
| 37 | | | Tạo mới giấy chuyển tuyến | bao gồm lập, ký số, đẩy cổng BHYT |
| 38 | | | In giấy chuyển tuyến | tách từ workflow giấy chuyển tuyến |
| 39 | | | Tạo mới phiếu thủ thuật | bao gồm lập, nhập kết quả, ký số; phiếu thực hiện → tính tiền phụ cấp, đẩy cổng BHYT |
| 40 | | | In phiếu thủ thuật | tách từ workflow phiếu thủ thuật |
| 41 | | | Tải về tài liệu y số hóa | lưu giấy chuyển tuyến, cam kết chữ ký tươi, kết quả gửi khám dạng ảnh/PDF |
| 42 | | | Thực hiện chuyển khám | tách từ: "chuyển khám, đổi PK, trả về DS chờ, in giấy hẹn" |
| 43 | | | Thực hiện đổi phòng khám | tách từ: "chuyển khám, đổi PK, trả về DS chờ, in giấy hẹn" |
| 44 | | | Thực hiện trả BN về danh sách chờ | tách từ: "chuyển khám, đổi PK, trả về DS chờ, in giấy hẹn" |
| 45 | | | In giấy hẹn khám | tách từ: "chuyển khám, đổi PK, trả về DS chờ, in giấy hẹn" |
| 46 | | | Thực hiện kết thúc khám | bao gồm kết thúc, ký số XML, đẩy cổng BHYT |
| 47 | | | In bảng kê chi phí KCB | tách từ workflow kết thúc khám; in bảng kê ra kế toán thanh toán |
| 48 | | **M2.F7.** Tra cứu hồ sơ khám bệnh | Tìm kiếm BN đã khám | cho phép tìm lại thông tin BN đã đến khám |
| 49 | | **M2.F8.** Danh sách giấy chuyển tuyến | Xem danh sách giấy chuyển tuyến | |
| 50 | | | Tìm kiếm giấy chuyển tuyến | |
| 51 | | **M2.F9.** Trả kết quả khám sức khỏe | Tạo mới giấy KSK xin việc | bao gồm lập, ký số, đẩy cổng |
| 52 | | | Tạo mới giấy KSK lái xe | bao gồm lập, ký số, đẩy cổng |
| 53 | | | In giấy khám sức khỏe | tách từ workflow KSK |
| 54 | | **M2.F10.** Cấp giấy báo tử | Tạo mới giấy báo tử | bao gồm cấp, ký số, đẩy cổng; trường hợp BN tử vong |
| 55 | | | In giấy báo tử | tách từ workflow giấy báo tử |
| 56 | | **M2.F11.** Cấp giấy chứng nhận nghỉ ốm BHXH | Tạo mới giấy nghỉ ốm BHXH | BN đến khám được cấp giấy nghỉ ốm hưởng BHXH theo quy định |
| 57 | | | In giấy nghỉ ốm BHXH | |
| 58 | | **M2.F12.** Cấp giấy chứng nhận nghỉ dưỡng thai BHXH | Tạo mới giấy nghỉ dưỡng thai BHXH | BN khám thai được cấp giấy nghỉ theo quy định BHXH |
| 59 | | | In giấy nghỉ dưỡng thai BHXH | |
| 60 | | **M2.F13.** Báo cáo chuyên môn PK | Xem báo cáo danh sách khám bệnh theo thời gian | báo cáo chi tiết theo yêu cầu PK |
| 61 | | | Xem báo cáo hoạt động khám bệnh | |
| 62 | | **M2.F14.** Dự trù bổ sung thuốc tủ trực PK | Tạo mới phiếu dự trù bổ sung thuốc tủ trực | mỗi PK có tủ trực, khi hết thì dự trù bổ sung; PK cấp cứu, RHM, TMH |
| 63 | **M3.** Viện phí / BHYT | **M3.F1.** Thu tiền viện phí | Xem danh sách chờ thu viện phí | |
| 64 | | | Tìm kiếm BN cần thu tiền | |
| 65 | | | Xem thông tin chi tiết BN | |
| 66 | | | Xem bảng kê chi phí chi tiết BN | |
| 67 | | | Thực hiện thu tiền viện phí | hiển thị chi tiết số tiền, các mục cần thu |
| 68 | | | Kết nối in hóa đơn điện tử | |
| 69 | | **M3.F2.** Báo cáo thu tiền viện phí | Xem báo cáo danh sách thu tiền hàng ngày | |
| 70 | | **M3.F3.** Quản lý đẩy XML cổng BHYT | Tạo mới và đẩy file XML BHYT | bao gồm tạo, ký số, đẩy file XML; theo chuẩn 130/3176 |
| 71 | | | Thực hiện đẩy thủ công khi tự động lỗi | nếu đẩy tự động lỗi thì đẩy thủ công |
| 72 | | | Xem kiểm tra dữ liệu XML | check dữ liệu đúng/sai, chạy chuyên đề chống xuất toán BHYT |
| 73 | **M4.** Quản lý kho dược - Nghiệp vụ | **M4.F1.** Nhập hóa đơn | Xem danh sách hóa đơn đã nhập | |
| 74 | | | Lọc hóa đơn theo tiêu chí | loại nhập, nguồn nhập, ngày tháng |
| 75 | | | Tạo mới hóa đơn nhập | nhập đầy đủ thông tin theo hóa đơn thực tế |
| 76 | | | In phiếu nhập | tách từ: "In phiếu nhập, biên bản kiểm nhập" |
| 77 | | | In biên bản kiểm nhập | tách từ: "In phiếu nhập, biên bản kiểm nhập" |
| 78 | | **M4.F2.** Duyệt phiếu xuất khoa phòng | Duyệt phiếu xuất hao phí khoa phòng | duyệt phiếu xuất đi các khoa phòng |
| 79 | | **M4.F3.** Xuất kho khác | Thực hiện xuất kiểm nghiệm | tách từ: "Xuất kiểm nghiệm, hủy, chương trình, khác" |
| 80 | | | Thực hiện xuất hủy | tách từ: "Xuất kiểm nghiệm, hủy, chương trình, khác" |
| 81 | | | Thực hiện xuất chương trình | tách từ: "Xuất kiểm nghiệm, hủy, chương trình, khác" |
| 82 | | | Thực hiện xuất cho phân trạm trực thuộc | xuất cho phân trạm; tách từ: "xuất khác" |
| 83 | | **M4.F4.** Tồn kho hạn dùng chi tiết | Xem tồn kho chi tiết từng kho | thông tin thẻ kho, chờ xuất kho |
| 84 | | **M4.F5.** Tồn kho tổng đơn vị | Xem tồn kho tổng toàn đơn vị | sum tồn kho các kho + tủ trực |
| 85 | | **M4.F6.** Chờ nhận trả kho/tủ | Xem danh sách chờ nhận trả thuốc | khi có phiếu dự trù trả |
| 86 | | **M4.F7.** Phiếu trả nhà cung cấp | Tạo mới phiếu trả thuốc/vật tư cho NCC | quản lý xuất trả nhà cung cấp |
| 87 | | **M4.F8.** Liên thông đơn thuốc quốc gia | Kết nối liên thông đơn thuốc quốc gia | gửi sau khi kê đơn cho BN |
| 88 | **M5.** Quản lý kho dược - Danh mục | **M5.F1.** Hàng hóa vật tư | Xem danh sách hàng hóa | |
| 89 | | | Tạo mới hàng hóa | tách từ: "thêm mới, chỉnh sửa" |
| 90 | | | Chỉnh sửa hàng hóa | tách từ: "thêm mới, chỉnh sửa" |
| 91 | | **M5.F2.** Phân loại dược | Cấu hình danh mục phân loại dược | pattern lặp: CRUD danh mục |
| 92 | | **M5.F3.** Nhóm thuốc | Cấu hình danh mục nhóm thuốc | pattern lặp: CRUD danh mục |
| 93 | | **M5.F4.** Hoạt chất | Cấu hình danh mục hoạt chất | TT20, TT30, TT40; pattern lặp: CRUD danh mục |
| 94 | | **M5.F5.** Đường dùng | Cấu hình danh mục đường dùng | pattern lặp: CRUD danh mục |
| 95 | | **M5.F6.** Cảnh báo kết quả CLS | Cấu hình cảnh báo thuốc theo kết quả CLS | |
| 96 | | **M5.F7.** Chỉ định / Chống chỉ định | Cấu hình chống chỉ định thuốc | |
| 97 | | **M5.F8.** Tương tác thuốc | Cấu hình tương tác thuốc | |
| 98 | | **M5.F9.** Hãng sản xuất | Cấu hình danh mục hãng sản xuất | pattern lặp: CRUD danh mục |
| 99 | | **M5.F10.** Nhà cung cấp | Cấu hình danh mục nhà cung cấp | pattern lặp: CRUD danh mục |
| 100 | | **M5.F11.** Quốc gia | Cấu hình danh mục quốc gia | pattern lặp: CRUD danh mục |
| 101 | | **M5.F12.** Nguồn nhập | Cấu hình danh mục nguồn nhập | pattern lặp: CRUD danh mục |
| 102 | | **M5.F13.** Loại nhập | Cấu hình danh mục loại nhập | pattern lặp: CRUD danh mục |
| 103 | | **M5.F14.** Loại kê đơn | Cấu hình danh mục loại kê đơn | pattern lặp: CRUD danh mục |
| 104 | | **M5.F15.** Thuốc mua ngoài | Cấu hình danh mục thuốc mua ngoài | dùng cho tab thuốc mua ngoài |
| 105 | | **M5.F16.** Thuốc gốc | Cấu hình danh mục thuốc vật tư gốc | |
| 106 | **M6.** Quản lý kho dược - Báo cáo | **M6.F1.** Báo cáo dược | Xem báo cáo nhập xuất tồn | tách từ: "Các báo cáo dược" |
| 107 | | | Xem báo cáo nhập kho | tách từ: "Các báo cáo dược" |
| 108 | | | Xem báo cáo xuất kho | tách từ: "Các báo cáo dược" |
| 109 | | | Xem báo cáo nhập theo nhà cung cấp | tách từ: "Các báo cáo dược" |
| 110 | | | Xem báo cáo nhập theo hóa đơn | tách từ: "Các báo cáo dược" |
| 111 | | | Xem báo cáo xuất theo kho/khoa/phòng/nhóm | tách từ: "Các báo cáo dược" |
| 112 | | | Xem báo cáo trả thuốc | tách từ: "Các báo cáo dược" |
| 113 | | | Xem báo cáo kiểm kê | tách từ: "Các báo cáo dược" |
| 114 | **M7.** Quản lý kho dược - Cài đặt | **M7.F1.** Thành viên kiểm nhập - kiểm kê | Cấu hình thành viên kiểm nhập kiểm kê | thủ kho, kế toán trưởng, lãnh đạo BV |
| 115 | | **M7.F2.** Cấu hình phiếu | Cấu hình loại phiếu in cho từng chức năng | report động cho phiếu in - chưa cần thiết |
| 116 | | **M7.F3.** Ánh xạ danh mục dược quốc gia | Cấu hình ánh xạ danh mục thuốc với cổng Dược quốc gia | |
| 117 | | **M7.F4.** Tài khoản dược quốc gia | Cấu hình tài khoản gửi đơn thuốc quốc gia | cấu hình tài khoản của đơn vị |
| 118 | **M8.** Quản lý kho dược - Phòng khám | **M8.F1.** Duyệt đơn | Xem danh sách đơn thuốc | |
| 119 | | | Lọc đơn thuốc theo tình trạng | chưa phát, đã phát, theo ngày tháng |
| 120 | | | Thực hiện phát thuốc cho BN | |
| 121 | | | Thực hiện hủy phát thuốc | |
| 122 | | **M8.F2.** Nhật ký phát thuốc | Xem lịch sử phát thuốc | |
| 123 | **M9.** Quản lý kho dược - Tủ trực | **M9.F1.** Bổ sung cơ số tủ trực | Tạo mới phiếu bổ sung CSTT | |
| 124 | | **M9.F2.** Duyệt phiếu bổ sung CSTT | Duyệt phiếu yêu cầu từ khoa phòng | |
| 125 | | **M9.F3.** Hoàn trả cơ số tủ trực | Tạo mới phiếu hoàn trả | |
| 126 | | **M9.F4.** Duyệt phiếu hoàn trả CSTT | Duyệt phiếu hoàn trả | |
| 127 | | **M9.F5.** Thu hồi cơ số tủ trực | Tạo mới phiếu thu hồi cơ số | |
| 128 | | **M9.F6.** Xem cơ số tủ trực | Xem cơ số tủ trực | |
| 129 | | **M9.F7.** Bù cơ số tủ trực | Duyệt bù cơ số | |
