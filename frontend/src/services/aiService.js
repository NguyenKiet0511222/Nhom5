// Các mẫu ảnh demo giúp người dùng và giảng viên/hội đồng test ngay không cần chuẩn bị ảnh
export const SAMPLE_PRODUCE_IMAGES = [
  {
    id: "sample-apple",
    name: "Táo Fuji đỏ tươi",
    url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    expectedResult: {
      produceName: "Táo Fuji Nhật",
      category: "Trái cây",
      freshnessScore: 98,
      grade: "Loại 1 (Đạt chuẩn Xuất khẩu)",
      gradeType: "grade-1",
      confidence: 99.2,
      defects: [
        { name: "Vết xước ngoài vỏ", severity: "Không đáng kể (<1%)", status: "safe" },
        { name: "Dấu hiệu nấm mốc / dập", severity: "Không phát hiện (0%)", status: "safe" },
        { name: "Độ bóng và sắc tố", severity: "Hoàn hảo (98%)", status: "safe" }
      ],
      estimatedShelfLife: "10 - 14 ngày (trong ngăn mát 4-8°C)",
      suggestedPrice: "85.000đ - 90.000đ/kg",
      aiRecommendation: "Nông sản đạt phẩm cấp cao nhất. Thích hợp đóng gói xuất khẩu hoặc bán tại các chuỗi siêu thị cao cấp."
    }
  },
  {
    id: "sample-orange",
    name: "Cam Sành tươi",
    url: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80",
    expectedResult: {
      produceName: "Cam Sành Miền Tây",
      category: "Trái cây",
      freshnessScore: 94,
      grade: "Loại 1 (Đạt chuẩn Xuất khẩu)",
      gradeType: "grade-1",
      confidence: 97.5,
      defects: [
        { name: "Đốm vỏ tự nhiên", severity: "Nhẹ (khoảng 2.5%)", status: "safe" },
        { name: "Dập úng tép", severity: "0% - Vỏ căng", status: "safe" },
        { name: "Độ mọng nước", severity: "Cao (>90%)", status: "safe" }
      ],
      estimatedShelfLife: "7 - 10 ngày (ở nhiệt độ phòng thoáng mát)",
      suggestedPrice: "45.000đ - 50.000đ/kg",
      aiRecommendation: "Cam có lượng nước dồi dào, vỏ mỏng, đạt tiêu chuẩn tiêu thụ tươi hoặc làm nước ép nguyên chất."
    }
  },
  {
    id: "sample-banana",
    name: "Chuối Tiêu có đốm nâu",
    url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
    expectedResult: {
      produceName: "Chuối Tiêu Hồng",
      category: "Trái cây",
      freshnessScore: 82,
      grade: "Loại 2 (Chuẩn Bán Lẻ / Cần dùng sớm)",
      gradeType: "grade-2",
      confidence: 95.8,
      defects: [
        { name: "Đốm nâu trứng cuốc", severity: "Phủ 12% vỏ (Đã chín muồi)", status: "warning" },
        { name: "Độ ngọt (Brix)", severity: "Tối đa (đường tự nhiên cao)", status: "safe" },
        { name: "Độ mềm của thịt", severity: "Mềm vừa phải, không thối", status: "safe" }
      ],
      estimatedShelfLife: "2 - 3 ngày (nên dùng ngay hoặc làm bánh)",
      suggestedPrice: "25.000đ - 30.000đ/nải",
      aiRecommendation: "Chuối ở đỉnh cao độ ngọt nhưng vỏ bắt đầu có đốm nâu. Khuyên dùng ngay, làm sinh tố hoặc sấy dẻo."
    }
  },
  {
    id: "sample-tomato",
    name: "Cà Chua Bi Cherry",
    url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    expectedResult: {
      produceName: "Cà Chua Bi Cherry Đỏ",
      category: "Rau củ",
      freshnessScore: 97,
      grade: "Loại 1 (Đạt chuẩn Xuất khẩu)",
      gradeType: "grade-1",
      confidence: 98.4,
      defects: [
        { name: "Vết nứt nẻ cuống", severity: "0% (Cuống xanh tươi)", status: "safe" },
        { name: "Độ đều màu", severity: "Đỏ đồng nhất (99%)", status: "safe" },
        { name: "Độ săn chắc", severity: "Căng bóng, đàn hồi tốt", status: "safe" }
      ],
      estimatedShelfLife: "7 - 10 ngày (ngăn mát)",
      suggestedPrice: "35.000đ - 40.000đ/hộp 500g",
      aiRecommendation: "Nông sản đạt chuẩn VietGAP cao cấp, thích hợp đóng hộp nhựa có lỗ thông khí bán lẻ."
    }
  }
];

