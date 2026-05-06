# MBFS - Cổng Đầu Tư Quốc Gia: Cây phân rã chức năng

> Nguồn: `docs/MBFS_Bao_cao_table_clean.md`
> Ngày tạo: 2026-05-02
> Modules 1-4 đã có trong plan YAML (mobile app). Modules 5-11 bổ sung từ bảng báo cáo.

> [!NOTE] Pattern chung cho báo cáo (ký hiệu ★)
> Hầu hết nhóm chức năng báo cáo đều có 6 thao tác chuẩn:
> ├── Lập + Lưu nháp + Gửi
> ├── Thao tác (Xem + Lọc + Export + Import)
> ├── Chỉnh sửa
> ├── Xem lịch sử (BC đã nộp + vòng đời)
> ├── Phê duyệt / Từ chối
> └── In

```
MBFS
├── 1. Dashboard, Báo cáo, Thống kê
│   ├── 1. Dashboard tổng quan tình hình nộp BC của nhà đầu tư
│   │   ├── 1. Xem tổng quan (tổng NĐT, BC hoàn thành/chưa + Lọc)
│   │   ├── 2. Xem tình hình nộp BC theo NĐT (theo địa phương + Sắp xếp)
│   │   ├── 3. Xem tình hình nộp BC theo lĩnh vực đầu tư (tỷ lệ + Sắp xếp)
│   │   ├── 4. Xem DS nhà đầu tư chậm nộp BC (Lọc, Sắp xếp, Tìm kiếm)
│   │   └── 5. (trống)
│   └── 2. Dashboard tổng quan tình hình nộp BC của cơ quan địa phương
│       ├── 6. Xem tổng quan (tổng ĐP phải gửi, hoàn thành/chưa + Lọc)
│       ├── 7. Xem tình hình nộp BC theo địa phương (tỷ lệ + Sắp xếp)
│       ├── 8. Xem DS địa phương chậm gửi BC (Lọc, Sắp xếp, Tìm kiếm)
│       ├── 9. (trống)
│       └── 10. Xem chất lượng dữ liệu BC của địa phương (Sắp xếp)
│
├── 2. Quản lý xúc tiến đầu tư
│   ├── 3. BC kết quả thực hiện chương trình xúc tiến ĐT của Bộ/UBND cấp tỉnh ★ [11-16]
│   ├── 4. Biểu tổng hợp tình hình thực hiện chương trình xúc tiến ĐT ★ [17-22]
│   ├── 5. BC tình hình thực hiện cam kết/thỏa thuận/chủ trương ĐT ★ [23-28]
│   └── 6. Danh mục dự án ĐTNN đang có NĐT quan tâm năm ★ [29-34]
│
├── 3. Quản lý đầu tư nước ngoài vào Việt Nam
│   ├── 7.  BC trước khi thực hiện dự án ĐT (không thuộc diện cấp GCNĐKĐT) ★ [35-40]
│   ├── 8.  Báo cáo tình hình thực hiện dự án ★ + Xuất file [—]
│   ├── 9.  BC tình hình thực hiện dự án ĐT quý ★ [41-46]
│   ├── 10. BC tình hình thực hiện dự án ĐT năm (Phụ lục A) ★ [47-52]
│   ├── 11. BC tình hình thực hiện dự án ĐT trong lĩnh vực dầu khí quý ★ [53-58]
│   ├── 12. BC tình hình thực hiện dự án hợp tác nước ngoài lĩnh vực dầu khí năm ★ [59-64]
│   ├── 13. BC tổng hợp tình hình ĐTNN trên địa bàn tỉnh/TP quý ★ [65-70]
│   ├── 14. Văn bản BC về tình hình thu hút ĐTNN trên địa bàn tỉnh/TP năm ★ [71-76]
│   ├── 15. BC về tình hình ĐTNN trên địa bàn tỉnh/TP năm ★ [77-82]
│   ├── 16. Danh mục dự án ĐTNN đang có NĐT quan tâm năm (Phụ lục A) ★ [83-88]
│   ├── 17. BC tình hình cấp mới GCNĐKĐT cho NĐT nước ngoài quý ★ [89-94]
│   ├── 18. BC tình hình điều chỉnh GCNĐKĐT cho NĐT nước ngoài quý ★ [95-100]
│   ├── 19. BC tình hình tạm ngừng, chấm dứt hoạt động dự án ĐTNN quý ★ [101-106]
│   ├── 20. BC tổng hợp tình hình xuất nhập khẩu tổ chức KT có vốn ĐTNN năm ★ [107-112]
│   ├── 21. BC tình hình xuất khẩu tổ chức KT có vốn ĐTNN năm ★ [113-118]
│   ├── 22. BC tình hình nhập khẩu tổ chức KT có vốn ĐTNN năm ★ [119-124]
│   ├── 23. BC tổng hợp tài chính và nộp ngân sách (theo địa bàn tỉnh/TP) ★ [125-130]
│   ├── 24. BC tổng hợp tài chính và nộp ngân sách (theo doanh nghiệp) ★ [131-136]
│   ├── 25. BC tổng hợp lao động nước ngoài (theo quốc tịch) ★ [137-142]
│   ├── 26. BC tổng hợp lao động nước ngoài (theo địa bàn tỉnh/TP) ★ [143-148]
│   ├── 27. BC tổng hợp chuyển giao công nghệ (theo địa bàn tỉnh/TP) ★ [149-154]
│   └── 28. BC tình hình giao đất, cho thuê đất đối với tổ chức KT có vốn ĐTNN ★ [155-160]
│
├── 4. Quản lý đầu tư ra nước ngoài
│   ├── 29. BC định kỳ 6 tháng tình hình hoạt động dự án ĐT tại nước ngoài ★ [161-166]
│   ├── 30. Thông báo thực hiện hoạt động ĐT ở nước ngoài ★ [167-172]
│   ├── 31. Thông báo kéo dài thời hạn chuyển lợi nhuận dự án ĐTRNN về VN ★ [173-178]
│   ├── 32. Thông báo chấm dứt hoạt động ĐT ra nước ngoài ★ [179-184]
│   ├── 33. BC định kỳ năm tình hình hoạt động dự án ĐT tại nước ngoài ★ [185-190]
│   ├── 34. BC tình hình hoạt động ĐTRNN cho năm tài chính ★ [191-196]
│   ├── 35. BC về việc cho tổ chức KT ở nước ngoài vay vốn ★ [197-202]
│   ├── 36. BC tình hình QLNN về hoạt động ĐTRNN của các Bộ, ngành ★ [203-208]
│   ├── 37. BC tình hình đăng ký giao dịch ngoại hối và chấm dứt ĐTRNN ★ [209-214]
│   └── 38. BC tình hình chuyển vốn ĐTRNN và chuyển tiền về VN ★ [215-220]
│
├── 5. Quản lý đầu tư trong nước
│   ├── 39. Tổng hợp BC dự án ĐT trong nước ★ + Xuất file [—]
│   ├── 40. BC tình hình thực hiện dự án ĐT trong nước quý ★ [221-226]
│   ├── 41. BC tình hình thực hiện dự án ĐT trong nước năm (Phụ lục A) ★ [227-232]
│   └── 42. BC tình hình thực hiện dự án ĐT trong lĩnh vực dầu khí quý ★ [233-238]
│
├── 6. Báo cáo KKT/KCN
│   ├── 43. Tình hình thu hút đầu tư vào KCN trong kỳ (2101) ★ [239-244]
│   ├── 44. Tình hình thành lập mới, điều chỉnh diện tích và thu hồi KCN (2102) ★ [245-250]
│   ├── 45. Tình hình thực hiện dự án ĐT xây dựng kết cấu hạ tầng KCN (2103) ★ [251-256]
│   ├── 46. Tình hình hoạt động SXKD tại KCN lũy kế (2104) ★ [257-262]
│   ├── 47. Tình hình ĐT và xây dựng nhà máy xử lý nước thải KCN (2105) ★ [263-268]
│   ├── 48. Số lao động trực tiếp làm việc tại KCN (2106) ★ [269-274]
│   ├── 49. Danh mục KCN nằm trong quy hoạch còn hiệu lực (2107) ★ [275-280]
│   ├── 50. Số lượng và diện tích các khu kinh tế (2108) ★ [281-286]
│   ├── 51. Tình hình thu hút đầu tư tại KKT trong kỳ (2109) ★ [287-292]
│   ├── 52. Tình hình quy hoạch, sử dụng đất tại KKT (2110) ★ [293-298]
│   ├── 53. Tình hình thu hút dự án ĐT xây dựng và kinh doanh KCHT trong KKT ★ [299-304]
│   ├── 54. Tình hình hoạt động khu phi thuế quan, khu TMTD, khu bảo thuế ★ [305-310]
│   ├── 55. Tình hình thu hút dự án ĐT SXKD trong KKT ★ [311-316]
│   ├── 56. Tình hình ĐTNN vào KCN, KKT phân theo đối tác đầu tư ★ [317-322]
│   ├── 57. Tình hình điều chỉnh QĐ chủ trương ĐT/GCNĐKĐT tại KCN, KKT ★ [323-328]
│   ├── 58. Tình hình thu hồi QĐ chủ trương ĐT/GCNĐKĐT tại KCN, KKT ★ [329-334]
│   ├── 59. Chỉ số đánh giá hiệu quả KT-XH-MT của KCN sinh thái (NĐ 35/2023) ★ [335-340]
│   ├── 60. BC theo dõi, giám sát thực hiện KCN sinh thái (NĐ 35/2022) ★ [341-346]
│   ├── 61. Chỉ số đánh giá hiệu quả MT-XH doanh nghiệp sinh thái (NĐ 35/2022) ★ [347-352]
│   └── 62. BC theo dõi, giám sát thực hiện doanh nghiệp sinh thái (NĐ 35/2022) ★ [353-358]
│
└── 7. Chức năng mở rộng
    ├── 63. Cấu hình cho từng báo cáo đầu vào
    │   └── 359. Cấu hình template báo cáo
    ├── 64. Thiết lập báo cáo đột xuất
    │   ├── 360. Thiết lập định dạng file (docs/excel)
    │   ├── 361. Tạo các trường thông tin trong BC đột xuất
    │   ├── 362. Xuất file excel hoặc docs
    │   └── 363. In báo cáo đột xuất
    ├── 65. Quản lý báo cáo đã nộp
    │   ├── 364. Xem danh sách BC đã nộp + Lọc
    │   ├── 365. Xem chi tiết BC đã nộp
    │   └── 366. Chỉnh sửa BC đã nộp
    ├── 66. Quản lý báo cáo nhà đầu tư đã nộp
    │   ├── 367. Xem danh sách BC NĐT đã nộp + Lọc
    │   ├── 368. Xem chi tiết BC NĐT đã nộp
    │   └── 369. Phản hồi BC (Yêu cầu chỉnh sửa / Lưu trữ / Phê duyệt)
    └── 67. Quản lý báo cáo địa phương đã nộp
        ├── 370. Xem danh sách BC địa phương đã nộp + Lọc
        ├── 371. Xem chi tiết BC địa phương đã nộp
        └── 372. Phản hồi BC địa phương (Yêu cầu chỉnh sửa / Lưu trữ / Phê duyệt)
```

Tổng kết: 7 modules | 67 nhóm chức năng | 372 chức năng (theo file gốc #1 → #372)
