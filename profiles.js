// ============================================================
// DISC PROFILES – Bảng đánh giá chi tiết tính cách
// Tham khảo: CrystalKnows, Everything DiSC, William Marston,
//            MISA AMIS HR, CareerViet, 123test.com
// ============================================================
const DISC_PROFILES = {
  D: {
    name: "Dominance – Thống Lĩnh",
    letter: "D",
    color: "#e74c3c",
    gradient: "linear-gradient(135deg, #e74c3c, #c0392b)",
    emoji: "🦁",
    tagline: "Người tiên phong – Quyết đoán, kết quả-oriented, không ngại thử thách",
    description: "Bạn là người hành động với bản năng lãnh đạo mạnh mẽ. Bạn tập trung vào kết quả, quyết đoán trong từng quyết định và không ngại đối mặt với thử thách hay rủi ro. Bạn muốn kiểm soát tình huống và có xu hướng hành động nhanh hơn suy nghĩ dài.",
    strengths: ["Lãnh đạo tự nhiên và quyết đoán", "Tập trung mạnh vào kết quả đầu ra", "Dũng cảm, chấp nhận rủi ro tính toán", "Hiệu suất cao và làm việc với cường độ lớn", "Thúc đẩy đổi mới và phá vỡ giới hạn", "Giải quyết vấn đề nhanh và thực dụng"],
    challenges: ["Thiếu kiên nhẫn khi người khác làm chậm", "Có thể bị xem là độc đoán hoặc áp đặt", "Ít chú ý đến cảm xúc và nhu cầu của người khác", "Đưa ra quyết định quá nhanh – bỏ qua chi tiết quan trọng", "Khó thừa nhận sai lầm một cách cởi mở"],
    careers: ["CEO / Giám đốc điều hành", "Doanh nhân / Founder khởi nghiệp", "Quản lý dự án cấp cao / PMO", "Luật sư tranh tụng / Biện hộ viên", "Nhà đàm phán / Thương lượng", "Nhà quản trị chiến lược", "Huấn luyện viên thể thao / Quân sự"],
    behaviorUnderPressure: "Khi căng thẳng, bạn trở nên độc đoán hơn, ít lắng nghe và có xu hướng kiểm soát mọi thứ. Bạn có thể trở nên thiếu kiên nhẫn và áp đặt quyết định.",
    communicationTip: "Hãy bắt đầu bằng kết quả và lợi ích cụ thể khi nói chuyện với nhóm D. Ngắn gọn, đi thẳng vào vấn đề và tránh vòng vo.",
    compatibility: {
      D: { level: "Cạnh tranh & Quyền lực", note: "Hai người D có thể xung đột về quyền kiểm soát. Cần phân chia trách nhiệm rõ ràng", score: 60 },
      I: { level: "Năng động & Bổ sung", note: "I giúp D mềm mại hơn trong giao tiếp, D giúp I tập trung vào kết quả hơn", score: 80 },
      S: { level: "Cân bằng xuất sắc", note: "S bình ổn sự bốc đồng của D, tạo nên cặp đôi làm việc hiệu quả và bền vững", score: 90 },
      C: { level: "Căng thẳng về tốc độ", note: "D muốn ra quyết định nhanh, C muốn đảm bảo chính xác – cần thỏa hiệp", score: 65 }
    },
    notMatch: ["Người thụ động, hay trì hoãn và thiếu trách nhiệm", "Môi trường quan liêu chậm chạp thiếu quyết định", "Người cần được chỉ dẫn chi tiết liên tục", "Công việc không có mục tiêu rõ ràng và kết quả đo lường được"]
  },
  I: {
    name: "Influence – Ảnh Hưởng",
    letter: "I",
    color: "#f39c12",
    gradient: "linear-gradient(135deg, #f39c12, #e67e22)",
    emoji: "🦋",
    tagline: "Người truyền cảm hứng – Nhiệt huyết, sáng tạo, kết nối con người",
    description: "Bạn là người nhiệt tình, lạc quan và có tài năng thiên bẩm trong việc kết nối với người khác. Bạn truyền cảm hứng bằng năng lượng tích cực, khả năng kể chuyện cuốn hút và sự sáng tạo không giới hạn. Bạn thích làm việc trong môi trường nhiều tương tác và được thể hiện bản thân.",
    strengths: ["Giao tiếp và thuyết phục xuất sắc", "Truyền cảm hứng và tạo động lực cho người khác", "Sáng tạo, đổi mới và tư duy liên tưởng phong phú", "Xây dựng mạng lưới quan hệ rộng một cách tự nhiên", "Lạc quan, tích cực và thích ứng linh hoạt", "Tạo bầu không khí vui vẻ và đoàn kết cho nhóm"],
    challenges: ["Thiếu tổ chức và kỷ luật trong công việc chi tiết", "Dễ phân tâm bởi ý tưởng mới, bỏ dở việc cũ", "Nói nhiều hơn làm, đôi khi quá lạc quan không thực tế", "Cần sự công nhận liên tục từ người khác", "Khó theo dõi tiến độ và chi tiết kỹ thuật"],
    careers: ["Sales & Marketing / Kinh doanh", "Diễn giả / Presenter / MC", "Nghệ sĩ / Diễn viên / Giải trí", "Quan hệ công chúng (PR)", "Nhà tổ chức sự kiện / Event Planner", "Huấn luyện viên phát triển cá nhân (Life Coach)", "Truyền thông / Content Creator / Báo chí"],
    behaviorUnderPressure: "Khi căng thẳng, bạn trở nên cảm tính hơn, nói nhiều hơn, có thể phóng đại tình huống. Bạn có xu hướng tìm kiếm sự đồng cảm thay vì giải pháp.",
    communicationTip: "Với nhóm I, hãy thể hiện sự nhiệt tình và cởi mở. Tạo không gian cho họ chia sẻ ý tưởng. Tránh cứng nhắc và quá nhiều chi tiết kỹ thuật.",
    compatibility: {
      D: { level: "Năng động & Bổ sung", note: "D cho I hướng đi, I cho D sự linh hoạt và kết nối người tốt hơn", score: 80 },
      I: { level: "Sôi nổi, thiếu chiều sâu", note: "Rất hòa hợp và vui vẻ nhưng cả hai đều thiếu ổn định và chi tiết", score: 70 },
      S: { level: "Cân bằng hoàn hảo", note: "S bổ sung sự kiên định và tỉ mỉ cho I, tạo cặp đôi bền vững và cân bằng", score: 88 },
      C: { level: "Khác biệt cần thấu hiểu", note: "I cởi mở cảm xúc, C thận trọng lý tính – cần tôn trọng sự khác biệt", score: 62 }
    },
    notMatch: ["Người quá cứng nhắc, thiếu linh hoạt và không có tinh thần đội nhóm", "Môi trường làm việc cô lập, ít tương tác con người", "Công việc lặp đi lặp lại thuần túy kỹ thuật không có tính sáng tạo", "Người hay chỉ trích tiêu cực và không biết trân trọng nỗ lực"]
  },
  S: {
    name: "Steadiness – Kiên Định",
    letter: "S",
    color: "#27ae60",
    gradient: "linear-gradient(135deg, #27ae60, #2ecc71)",
    emoji: "🌳",
    tagline: "Người hỗ trợ – Kiên nhẫn, đáng tin cậy, trái tim nhân hậu",
    description: "Bạn là người đáng tin cậy nhất trong nhóm. Bạn kiên nhẫn, nhất quán và luôn đặt người khác lên trước bản thân. Bạn tạo ra sự ổn định, hòa bình và đoàn kết trong môi trường xung quanh. Bạn lắng nghe sâu sắc và là người mà mọi người tin tưởng tìm đến khi cần hỗ trợ.",
    strengths: ["Đáng tin cậy, trung thành và nhất quán cao", "Kỹ năng lắng nghe sâu sắc và thấu cảm", "Kiên nhẫn, bền bỉ và ổn định trong mọi tình huống", "Tinh thần đội nhóm và hợp tác xuất sắc", "Ít xung đột, tạo môi trường hài hòa", "Khả năng hỗ trợ và xây dựng niềm tin lâu dài"],
    challenges: ["Khó thích nghi khi có thay đổi đột ngột và lớn", "Dễ bị lợi dụng vì tấm lòng tốt bụng", "Tránh né xung đột cần thiết, nhường nhịn quá mức", "Khó nói 'không' dù bản thân đã quá tải", "Chậm đưa ra quyết định khi chưa có đồng thuận"],
    careers: ["Nhân sự / HR / Tuyển dụng", "Giáo viên / Giảng viên / Đào tạo", "Y tá / Điều dưỡng / Chăm sóc sức khỏe", "Tư vấn tâm lý / Therapist", "Quản lý hành chính / Văn phòng", "Công tác xã hội / NGO", "Chăm sóc khách hàng / Customer Success"],
    behaviorUnderPressure: "Khi bị áp lực, bạn có xu hướng thu mình lại, tránh đối đầu và có thể cảm thấy choáng ngợp. Bạn cần không gian để xử lý cảm xúc trước khi phản hồi.",
    communicationTip: "Với nhóm S, hãy chân thành, kiên nhẫn và cho họ thời gian xử lý. Tránh áp đặt quyết định đột ngột. Nhấn mạnh tính ổn định và sự an toàn.",
    compatibility: {
      D: { level: "Cân bằng xuất sắc", note: "D tạo động lực và tốc độ, S tạo ổn định và chiều sâu – cặp đôi bền nhất", score: 90 },
      I: { level: "Hài hòa & Bổ sung", note: "I mang lại sự vui vẻ, S mang lại sự kiên định – cân bằng cảm xúc và ổn định", score: 88 },
      S: { level: "Hòa hợp, cần người thúc đẩy", note: "Rất thân thiết và hiểu nhau sâu, nhưng đôi khi cần người bên ngoài thúc đẩy", score: 75 },
      C: { level: "Hợp tác có chiều sâu", note: "Cả hai đều cẩn thận, ít xung đột và chú trọng chất lượng mối quan hệ", score: 82 }
    },
    notMatch: ["Môi trường hỗn loạn, thay đổi liên tục và không có ổn định", "Lãnh đạo độc đoán, áp đặt không tôn trọng ý kiến người khác", "Người hay gây áp lực và không kiên nhẫn", "Công việc quá nhiều bất ổn và không thể dự đoán"]
  },
  C: {
    name: "Conscientiousness – Tận Tâm",
    letter: "C",
    color: "#3498db",
    gradient: "linear-gradient(135deg, #3498db, #2980b9)",
    emoji: "🦉",
    tagline: "Người phân tích – Chính xác, có hệ thống, theo đuổi sự hoàn hảo",
    description: "Bạn là người phân tích với tư duy logic sắc bén. Bạn tiếp cận mọi vấn đề một cách có hệ thống, dựa trên dữ liệu và hướng đến sự chính xác tuyệt đối. Bạn cầu toàn theo nghĩa tích cực – bạn muốn làm đúng ngay từ lần đầu tiên và đặt tiêu chuẩn cao cho bản thân.",
    strengths: ["Tư duy phân tích xuất sắc và có hệ thống", "Chú ý đến chi tiết ở mức độ rất cao", "Chất lượng công việc nhất quán và đáng tin cậy", "Lập kế hoạch và tổ chức công việc hiệu quả", "Tư duy phê phán giúp phát hiện rủi ro sớm", "Chuyên môn sâu và kiến thức vững chắc trong lĩnh vực"],
    challenges: ["Cầu toàn có thể làm chậm tiến độ ('analysis paralysis')", "Khó chia sẻ cảm xúc và kết nối cảm tính với người khác", "Có xu hướng chỉ trích và tìm lỗi nhiều hơn khen ngợi", "Khó linh hoạt khi phải ra quyết định trong mơ hồ", "Tiêu chuẩn quá cao đôi khi gây stress cho bản thân và người xung quanh"],
    careers: ["Kỹ sư phần mềm / Lập trình viên", "Kế toán / Kiểm toán / Tài chính", "Nhà khoa học / Nghiên cứu viên", "Phân tích dữ liệu / Data Scientist", "Bác sĩ / Dược sĩ / Y tế", "Kiến trúc sư / Thiết kế kỹ thuật", "Luật sư nghiên cứu / Chuyên gia pháp lý"],
    behaviorUnderPressure: "Khi căng thẳng, bạn trở nên rút lui vào phân tích quá mức, cực kỳ chỉ trích và cứng nhắc. Bạn có thể bị tê liệt quyết định vì muốn chắc chắn hoàn toàn.",
    communicationTip: "Với nhóm C, hãy đưa ra dữ liệu, bằng chứng và lý do logic. Cho họ thời gian để xử lý thông tin. Tránh những yêu cầu đột ngột và thiếu căn cứ.",
    compatibility: {
      D: { level: "Căng thẳng về tốc độ", note: "D cần tốc độ, C cần sự chắc chắn – cần thỏa hiệp về quy trình và tiêu chuẩn", score: 65 },
      I: { level: "Khác biệt cần thấu hiểu", note: "C thích độ chính xác và lý tính, I thích cảm xúc và tự do – cần tôn trọng lẫn nhau", score: 62 },
      S: { level: "Hợp tác có chiều sâu", note: "Cả hai đều cẩn thận, tỉ mỉ và không thích xung đột – hợp tác rất ổn định", score: 82 },
      C: { level: "Chuyên nghiệp cao, dễ cứng nhắc", note: "Làm việc rất hiệu quả và chất lượng nhưng có thể thiếu linh hoạt và kết nối cảm xúc", score: 78 }
    },
    notMatch: ["Người làm việc hời hợt và không có tiêu chuẩn chất lượng", "Môi trường hỗn loạn, thiếu quy trình và tiêu chuẩn", "Người ra quyết định hoàn toàn theo cảm tính thiếu căn cứ", "Công việc không có tiêu chuẩn đánh giá chất lượng rõ ràng"]
  }
};

// Xác định nhóm tính cách chủ đạo
function getProfileKey(scores) {
  const keys = ["D", "I", "S", "C"];
  return keys.reduce((a, b) => scores[a] >= scores[b] ? a : b);
}

// Tính phần trăm điểm từng nhóm
function getScorePercentages(scores) {
  const total = scores.D + scores.I + scores.S + scores.C;
  if (total === 0) return { D: 0, I: 0, S: 0, C: 0 };
  return {
    D: Math.round((scores.D / total) * 100),
    I: Math.round((scores.I / total) * 100),
    S: Math.round((scores.S / total) * 100),
    C: Math.round((scores.C / total) * 100)
  };
}
