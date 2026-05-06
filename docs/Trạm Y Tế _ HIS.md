
# Sheet: MVP feature

| STT | Module | Chức năng chính | Chức năng chi tiết | Mô tả nghiệp vụ | Q&A - Câu hỏi/ Note | Trả lời | Ghi chú |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1.Module Tiếp đón - tiếp nhận bệnh nhân | 1.3.Giao diện tiếp đón BN | Load các danh mục | Load các danh mục theo qui định (Phường xã, nghề nghiệp, đối tượng, dân tộc, quốc tịch…), các danh mục của đơn vị (phòng khám, dịch vụ kỹ thuật, tên nhân viên ….) |  |  |  |
| 2 |  |  | Tìm kiếm thông tin BN theo các tiêu chí: id, số đt, cccd, thẻ bhyt | Với các BN cũ đã đến khám thì có thể tìm kiếm theo nhiều thông tin có sẵn : Số đt, cccd, thẻ BHYT… Với BN lần đầu đến có thể tra cứu thông tin theo thẻ BHYT, CCCD trên cổng BHYT |  |  |  |
| 3 |  |  | Nhập các thông tin của BN, thông tin người thân, thông tin BHYT, thông tin đăng ký khám… | Có các input (combobox, textbox ….) để chọn, nhập liệu |  |  |  |
| 4 |  |  | Lưu thông tin đăng ký khám, sinh số thứ tự chờ khám => BN vào PK nào, kiểu khám là gì, cách dịch vụ đi kèm, in phiếu khám | Lưu thông tin vào bảng đăng ký khám, lưu vào hàng đợi khám của phòng khám. |  | Chỗ này chọn phòng khám để khám, kiểu khám là gì (khám nội, khám sản, khám răng hàm mặt ...) thì nó sẽ tính tiền khám đó luôn. Chưa kể nếu khám sức khỏe thì nó sẽ có nhiều cái để tính tiền: khám, xét nghiệm, siêu âm, xquang .. | Chức năng lớn, đòng thời tính tiền khám bệnh, có thể sinh QR thanh toán ko dùng tiền mặt. Đồng thời đẩy bảng xml Checkin lên cổng BHYT… |
| 5 |  |  | Danh sách phòng khám - số lượng BN đang khám, chờ khám để phân luồng BN |  |  |  |  |
| 6 |  |  | In phiếu đăng ký khám bệnh | Sau khi lưu thông tin đk khám => in phiếu khám (sau nếu có App BN, sms, zalo oa thì sẽ báo về đt của BN thì ko cần in..) | đã có chức năng In nhưng chưa có template tham khảo phiếu in |  |  |
| 7 |  | 1.4.Danh sách đã tiếp đón | Bộ lọc tìm kiếm (tìm kiếm BN theo các thông tin: họ tên, giới tính, ngày sinh, sô thẻ bh, điện thoại …) | Các chức năng trong danh sách BN đã đăng ký, đã tiếp đón xong |  |  |  |
| 8 |  |  | Chức năng in lại phiếu đăng ký khám |  |  |  |  |
| 9 |  |  | Chỉnh sửa lại thông tin đăng ký |  |  |  |  |
| 10 |  |  | Chuyển phòng khám (khi đăng ký sai). |  | có phải là 1 dạng update thông tin không? (Ô C15 là tính năng chỉnh sửa lại thông tin, 2 yêu cầu này có giống nhau không?) | Chỉnh sửa các thông tin về BN, thông tin hc, thẻ bh, nghề nghiệp ..., nơi giới thiệu.. Còn chức năng chuyển phòng khám, chuyển công khám sẽ phải tính lại tiền, mã dịch vụ ... |  |
| 11 |  |  | Xóa thông tin đăng ký sai hoặc BN bỏ về. |  |  |  |  |
| 12 |  | 1.6.Các báo cáo tiếp đón | Các báo cáo của phòng tiếp đón(danh sách tiếp đón theo các tiêu chí: CCCD, BHYT …). <br>Thời gian chờ của BN (Báo cáo thời gian chờ) |  | Khảo sát trực tiếp |  |  |
| 13 | 2.Module Khám bệnh phòng khám | 2.1.Danh sách chờ khám - đang khám - đợi khám | Hiển thị danh sách đang chờ khám - đang khám, đã khám tại pk để bs chọn BN. |  |  |  |  |
| 14 |  | 2.2.View danh sách đợi khám ở ngoài pk, chức năng gọi BN vào PK | Hiển thị danh sách chờ khám ở ngoài PK, chức năng gọi loa cho BN vào PK. | BN ngồi chờ ở ngoài PK có thể nhìn thấy danh sách đang chờ khám, xem sắp đến lượt mình chưa. Chức năng gọi loa có thể gọi họ tên BN, số thứ tự để mời BN vào PK.<br><br>TH1: Nếu TYT đã có màn hình thì sử dụng<br>TH2: TYT ko có thiết bị > chỉ hiển thị cho nhân viên tiếp đón để họ gọi thủ công (Có số đang khám - số chờ và số đến lượt) |  |  |  |
| 15 |  | 2.3.Cài đặt Gói chỉ định template | Cài đặt các gói dịch vụ để chỉ định cho nhanh | Tương tự như cài đặt gói của tiếp đón<br><br>(Tham khảo cài đặt đơn thuốc mẫu) |  |  |  |
| 16 |  | 2.4.Cài đặt sổ tay gõ tắt | Cài đặt từ điển gõ tắt cho từng user giúp cho việc nhập liệu nhanh và dễ dàng hơn. | Ví dụ cài sổ tay gõ tắt: BNVP (bệnh nhân viêm phổi) với nội dung: BN ho và sốt, thở khò khè ….. Khi người dùng nhập BNVP thì tự động sẽ load ra text mình đã định nghĩa. Phù hợp với các chuyên khoa có các bệnh thường gặp. => thao tác nhanh hơn<br><br>1. Từ điển dùng chung toàn ĐV <br>2. Từ điển cá nhân |  |  |  |
| 17 |  | 2.5.Cài đặt đơn thuốc mẫu template | Cài đặt đơn thuốc mẫu | Cài đơn mẫu theo mã bệnh để đỡ phải thao tác nhiều. | Cần những thông tin gì để cấu hình? | Để có được đơn mẫu này thì phải có danh mục thuốc, tồn thực tế tại kho. Nếu khi thay đổi thầu, hết thuốc thì đơn thuốc mẫu cũng phải sửa lại .... cũng khá phức tạp. |  |
| 18 |  | 2.6.Giao diện khám bệnh | Hiển thị thông tin chi tiết của BN, của lần đến khám này |  |  |  |  |
| 19 |  |  | Lịch sử khám bệnh của các lần trước. |  |  |  |  |
| 20 |  |  | Thông tin chi phí - tạm ứng … của lần khám | Tính tiền của tiền công khám tổng quát, chỉ định dvkt -> Cần tạm ứng bnhieu và chi trả còn lại bao nhiêu<br>View màn hình tổng quát cho bác sĩ | Cần thông tin cấu hình chi phí thuốc, dịch vụ,... | cho BS hay người dùng có thể nhìn thấy tổng quát chi phí của Bn đang hết bao nhiêu tiền, từ đó cảnh báo BN vượt số tiền tạm ứng cần tạm ứng thêm hoặc là đi thanh toán ... |  |
| 21 |  |  | Nhập các thông tin khám bệnh tổng quát: Chẩn đoán sơ bộ, chẩn đoán chính, chẩn đoán kèm theo, thông tin về sinh hiệu (mạch, huyết áp, nhiệt độ …) | Nhập liệu đầu vào |  |  |  |
| 22 |  |  | Phiếu khám bệnh | Nhập các thông tin của phiếu khám bệnh (theo mẫu) |  |  |  |
| 23 |  |  | Chỉ định dịch vụ kỹ thuật | BS chỉ định các dịch vụ cho BN đi làm(XN, CĐHA - TDCN, PTTT …), in phiếu chỉ định, ký số | Đã có form chỉ định, nhưng chưa có thông tin cấu hình để lựa chọn chỉ định | Để chỉ định được Dịch vụ kỹ thuật thì cần có danh mục DVKT, cấu hình giá của DVKT,. Cấu hình giá của DVKT thì còn theo đối tượng, theo ngày hiệu lực. | Chức năng lớn, tính tiền, đẩy chi phí phát sinh lên cổng. |
| 24 |  |  | Kết nối LIS-PACS | Kết nối tới hệ thống LIS-PACS<br>Nên có giao diện/ thao tác đẩy lại chỉ định (TH đẩy lỗi) |  |  | Kết nối lis-pacs (cũng nhiều thông tin, nhiều API cần làm). |
| 25 |  |  | Xem kết quả CLS (Kết quả LIS-PACS) | Màn hình cho BS lâm sàng xem kq CLS để có thể ra quyết định tiếp theo là Kê đơn cho về hay nhập viện - hay Chuyển tiện. |  |  |  |
| 26 |  |  | Kê đơn thuốc từ kho, tủ trực. | Màn hình kê đơn cho BN từ tòn kho của đơn vị, in đơn, ký số | Đã có form kê đơn thuốc, nhưng chưa có thông tin cấu hình thuốc để lựa chọn kê đơn | Để kê đơn được thì 1 là cần danh mục thuốc, 2 là thuốc phải còn tồn trong kho, mà cái này thì phải áp dụng các qui tắc nhập xuất, trừ tồn ảo(tồn khả dụng) | Chức năng lớn, tính tiền, trừ tồn khả dụng, đẩy thông tin vào module Dược để chờ cấp phát, đẩy đơn thuốc quốc gia … |
| 27 |  |  | Kê đơn thuốc mua ngoài | Tương tự như kê đơn thuốc từ kho, nhưng khác là kê đơn cho BN tự ra ngoài mua. |  |  | Tương tự như kê đơn ở 2 phần trên. Có khác là không có kho, ko có danh mục, mà người dùng phải tự gõ danh mục, hoặc import danh mục từ cổng Dược Quốc Gia |
| 28 |  |  | Xử trí BN | Xử trí cho BN: vào viện, chuyển viện, cấp đơn cho về. Đồng thời chọn cả kết quả khám/điều trị | chưa có mẫu in tham khảo | không cần mẫu | Chỉ là list để chọn |
| 29 |  |  | Lập giấy vào viện | tạo, in phiếu khám vào viện cho BN, ký số | chưa có mẫu nhập liệu tham khảo | Mẫu giấy theo thông tư. | Xác định thông tư |
| 30 |  |  | Lập giấy chuyển tuyến | Nhập các thông tin chuyển viện, in giấy chuyển viện, ký số, đẩy cổng BHYT. | chưa có mẫu nhập liiệu tham khảo | Mẫu giấy chuyển viện theo thông tư |  |
| 31 |  |  |  | Đẩy cổng BHYT | Tham khảo trên mẫu tờ khai | Tương tác API vs cổng BHYT |  |
| 32 |  |  | Lập, nhập, in các phiếu thủ thuật | Ngoài các loại CLS (xn, cđha-tdcn) đã có kết nối lis-pacs thì các thủ thuật khác cũng cần phải có phiếu thực hiện (để có thông tin người thực hiện => đẩy cổng BHYT, đồng thời tính tiền phụ cấp …), in các phiếu thực hiện thủ thuật, ký số. |  |  | Cần đẩy cổng BHYT<br>Kỹ thuật viện: Người thực hiện<br>Kỹ thuật viện, điều dưỡng: Nhập dữ liệu |
| 33 |  |  | Tải lên các giấy tờ, phiếu y số hóa (ví dụ giấy chuyển tuyến, giấy cam kết có chữ ký tươi của BN, kết quả gửi khám từ nơi khác gửi về ...) | Cho phép lưu các loại giấy tờ khác vào pm (dạng ảnh hoặc pdf….) |  |  | Ngoài các dữ liệu nhập tay, in, ký số có 1 số giấy tờ ngoài (Cần đính kèm vào bệnh án), Cần chức năng import lưu vào HT bệnh án chung của BN<br>Chức năng độc lập |
| 34 |  |  | Các chức năng khác: chuyển khám, đổi phòng khám, trả về danh sách chờ, in giấy hẹn khám … | chuyển khám | Khi chọn các 'chuyển khám, đổi phòng khám, trả về danh sách chờ', hệ thống sẽ mở ra một giao diện mới để nhập liệu thêm (ví dụ: chọn phòng khám mới, lý do chuyển), hay là đóng hồ sơ hiện tại và đẩy tên bệnh nhân sang một danh sách quản lý khác ạ? | Mở 1 giao diện phụ trên giao diện chính của mành hình khám bệnh để thao tác và nhập liệu. Vẫn thao tác trên hồ sơ này và chưa có đóng hồ sơ (vì đã kết thúc khám đâu nên chưa đóng hồ sơ) | chuyển khám sang phòng B: giá = giá gốc * 30%<br>"Mỗi PK đều có 1 danh sách chờ khám, đã khám<br>Giá khám tất cả bằng nhau<br>Chuyển khám: 30% so với giá gốc<br>Đổi phòng khám: Ko thay đổi, ko tính thêm" |
| 35 |  |  |  | đổi phòng khám |  |  |  |
| 36 |  |  |  | trả về danh sách chờ |  |  |  |
| 37 |  |  |  | in giấy hẹn khám |  |  |  |
| 38 |  |  | Kết thúc khám, in bảng kê chi phí KCB, ký số xml, đẩy cổng BHYT | In bảng kê để ra kế toán thanh toán, ký số bảng kê.(Tiền khám, tiền CLS, tiền thủ thuật,....) |  |  | Ở bước này Hệ thống tự động tạo file xml theo chuẩ, sau đó ký số và đẩy file XML lên cổng BHYT, còn ở module quản lý bảo hiểm sẽ có theo dõi và đẩy thủ công riêng trong trường hợp cần đẩy lại hoặc là đẩy tự động bị lỗi. |
| 39 |  | 2.7.Tra cứu - tìm kiếm hồ sơ khám bệnh | Chức năng tìm kiếm bệnh nhân đã khám. | Cho phép người dùng tìm kiếm lại thông tin BN đã đến khám. |  |  |  |
| 40 |  | 2.8.Danh sách giấy chuyển tuyến | Tra cứu, tìm kiếm, xem, đẩy cỏng, in lại phiếu chuyển viện. |  | User có cần xuất file Excel danh sách để báo cáo định kì cho SYT/ BHYT không ạ? | Thường thì ko cần báo cáo SYT, chủ yếu là đơn vị theo dõi báo cáo chuyên môn, xem có chuyển viện nhiều không? |  |
| 41 |  | 2.9.Trả kết quả khám sức khỏe. | Cho phép in giấy khám sức khỏe xin việc, khám sức khỏe lái xe, ký số, đẩy cổng. |  | Kết quả cuối lấy tự động từ chức năng khác hay user sẽ tự gõ lại ạ?<br>Quy trình đẩy cổng là đẩy ngay khi ký số xong hay đợi cuối ngày gom lại đẩy một loạt ạ? | Khám sức khỏe thì sẽ có nhiều mục, nhiều chuyên khoa kết hợp với nhau, mỗi chuyên khoa sẽ khám-làm phần việc của mình, ký các kết quả mà mình chịu trách nhiệm. Ở bước cuối cùng mới đẩy dữ liệu tổng thể của lần khám sức khỏe lái xe này lên cổng. |  |
| 42 |  | 2.10. Cấp giấy báo tử | Trường hợp BN tử vong, cho phép cấp giấy báo tử, ký số, đẩy cổng. |  |  |  |  |
| 43 |  | 2.11. Cấp giấy chứng nhận nghỉ ốm theo BHXH | BN đến khám được cấp giấy nghỉ ốm hưởng BHXH theo qui định. |  |  |  |  |
| 44 |  | 2.12. Cấp giấy chứng nhận nghỉ dưỡng thai theo BHXH. | Bệnh nhân đến khám thai được cấp giấy nghỉ đúng theo qui định của BHXH. |  |  |  |  |
| 45 |  | 2.13. Các báo cáo chuyên môn của PK. | Thiết kế các báo cáo chi tiết theo yêu cầu của PK: Danh sách khám bệnh theo thời gian, hoạt động khám bệnh…. |  |  |  |  |
| 46 |  | 2.14. Dụ trù bổ xung thuốc - tủ trực cho PK. | Chức năng tạo phiếu dự trù bổ sung thuốc lấy từ kho dược về cho tủ trực của PK. | Mỗi 1 PK đều có tủ trực để dùng trong các trường hợp khác nhau, nhất là pk cấp cứu, hoặc là phòng khám nào thực hiện thủ thuật (răng hàm mặt, tai mũi họng..). Khi nào tủ trực hết thì sẽ dự trù bổ xung. Còn với loại nào lĩnh bù thì đã lĩnh bù thuốc.<br><br>+ tồn vào tủ thuốc dự trù<br>Chức năng dành riêng cho PK, ko liên quan đến thuốc kê cho BN<br>Tạo phiếu, form input, in phiếu dữ trù -> Gửi khoa Dược duyệt(Hàng đợi phát thuốc + vào kho PK (Tủ trực) - Kho Dược) | Về quy trình Dự trù bổ sung tủ trực, em hiểu đây là nguồn thuốc phục vụ tại chỗ (làm thủ thuật, cấp cứu) chứ không phải thuốc để kê đơn về phải không ạ?<br>Nếu vậy, khi Bác sĩ thực hiện chỉ định, HT sẽ cần phân biệt giữa thuốc dùng tại chỗ (Trừ kho tủ thuốc) và thuốc kê đơn (Bên ngoài)? Việc tính tiền trong phiếu sẽ được hiển thị như thế nào ạ do 1 số thuốc sẽ đi kèm phí thủ thuật hoặc tính phí riêng ạ? |  |  |
| 47 |  |  | Chức năng trả thuốc về cho kho |  |  |  |  |
| 48 | 3.Module Viện phí/BHYT | 3.1.Màn hình thu tiền viện phí | Bộ lọc tìm kiếm danh sách BN để thu. |  |  |  |  |
| 49 |  |  | Danh sách chờ thu viện phí | Cho phép tìm kiếm BN cần thu tiền viện phí (được tạo từ bước kết thúc khám bệnh) |  |  |  |
| 50 |  |  | Thông tin chi tiết BN | Hiển thị danh sách chờ thu tiền viện phí |  |  |  |
| 51 |  |  | Thông tin chi phí chi tiết của BN, bảng kê thanh toán của BN | Tính tiền tổng, công thức tính, in được HĐ điện tử cho BN |  |  |  |
| 52 |  |  | Lưu thông tin và thu tiền viện phí | Hiển thị chi tiết số tiền, các mục cần phải thu của BN<br>View tổng quát |  |  |  |
| 53 |  |  | Kết nối - in hóa đơn điện tử | API |  |  |  |
| 54 |  | 3.2.Báo cáo danh sách thu tiền viện phi | Danh sách thu tiền viện phí hàng ngày. | Thu thập mẫu báo cáo |  |  |  |
| 55 |  | 3.3.Quản lý tạo, ký số, đẩy file xml lên cổng | Quản lý việc tạo, ký số, đẩy file xml lên cổng BHYT theo chuẩn 130 (chuẩn xml mới nhất là 3176) | Màn hình theo dõi việc đẩy cổng BHYT, nếu chức năng đẩy tự động lỗi thì có thể đẩy thủ công. Check dữ liệu đúng hay sai, chạy các chuyên đề để chống xuất toán BHYT |  |  |  |
| 56 | 4.1 Module Quản lý kho dược - Nghiệp vụ | 4.1.1. Nhập hóa đơn | Danh sách hóa đơn đã nhập(có bộ lọc loại nhập, nguồn nhập, ngày tháng năm) | Màn hình chung quản lý việc nhập thuốc vào kho từ hóa đơn - chứng từ của nhà cung cấp, cùng với các chức năng tìm kiếm, in các phiếu liên quan |  |  |  |
| 57 |  |  | Nhập hóa đơn mới bao gồm đầy đủ các trường thông tin trên hóa đơn thực tế |  |  |  |  |
| 58 |  |  | In phiếu nhập, biên bản kiêm nhập |  |  |  |  |
| 59 |  | 4.1.2. Duyệt phiếu xuất khoa - phòng | Kiểm duyệt phiếu xuất hao phí khoa phòng | Duyệt phiếu xuất đi các khoa - phòng<br>Nhận phiếu chờ từ PK -> Duyệt -> update số lượng <br>(Hết hạn, nhập - xuất) |  |  |  |
| 60 |  | 4.1.3. Xuất kiểm nghiệm, xuất hủy, xuất chương trình, xuất khác | Các hình thức xuất của kho Dược. | Các chức năng xuất khác của kho (xuất hủy, xuất thanh lý, xuất cho phân trạm trực thuộc ..)<br>Tạo phiếu xuất hủy, thanh lý -> Lưu lại -> Trừ tồn, In phiếu -> In để ký xác nhận |  |  |  |
| 61 |  | 4.1.4. Tồn kho hạn dùng chi tiết của từng kho. | Chức năng hiển thị tồn kho của các thuốc, thông tin thẻ kho, thông tin chờ xuất kho | Chức năng hiển thị tồn kho của các thuốc, thông tin thẻ kho, thông tin chờ xuất kho |  |  |  |
| 62 |  | 4.1.5. Tồn kho full của đơn vị. | Sum tồn kho các kho, các tủ trực của toàn đơn vị. | Chức năng xem tồn tổng của đơn vị. |  |  |  |
| 63 |  | 4.1.6. Chờ nhận trả kho/tủ | Danh sách chờ nhận trả lại thuốc của kho/tủ | Danh sách chờ nhận trả lại thuốc của kho/tủ khi có phiếu dự trù trả |  |  |  |
| 64 |  | 4.1.7. Phiếu trả nhà cung cấp | Thực hiện lập phiếu trả thuốc - vật tư cho nhà cung cấp | Màn hình quản lý việc tạo phiếu xuất trả nhà cung cấp |  |  |  |
| 65 |  | 4.1.8. Liên thông đơn thuốc quốc gia | Gửi dữ liệu liên thông quốc gia | Quản lý việc gửi dữ liệu liên thông quốc gia sau khi kê đơn cho BN |  |  |  |
| 66 | 4.2 Module Quản lý kho dược - Danh mục | 4.2.1 Hàng hóa vật tư | Danh sách hàng hóa, có chức năng thêm mới chỉnh sửa<br>Import từ Excel | Các màn hình quản lý các loại danh mục trong hệ thống (CRUD) |  |  |  |
| 67 |  | 4.2.2 Phân loại dược | Danh mục phân loại dược dùng cho cấu hình danh mục thuốc<br>2 nhóm: Bù được và Bổ sung |  |  |  |  |
| 68 |  | 4.2.3. Nhóm thuốc | Danh mục nhóm thuốc dược dùng cho cấu hình danh mục thuốc |  |  |  |  |
| 69 |  | 4.2.4. Hoạt chất (TT20, TT30, TT40) | Danh mục hoạt chât dược dùng cho cấu hình danh mục thuốc |  |  |  |  |
| 70 |  | 4.2.5. Đường dùng | Danh mục đường dùng dược dùng cho cấu hình danh mục thuốc |  |  |  |  |
| 71 |  | 4.2.6. Cảnh báo kết quả cls | Cấu hình cảnh báo thuốc dựa trên kết quả cls |  |  |  |  |
| 72 |  | 4.2.7. Chỉ định/ chống chỉ định | Cấu hình chống chỉ định/ chỉ định thuốc |  |  |  |  |
| 73 |  | 4.2.8. Tương tác thuốc | Cấu hình tương tác thuốc |  |  |  |  |
| 74 |  | 4.2.9. Hãng sản xuất | Danh mục hãng sản xuất dùng cho cấu hình danh mục thuốc |  |  |  |  |
| 75 |  | 4.2.10. Nhà cung cấp | Danh mục nhà cung cấp dùng cho cấu hình danh mục thuốc |  |  |  |  |
| 76 |  | 4.2.11. Quốc gia | Danh mục quốc gia dùng cho cấu hình danh mục thuốc |  |  |  |  |
| 77 |  | 4.2.12. Nguồn nhập | Danh mục Nguồn nhập dùng cho cấu hình danh mục thuốc |  |  |  |  |
| 78 |  | 4.2.13. Loại nhập | Danh mục loại nhập dùng cho cấu hình danh mục thuốc |  |  |  |  |
| 79 |  | 4.2.14. Loại kê đơn | Danh mục loại kê đơn dùng cho cấu hình danh mục thuốc |  |  |  |  |
| 80 |  | 4.2.15. Danh mục thuốc mua ngoài | Danh mục thuốc mua ngoài dùng để kê cho tab thuốc mua ngoài |  |  |  |  |
| 81 |  | 4.2.16. Danh mục thuốc gốc | Danh mục thuốc - vật tư gốc. |  |  |  |  |
| 82 | 4.3 Module Quản lý kho dược - Báo cáo | 4.3.1. => 4.3.n ... Các báo cáo của quản lý do Dược(Nhập xuất tồn, báo cáo nhập, báo cáo xuất, báo cáo nhập theo nhà cung cấp, theo hóa đơn, báo cáo xuất theo kho-khoa-phòng-theo nhóm ... báo cáo trả thuốc ...) | Bao gồm các báo cáo dược (Nhập xuất tồn, nhập kho, kiểm kê, Thẻ kho, nhập - xuất theo KP,....) | Tất cả cá báo cáo của kho Dược về chuyên môn cũng như về nhập xuất tồn cũng rất nhiều<br>Xin mẫu và est lại thời gian |  |  |  |
| 83 | 4.4 Module Quản lý kho dược - Cài đặt | 4.4.1. Thành viên kiểm nhập - kiểm kê | Cấu hình thành viên cho biên bản kiểm nhập kiểm kê | Cấu hình các thành viên cho biên bản kiểm nhập (thủ kho, kế toán trưởng, lãnh đạo bv..) |  |  |  |
| 84 |  | 4.4.2. Cấu hình phiếu | Cấu hình loại phiếu in cho từng chức năng | Chức năng cấu hình report động cho các phiếu in - Chưa cần thiết |  |  |  |
| 85 |  | 4.4.3. Ánh xạ danh mục dược quốc gia | Mapping danh mục thuốc tại đơn vị với cổng Dược quốc gia | Ánh xạ giữa danh mục đang sử dụng tại bv và danh mục của Dược quốc gia<br>Mapping giữa mã và tên thuốc trên cổng Dược QG |  |  |  |
| 86 |  | 4.4.4. Tài khoản dược quốc gia | Cấu hình tài khoản gửi đơn thuốc quốc gia | Cấu hình tài khoản gửi đơn thuốc quốc gia của đơn vị<br>Mã ĐV / Mã Trạm/ User/ Pass |  |  |  |
| 87 | 4.5 Module Quản lý kho dược - Phòng Khám | 4.5.1. Duyệt đơn | Giao diện duyệt đơn thuốc thuốc đã kê ở PK để phát thuốc cho BN | Cho phép lọc đơn, tình trạng đơn chưa phát đã phát theo ngày tháng, chức năng phát thuốc, hủy phát thuốc |  |  |  |
| 88 |  | 4.5.2. Nhật ký phát thuốc | Lịch sử phát thuốc của kho | Lịch sử phát thuốc của kho |  |  |  |
| 89 | 4.6. Module Quản lý kho dược - Tủ trực | 4.6.1. Bổ sung cơ số tủ trực | Tạo phiếu bổ sung CSTT | Nghiệp vụ cơ bản các chức năng dành cho tủ trực <br>Bù ngay khi đã sử dụng cho BN |  |  |  |
| 90 |  | 4.6.2. Duyệt phiếu bổ sung CSTT | Duyệt phiếu yếu cầu từ khoa-phòng |  |  |  |  |
| 91 |  | 4.6.3. Hoàn trả cơ số tủ trực | Tạo phiếu hoàn trả thuốc |  |  |  |  |
| 92 |  | 4.6.4 Duyệt phiếu hoàn trả CSTT | Duyệt phiếu hoàn trả |  |  |  |  |
| 93 |  | 4.6.5. Thu hồi cơ số tủ trực | Tạo phiếu thu hồi cơ số |  |  |  |  |
| 94 |  | 4.6.6. Cơ số tủ trực | Xem cơ số tủ trực (xem chi tiết thông tin tủ trực) |  |  |  |  |
| 95 |  | 4.6.7. Bù cơ số tủ trực | Duyệt bù cơ số |  |  |  |  |
| 96 | 5.1 Module Quản trị - Danh mục | 5.1.1. Thông tin cơ sở | Thông tin: tên đơn vị, địa chỉ, logo, số đt, giám đốc | Thông tin danh mục |  |  |  |
| 97 |  | 5.1.2.Danh mục nhóm dịch vụ | Quản lý thông tin nhóm dịch vụ (khám, xn, siêu âm, xquang ...) |  |  |  |  |
| 98 |  | 5.1.3.Quản lý danh mục Dịch vụ kỹ thuật - Giá dịch vụ kỹ thuật (theo thời gian, theo đối tượng) | Quản lý danh mục dvkt, thông tin giá của dvkt theo từng giai đoạn, theo từng đối tượng BN | Quản lý danh mục dvkt, thông tin giá của dvkt theo từng giai đoạn, theo từng đối tượng BN<br><br>Hỗ trợ quản lý và lưu thông tin |  |  |  |
| 99 |  | 5.1.4.Quản lý danh mục khoa | Quản lý danh mục khoa |  |  |  |  |
| 100 |  | 5.1.5.Quản lý danh mục phòng | Quản lý danh mục phòng |  |  |  |  |
| 101 |  | 5.1.6.Quản lý danh mục giường bệnh | Quản lý danh mục giường bệnh |  |  |  |  |
| 102 |  | 5.1.7.Quản lý danh mục đối tượng | Quản lý danh mục đối tượng |  |  |  |  |
| 103 |  | 5.1.8.Quản lý, cấu hình phân hệ-menu | Quản lý, cấu hình phân hệ-menu | Quản lý và phân quyền nhân viên theo menu, theo khoa - phòng |  |  |  |
| 104 |  | 5.1.9.Quản lý danh mục nhân viên, phân quyền nhân viên theo khoa - phòng, theo phân hệ-menu | Quản lý danh mục nhân viên, phân quyền nhân viên theo khoa - phòng, theo phân hệ-menu |  |  |  |  |
| 105 |  | 5.1.10.Quản lý danh mục máy thực hiện | Quản lý danh mục máy thực hiện | Danh mục các loại máy CLS, máy thực hiện PTTT |  |  |  |
| 106 |  | 5.1.11.Danh mục mã Modality cho PACS | Danh mục mã Modality cho PACS | Các loại Modality gửi sang PACS(ví dụ DX là Xquang, US là siêu âm ...) |  |  |  |
| 107 |  | 5.1.12.Danh mục chỉ số Xét nghiệm. | Quản lý danh mục chỉ số XN. | Danh mục chỉ số XN để map với LIS, khi LIS trả về thì khớp kết quả và còn đẩy cổng theo mã chỉ số ... |  |  |  |
| 108 | 5.2. Module Quản trị - Quản lý-cài đặt tham số | 5.2.1.Cấu hình định mức BHYT | Cấu hình định mức BHYT | Mức hưởng tối đa BHYT(theo số tháng lương, lương tối thiểu là bao nhiêu) |  |  |  |
| 109 |  | 5.2.2.Cấu hình mức hưởng BHYT theo thẻ, theo tuyến | Cấu hình mức hưởng BHYT | Mức hưởng theo các loại đầu thẻ, theo tuyến |  |  |  |
| 110 | 5.3. Module Quản trị - Quản lý-cài đặt danh mục điều trị | 5.3.1.Danh mục nguyên nhân tai biến - biến chứng | Danh mục nguyên nhân tai biến - biến chứng | Các màn hình giao diện quản lý danh mục (view, update, insert, delete) |  |  |  |
| 111 |  | 5.3.2.Danh mục nguyên nhân tử vong | Danh mục nguyên nhân tử vong |  |  |  |  |
| 112 |  | 5.3.3.Danh mục thời gian tử vong | Danh mục thời gian tử vong |  |  |  |  |
| 113 |  | 5.3.4.Danh mục tai nạn thương tích | Danh mục tai nạn thương tích |  |  |  |  |
| 114 |  | 5.3.5.Danh mục tai biến sản khoa | Danh mục tai biến sản khoa |  |  |  |  |
| 115 |  | 5.3.6.Danh mục phân loại bệnh (loại bệnh án) | Danh mục phân loại bệnh (loại bệnh án) |  |  |  |  |
| 116 |  | 5.3.8.Danh mục phân loại PTTT | Danh mục phân loại PTTT |  |  |  |  |
| 117 |  | 5.3.9.Danh mục nhóm bệnh truyền nhiễm | Danh mục nhóm bệnh truyền nhiễm |  |  |  |  |
| 118 |  | 5.3.10.Danh mục chuyên khoa | .Danh mục chuyên khoa |  |  |  |  |
| 119 |  | 5.3.11.Danh mục địa điểm tai nạn | .Danh mục địa điểm tai nạn |  |  |  |  |
| 120 | 5.4. Module Quản trị - Danh mục dùng chung | 5.4.1.Danh mục bệnh viện | Danh mục bệnh viện |  |  |  |  |
| 121 |  | 5.4.2.Danh mục đơn vị hành chính | Danh mục đơn vị hành chính |  |  |  |  |
| 122 |  | 5.4.3.Danh mục ICD-10 | Danh mục ICD-10 |  |  |  |  |
| 123 |  | 5.4.4.Danh mục chương bệnh ICD | Danh mục chương bệnh ICD |  |  |  |  |
| 124 |  | 5.4.5.Danh mục Dân tộc | Danh mục Dân tộc |  |  |  |  |
| 125 |  | 5.4.6.Danh mục Quốc Gia | Danh mục Quốc Gia |  |  |  |  |
| 126 |  | 5.4.7.Danh mục Nghề nghiệp | Danh mục Nghề nghiệp |  |  |  |  |
| 127 |  | 5.4.8.Danh mục ICD9 | Danh mục ICD9 |  |  |  |  |
| 128 | 5.5. Module Quản trị - Quản trị-tra cứu log | 5.5.1.Danh mục log thao tác | Tra cứu lịch sử thao tác của người dùng tác động tới dữ liệu của hệ thống | Tra cứu lịch sử thao tác của người dùng tác động tới dữ liệu của hệ thống |  |  |  |
| 129 |  | 5.5.2.Tra cứu Log Delete |  |  |  |  |  |
| 130 |  | 5.5.3.Tra cứu Log Update |  |  |  |  |  |
| 131 |  | 5.5.4.Tra cứu Log kết nối LIS |  |  |  |  |  |
| 132 |  | 5.5.5.Tra cứu  Log kết nối PACS |  |  |  |  |  |
| 133 |  | 5.5.6.Tra cứu Log kết nối hóa đơn điện tử |  |  |  |  |  |
| 134 |  | 5.5.7.Log đăng nhập |  |  |  |  |  |
| 135 |  | 5.5.8.Log tra cổng BHYT |  |  |  |  |  |
| 136 |  | 5.5.9.Log ký số, hủy ký số |  |  |  |  |  |
| 137 | 5.6. Module Quản trị - Tra cứu thông tin bệnh nhân | 5.6.1.Tìm kiếm thông tin bệnh nhân | Tìm kiếm thông tin BN theo các tiêu chí: id, số hồ sơ, ngày sinh, ... | Chức năng cho phép quản trị hệ thống tìm kiếm toàn bộ thông tin KCB của bệnh nhân |  |  |  |
| 138 |  | 5.6.2.Tra cứu các lần đến khám - điều trị |  |  |  |  |  |
| 139 |  | 5.6.3.Tra cứu thông tin chi tiết các lần đến khám (tiếp nhận, khám chỉ định, chi phí, hóa đơn ...) |  |  |  |  |  |
