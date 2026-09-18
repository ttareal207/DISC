// ============================================================
// DISC TEST - 48 NHOM TU CHUAN MOST/LEAST (QUOC TE)
// Tham khao: Everything DiSC (Wiley), DISC Classic (Walter Clarke/John Geier),
//            123test.com, discprofile.com, crystalknows.com, discvietnam.com
// Mo hinh William Marston (1928): Dominance-Influence-Steadiness-Conscientiousness
// Tinh diem: Most (chon nhieu nhat) +2 | Least (chon it nhat) -1 | Con lai 0
// ============================================================
const QUESTIONS = [
  {
    id: 1,
    category: "Nhom 1 / 48",
    options: [
      { text: "Quyết đoán", disc: "D" },
      { text: "Nhiệt tình", disc: "I" },
      { text: "Kiên nhẫn", disc: "S" },
      { text: "Chính xác", disc: "C" }
    ]
  },
  {
    id: 2,
    category: "Nhom 2 / 48",
    options: [
      { text: "Mạnh mẽ", disc: "D" },
      { text: "Lạc quan", disc: "I" },
      { text: "Đáng tin", disc: "S" },
      { text: "Tỉ mỉ", disc: "C" }
    ]
  },
  {
    id: 3,
    category: "Nhom 3 / 48",
    options: [
      { text: "Tự tin", disc: "D" },
      { text: "Hào hứng", disc: "I" },
      { text: "Điềm tĩnh", disc: "S" },
      { text: "Phân tích", disc: "C" }
    ]
  },
  {
    id: 4,
    category: "Nhom 4 / 48",
    options: [
      { text: "Thẳng thắn", disc: "D" },
      { text: "Thuyết phục", disc: "I" },
      { text: "Nhẹ nhàng", disc: "S" },
      { text: "Cẩn thận", disc: "C" }
    ]
  },
  {
    id: 5,
    category: "Nhom 5 / 48",
    options: [
      { text: "Cạnh tranh", disc: "D" },
      { text: "Cởi mở", disc: "I" },
      { text: "Hòa đồng", disc: "S" },
      { text: "Có hệ thống", disc: "C" }
    ]
  },
  {
    id: 6,
    category: "Nhom 6 / 48",
    options: [
      { text: "Dũng cảm", disc: "D" },
      { text: "Nhiệt huyết", disc: "I" },
      { text: "Trung thành", disc: "S" },
      { text: "Logic", disc: "C" }
    ]
  },
  {
    id: 7,
    category: "Nhom 7 / 48",
    options: [
      { text: "Kiểm soát", disc: "D" },
      { text: "Vui vẻ", disc: "I" },
      { text: "Ổn định", disc: "S" },
      { text: "Nguyên tắc", disc: "C" }
    ]
  },
  {
    id: 8,
    category: "Nhom 8 / 48",
    options: [
      { text: "Năng nổ", disc: "D" },
      { text: "Sáng tạo", disc: "I" },
      { text: "Nhẫn nại", disc: "S" },
      { text: "Kỹ lưỡng", disc: "C" }
    ]
  },
  {
    id: 9,
    category: "Nhom 9 / 48",
    options: [
      { text: "Khát vọng", disc: "D" },
      { text: "Cuốn hút", disc: "I" },
      { text: "Hòa giải", disc: "S" },
      { text: "Chuẩn mực", disc: "C" }
    ]
  },
  {
    id: 10,
    category: "Nhom 10 / 48",
    options: [
      { text: "Tiên phong", disc: "D" },
      { text: "Truyền cảm hứng", disc: "I" },
      { text: "Đồng cảm", disc: "S" },
      { text: "Có nguyên tắc", disc: "C" }
    ]
  },
  {
    id: 11,
    category: "Nhom 11 / 48",
    options: [
      { text: "Độc lập", disc: "D" },
      { text: "Hoạt bát", disc: "I" },
      { text: "Khiêm tốn", disc: "S" },
      { text: "Nghiêm túc", disc: "C" }
    ]
  },
  {
    id: 12,
    category: "Nhom 12 / 48",
    options: [
      { text: "Thách thức", disc: "D" },
      { text: "Linh hoạt", disc: "I" },
      { text: "Đoàn kết", disc: "S" },
      { text: "Chặt chẽ", disc: "C" }
    ]
  },
  {
    id: 13,
    category: "Nhom 13 / 48",
    options: [
      { text: "Bản lĩnh", disc: "D" },
      { text: "Tự phát", disc: "I" },
      { text: "Hiền lành", disc: "S" },
      { text: "Chi tiết", disc: "C" }
    ]
  },
  {
    id: 14,
    category: "Nhom 14 / 48",
    options: [
      { text: "Thực dụng", disc: "D" },
      { text: "Đam mê", disc: "I" },
      { text: "Hỗ trợ", disc: "S" },
      { text: "Chuyên nghiệp", disc: "C" }
    ]
  },
  {
    id: 15,
    category: "Nhom 15 / 48",
    options: [
      { text: "Không sợ rủi ro", disc: "D" },
      { text: "Lôi cuốn", disc: "I" },
      { text: "Chu đáo", disc: "S" },
      { text: "Toàn vẹn", disc: "C" }
    ]
  },
  {
    id: 16,
    category: "Nhom 16 / 48",
    options: [
      { text: "Dứt khoát", disc: "D" },
      { text: "Xã giao", disc: "I" },
      { text: "Biết lắng nghe", disc: "S" },
      { text: "Có phương pháp", disc: "C" }
    ]
  },
  {
    id: 17,
    category: "Nhom 17 / 48",
    options: [
      { text: "Uy quyền", disc: "D" },
      { text: "Nhiều màu sắc", disc: "I" },
      { text: "Tin cậy", disc: "S" },
      { text: "Hoàn hảo", disc: "C" }
    ]
  },
  {
    id: 18,
    category: "Nhom 18 / 48",
    options: [
      { text: "Có chí", disc: "D" },
      { text: "Tươi vui", disc: "I" },
      { text: "Ân cần", disc: "S" },
      { text: "Cân nhắc", disc: "C" }
    ]
  },
  {
    id: 19,
    category: "Nhom 19 / 48",
    options: [
      { text: "Quyết liệt", disc: "D" },
      { text: "Tự nhiên", disc: "I" },
      { text: "Nhường nhịn", disc: "S" },
      { text: "Rõ ràng", disc: "C" }
    ]
  },
  {
    id: 20,
    category: "Nhom 20 / 48",
    options: [
      { text: "Kỳ vọng cao", disc: "D" },
      { text: "Tự do", disc: "I" },
      { text: "Trung thực", disc: "S" },
      { text: "Trật tự", disc: "C" }
    ]
  },
  {
    id: 21,
    category: "Nhom 21 / 48",
    options: [
      { text: "Chủ động", disc: "D" },
      { text: "Vô tư", disc: "I" },
      { text: "Bao dung", disc: "S" },
      { text: "Sâu sắc", disc: "C" }
    ]
  },
  {
    id: 22,
    category: "Nhom 22 / 48",
    options: [
      { text: "Hiệu quả", disc: "D" },
      { text: "Phong phú", disc: "I" },
      { text: "Dịu dàng", disc: "S" },
      { text: "Xác thực", disc: "C" }
    ]
  },
  {
    id: 23,
    category: "Nhom 23 / 48",
    options: [
      { text: "Bạo dạn", disc: "D" },
      { text: "Biểu cảm", disc: "I" },
      { text: "Kiên định", disc: "S" },
      { text: "Có chiều sâu", disc: "C" }
    ]
  },
  {
    id: 24,
    category: "Nhom 24 / 48",
    options: [
      { text: "Tham vọng", disc: "D" },
      { text: "Hài hước", disc: "I" },
      { text: "Bình tĩnh", disc: "S" },
      { text: "Nghiên cứu", disc: "C" }
    ]
  },
  {
    id: 25,
    category: "Nhom 25 / 48",
    options: [
      { text: "Nhanh nhẹn", disc: "D" },
      { text: "Cuốn hút", disc: "I" },
      { text: "Đồng thuận", disc: "S" },
      { text: "Phán đoán tốt", disc: "C" }
    ]
  },
  {
    id: 26,
    category: "Nhom 26 / 48",
    options: [
      { text: "Kiên quyết", disc: "D" },
      { text: "Chân thành", disc: "I" },
      { text: "Lặng lẽ", disc: "S" },
      { text: "Kiên trì", disc: "C" }
    ]
  },
  {
    id: 27,
    category: "Nhom 27 / 48",
    options: [
      { text: "Lãnh đạo", disc: "D" },
      { text: "Gần gũi", disc: "I" },
      { text: "Nhất quán", disc: "S" },
      { text: "Cẩn trọng", disc: "C" }
    ]
  },
  {
    id: 28,
    category: "Nhom 28 / 48",
    options: [
      { text: "Thúc đẩy", disc: "D" },
      { text: "Năng lượng", disc: "I" },
      { text: "Trọng tình cảm", disc: "S" },
      { text: "Tiêu chuẩn cao", disc: "C" }
    ]
  },
  {
    id: 29,
    category: "Nhom 29 / 48",
    options: [
      { text: "Hành động", disc: "D" },
      { text: "Nhiệt năng", disc: "I" },
      { text: "Bình ổn", disc: "S" },
      { text: "Hệ thống", disc: "C" }
    ]
  },
  {
    id: 30,
    category: "Nhom 30 / 48",
    options: [
      { text: "Đột phá", disc: "D" },
      { text: "Thú vị", disc: "I" },
      { text: "Đáng tin cậy", disc: "S" },
      { text: "Tóm lược", disc: "C" }
    ]
  },
  {
    id: 31,
    category: "Nhom 31 / 48",
    options: [
      { text: "Quyết tâm", disc: "D" },
      { text: "Khích lệ", disc: "I" },
      { text: "Ôn hòa", disc: "S" },
      { text: "Khách quan", disc: "C" }
    ]
  },
  {
    id: 32,
    category: "Nhom 32 / 48",
    options: [
      { text: "Có lực", disc: "D" },
      { text: "Xuất sắc xã giao", disc: "I" },
      { text: "Bảo vệ người khác", disc: "S" },
      { text: "Chính trực", disc: "C" }
    ]
  },
  {
    id: 33,
    category: "Nhom 33 / 48",
    options: [
      { text: "Ngắn gọn", disc: "D" },
      { text: "Quảng giao", disc: "I" },
      { text: "Thật lòng", disc: "S" },
      { text: "Đáng tin", disc: "C" }
    ]
  },
  {
    id: 34,
    category: "Nhom 34 / 48",
    options: [
      { text: "Khống chế", disc: "D" },
      { text: "Bày tỏ cảm xúc", disc: "I" },
      { text: "Hợp tác", disc: "S" },
      { text: "Làm theo quy trình", disc: "C" }
    ]
  },
  {
    id: 35,
    category: "Nhom 35 / 48",
    options: [
      { text: "Đấu tranh", disc: "D" },
      { text: "Đồng lòng", disc: "I" },
      { text: "Nhẹ nhàng hòa giải", disc: "S" },
      { text: "Kỹ sưỡng", disc: "C" }
    ]
  },
  {
    id: 36,
    category: "Nhom 36 / 48",
    options: [
      { text: "Chủ động tiến ra", disc: "D" },
      { text: "Tạo động lực", disc: "I" },
      { text: "Giữ gìn quan hệ", disc: "S" },
      { text: "Tối ưu hóa", disc: "C" }
    ]
  },
  {
    id: 37,
    category: "Nhom 37 / 48",
    options: [
      { text: "Tạo ảnh hưởng", disc: "D" },
      { text: "Vui tính", disc: "I" },
      { text: "Bảo trợ", disc: "S" },
      { text: "Phê phán xây dựng", disc: "C" }
    ]
  },
  {
    id: 38,
    category: "Nhom 38 / 48",
    options: [
      { text: "Đặc biệt", disc: "D" },
      { text: "Độc sắc", disc: "I" },
      { text: "Dũng cảm chịu đựng", disc: "S" },
      { text: "Đúng đắn", disc: "C" }
    ]
  },
  {
    id: 39,
    category: "Nhom 39 / 48",
    options: [
      { text: "Bất khuất", disc: "D" },
      { text: "Hạnh phúc", disc: "I" },
      { text: "Dễ chịu", disc: "S" },
      { text: "Có căn cứ", disc: "C" }
    ]
  },
  {
    id: 40,
    category: "Nhom 40 / 48",
    options: [
      { text: "Thành công", disc: "D" },
      { text: "Thu hút", disc: "I" },
      { text: "Tốt bụng", disc: "S" },
      { text: "Chất lượng cao", disc: "C" }
    ]
  },
  {
    id: 41,
    category: "Nhom 41 / 48",
    options: [
      { text: "Quyết đoạt", disc: "D" },
      { text: "Phấn khích", disc: "I" },
      { text: "Thành thạo", disc: "S" },
      { text: "Phân tích sâu", disc: "C" }
    ]
  },
  {
    id: 42,
    category: "Nhom 42 / 48",
    options: [
      { text: "Phản kháng", disc: "D" },
      { text: "Biểu diễn", disc: "I" },
      { text: "Ngăn nắp", disc: "S" },
      { text: "Cầu toàn", disc: "C" }
    ]
  },
  {
    id: 43,
    category: "Nhom 43 / 48",
    options: [
      { text: "Tạo kết quả", disc: "D" },
      { text: "Thích giao lưu", disc: "I" },
      { text: "Sống ổn thường", disc: "S" },
      { text: "Kiểm tra kỹ lưỡng", disc: "C" }
    ]
  },
  {
    id: 44,
    category: "Nhom 44 / 48",
    options: [
      { text: "Đạt tối đa", disc: "D" },
      { text: "Quảng đại", disc: "I" },
      { text: "Tương thích", disc: "S" },
      { text: "Chọn lọc", disc: "C" }
    ]
  },
  {
    id: 45,
    category: "Nhom 45 / 48",
    options: [
      { text: "Cứng rắn", disc: "D" },
      { text: "Hồ hởi", disc: "I" },
      { text: "Đặt đôi", disc: "S" },
      { text: "Chi đến cùng", disc: "C" }
    ]
  },
  {
    id: 46,
    category: "Nhom 46 / 48",
    options: [
      { text: "Phá vỡ giới hạn", disc: "D" },
      { text: "Kết nối mọi người", disc: "I" },
      { text: "Bảo đảm an toàn", disc: "S" },
      { text: "Giảm thiểu sai sót", disc: "C" }
    ]
  },
  {
    id: 47,
    category: "Nhom 47 / 48",
    options: [
      { text: "Ý chí mạnh", disc: "D" },
      { text: "Dễ dàng tiếp cận", disc: "I" },
      { text: "Nhẹ nhàng hòa giải", disc: "S" },
      { text: "Lập luận rõ ràng", disc: "C" }
    ]
  },
  {
    id: 48,
    category: "Nhom 48 / 48",
    options: [
      { text: "Đạt thành tích", disc: "D" },
      { text: "Sôi động", disc: "I" },
      { text: "Tâm lòng nhân hậu", disc: "S" },
      { text: "Tuân thủ chuẩn mực", disc: "C" }
    ]
  },
];