/**
 * MÔ PHỎNG kết quả AI cho demo khi chưa nối backend (tuần 5 sẽ dùng aiApi.classify trong api.js).
 * Lưu ý kiến trúc: frontend KHÔNG gọi thẳng AI service — mọi request đi qua Spring Boot.
 * @param {File|string} imageInput - File đối tượng từ input hoặc URL ảnh
 * @param {string} [sampleId] - ID của mẫu ảnh nếu chọn từ danh sách demo
 * @returns {Promise<Object>} Kết quả phân tích chất lượng
 */
export async function classifyProduceImage(imageInput, sampleId = null) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả lập độ trễ xử lý Deep Learning Model

  // Nếu chọn từ ảnh mẫu có sẵn
  if (sampleId) {
    const sample = SAMPLE_PRODUCE_IMAGES.find((s) => s.id === sampleId);
    if (sample) {
      return {
        ...sample.expectedResult,
        analyzedAt: new Date().toLocaleTimeString("vi-VN")
      };
    }
  }

  // Nếu người dùng tải ảnh tùy ý lên từ máy
  const isFruit = Math.random() > 0.3;
  const score = Math.floor(Math.random() * 15) + 84; // 84 - 99 điểm
  const isGrade1 = score >= 92;

  return {
    produceName: isFruit ? "Nông sản Tươi (Dòng Trái cây)" : "Nông sản Xanh (Dòng Rau Củ)",
    category: isFruit ? "Trái cây" : "Rau củ",
    freshnessScore: score,
    grade: isGrade1 ? "Loại 1 (Đạt chuẩn Xuất khẩu)" : "Loại 2 (Chuẩn Bán Lẻ)",
    gradeType: isGrade1 ? "grade-1" : "grade-2",
    confidence: Number((Math.random() * 4 + 95).toFixed(1)),
    defects: [
      {
        name: "Tỷ lệ khuyết tật bề mặt",
        severity: isGrade1 ? "Dưới 2% (Rất ít)" : "Khoảng 4.5% (Có xước nhẹ)",
        status: isGrade1 ? "safe" : "warning"
      },
      {
        name: "Độ tươi & sắc tố diệp lục",
        severity: `${score}% - Đạt chỉ tiêu an toàn`,
        status: "safe"
      },
      {
        name: "Nguy cơ dập thối / vi sinh",
        severity: "Âm tính - Không phát hiện biến màu bất thường",
        status: "safe"
      }
    ],
    estimatedShelfLife: isGrade1 ? "7 - 12 ngày (bảo quản lạnh)" : "3 - 5 ngày",
    suggestedPrice: isGrade1 ? "Tăng 10-15% so với giá sàn" : "Bán theo giá niêm yết chuẩn",
    aiRecommendation: isGrade1
      ? "Nông sản có độ tươi vượt trội, màu sắc đồng đều, đủ điều kiện gắn tem VietGAP Loại 1."
      : "Nông sản đạt tiêu chuẩn tiêu dùng gia đình thông thường, khuyến khích vận chuyển nhanh.",
    analyzedAt: new Date().toLocaleTimeString("vi-VN")
  };
}
