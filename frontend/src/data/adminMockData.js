// Dữ liệu mẫu chuẩn cho hệ thống quản trị Admin theo Wireframe nhóm 5 (Tuần 1 - Nguyễn Văn Hà)

export const ADMIN_STATS = {
  revenueToday: 12450000,
  revenueDiffPercent: "+8% so với hôm qua",
  newOrders: 37,
  pendingOrdersConfirmation: 23,
  pendingProducts: 14,
  pendingSellersCount: 9,
  aiWarningRottenImages: 5,
  requiresManualCheck: "cần kiểm tra thủ công"
};

export const REVENUE_CHART_7_DAYS = [
  { day: "T2", label: "Thứ Hai", revenue: 4200000, display: "4.2tr" },
  { day: "T3", label: "Thứ Ba", revenue: 11000000, display: "11.0tr" },
  { day: "T4", label: "Thứ Tư", revenue: 7800000, display: "7.8tr" },
  { day: "T5", label: "Thứ Năm", revenue: 14100000, display: "14.1tr" },
  { day: "T6", label: "Thứ Sáu", revenue: 12500000, display: "12.5tr" },
  { day: "T7", label: "Thứ Bảy", revenue: 17200000, display: "17.2tr" },
  { day: "CN", label: "Chủ Nhật", revenue: 15600000, display: "15.6tr" }
];

export const REVENUE_CHART_30_DAYS = [
  { day: "01/09", revenue: 8200000 },
  { day: "05/09", revenue: 12100000 },
  { day: "10/09", revenue: 9800000 },
  { day: "15/09", revenue: 16500000 },
  { day: "20/09", revenue: 18200000 },
  { day: "25/09", revenue: 21000000 },
  { day: "30/09", revenue: 19400000 }
];

export const NEW_REGISTERED_SELLERS = [
  {
    id: "seller-1",
    name: "Vườn rau Tâm An",
    location: "Lâm Đồng - hôm nay",
    status: "Chờ xác minh",
    verified: false
  },
  {
    id: "seller-2",
    name: "Nông trại Ba Vì",
    location: "Hà Nội - hôm qua",
    status: "Chờ xác minh",
    verified: false
  },
  {
    id: "seller-3",
    name: "HTX Xoài Cao Lãnh",
    location: "Đồng Tháp - 2 ngày trước",
    status: "Đã xác minh",
    verified: true
  }
];

export const ADMIN_PRODUCTS = [
  {
    id: "SP-01187",
    name: "Cà chua bi Đà Lạt",
    category: "Rau củ / Củ quả",
    seller: "Vườn rau Tâm An",
    price: 45000,
    unit: "kg",
    stock: 120,
    aiLabel: {
      text: "Hỏng 78%",
      type: "rotten",
      confidence: 0.78,
      severity: "error"
    },
    status: "Chờ duyệt",
    createdAt: "12/09/2026",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "SP-01186",
    name: "Xoài cát Hoà Lộc",
    category: "Trái cây / Nhiệt đới",
    seller: "HTX Xoài Cao Lãnh",
    price: 65000,
    unit: "kg",
    stock: 300,
    aiLabel: {
      text: "Tươi 96%",
      type: "fresh",
      confidence: 0.96,
      severity: "success"
    },
    status: "Chờ duyệt",
    createdAt: "12/09/2026",
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "SP-01185",
    name: "Rau muống hữu cơ",
    category: "Rau củ / Rau ăn lá",
    seller: "Vườn rau Tâm An",
    price: 12000,
    unit: "bó",
    stock: 80,
    aiLabel: {
      text: "Tươi 93%",
      type: "fresh",
      confidence: 0.93,
      severity: "success"
    },
    status: "Chờ duyệt",
    createdAt: "12/09/2026",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "SP-01184",
    name: "Chuối tiêu Hưng Yên",
    category: "Trái cây / Nhiệt đới",
    seller: "Nông trại Ba Vì",
    price: 25000,
    unit: "nải",
    stock: 60,
    aiLabel: {
      text: "Không chắc 64%",
      type: "uncertain",
      confidence: 0.64,
      severity: "warning"
    },
    status: "Chờ duyệt",
    createdAt: "11/09/2026",
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "SP-01183",
    name: "Khoai tây Đà Lạt",
    category: "Rau củ / Củ quả",
    seller: "Nông trại Ba Vì",
    price: 28000,
    unit: "kg",
    stock: 500,
    aiLabel: {
      text: "Tươi 97%",
      type: "fresh",
      confidence: 0.97,
      severity: "success"
    },
    status: "Chờ duyệt",
    createdAt: "11/09/2026",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "SP-01182",
    name: "Cam sành Hàm Yên",
    category: "Trái cây / Nhiệt đới",
    seller: "HTX Cam Hàm Yên",
    price: 35000,
    unit: "kg",
    stock: 200,
    aiLabel: {
      text: "Hỏng 85%",
      type: "rotten",
      confidence: 0.85,
      severity: "error"
    },
    status: "Chờ duyệt",
    createdAt: "11/09/2026",
    imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "SP-01181",
    name: "Nấm hương khô",
    category: "Thực phẩm khô",
    seller: "Đặc sản Tây Bắc",
    price: 180000,
    unit: "kg",
    stock: 40,
    aiLabel: {
      text: "Chưa kiểm định",
      type: "unverified",
      confidence: 0,
      severity: "default"
    },
    status: "Chờ duyệt",
    createdAt: "10/09/2026",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "SP-01180",
    name: "Ớt chuông Đà Lạt",
    category: "Rau củ / Củ quả",
    seller: "Vườn rau Tâm An",
    price: 55000,
    unit: "kg",
    stock: 90,
    aiLabel: {
      text: "Tươi 91%",
      type: "fresh",
      confidence: 0.91,
      severity: "success"
    },
    status: "Chờ duyệt",
    createdAt: "10/09/2026",
    imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&auto=format&fit=crop&q=80"
  }
];

export const DETAILED_PRODUCT_REVIEW = {
  id: "SP-01187",
  name: "Cà chua bi Đà Lạt",
  status: "Chờ duyệt",
  category: "Rau củ / Củ quả",
  price: 45000,
  unit: "kg",
  stock: 120,
  origin: "Đà Lạt, Lâm Đồng",
  description:
    "Cà chua bi trồng nhà kính, thu hoạch trong ngày, không thuốc trừ sâu, quả mọng đỏ đều và vị ngọt thanh đặc trưng. Đạt tiêu chuẩn VietGAP phục vụ tiêu dùng sạch.",
  seller: {
    name: "Vườn rau Tâm An",
    avatar: "TA",
    joinDate: "06/2026",
    approvedCount: 18,
    rejectedCount: 2,
    rating: 4.6
  },
  aiReport: {
    totalScanned: "4 / 4",
    freshCountText: "3 (tin cậy trung bình 92%)",
    rottenCountText: "1 ảnh · 78%",
    recognizedProduce: "Cà chua (khớp danh mục)",
    systemSuggestion: "Yêu cầu người bán thay ảnh số 3"
  },
  images: [
    {
      id: 1,
      title: "Ảnh 1 - Quả mặt trên",
      badge: "Tươi 96%",
      isRotten: false,
      url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Ảnh 2 - Rổ thu hoạch",
      badge: "Tươi 91%",
      isRotten: false,
      url: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Ảnh 3 - Vết thâm cuống nghi hỏng",
      badge: "Hỏng 78%",
      isRotten: true,
      url: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      title: "Ảnh 4 - Cắt ngang quả",
      badge: "Tươi 89%",
      isRotten: false,
      url: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&auto=format&fit=crop&q=80"
    }
  ],
  quickReasons: [
    "Ảnh không rõ",
    "Nghi ngờ hàng hỏng",
    "Thiếu thông tin",
    "Giá bất thường",
    "Sai danh mục"
  ],
  history: [
    {
      title: "Người bán đăng sản phẩm",
      time: "12/09/2026 08:40",
      actor: "Vườn rau Tâm An"
    },
    {
      title: "AI kiểm định 4 ảnh – 1 ảnh nghi hỏng",
      time: "12/09/2026 08:41",
      actor: "Hệ thống"
    },
    {
      title: "Chờ admin duyệt",
      time: "Hiện tại",
      actor: "Đang chờ"
    }
  ]
};

export const ADMIN_ORDERS = [
  {
    id: "DH-2026-01187",
    customer: "Trần Thị Mai",
    seller: "Vườn rau Tâm An +1",
    itemCount: 3,
    total: 304000,
    paymentMethod: "Chuyển khoản",
    status: "Đang giao",
    date: "12/09 09:14"
  },
  {
    id: "DH-2026-01186",
    customer: "Lê Văn Nam",
    seller: "HTX Xoài Cao Lãnh",
    itemCount: 1,
    total: 195000,
    paymentMethod: "COD",
    status: "Chờ xác nhận",
    date: "12/09 08:52"
  },
  {
    id: "DH-2026-01185",
    customer: "Phạm Thu Hà",
    seller: "Nông trại Ba Vì",
    itemCount: 2,
    total: 83000,
    paymentMethod: "Ví điện tử",
    status: "Đang chuẩn bị",
    date: "12/09 08:20"
  },
  {
    id: "DH-2026-01184",
    customer: "Ngô Minh Tuấn",
    seller: "Vườn rau Tâm An",
    itemCount: 4,
    total: 156000,
    paymentMethod: "COD",
    status: "Chờ xác nhận",
    date: "12/09 07:45"
  },
  {
    id: "DH-2026-01183",
    customer: "Đỗ Thị Lan",
    seller: "Đặc sản Tây Bắc",
    itemCount: 1,
    total: 180000,
    paymentMethod: "Chuyển khoản",
    status: "Hoàn thành",
    date: "11/09 18:10"
  },
  {
    id: "DH-2026-01182",
    customer: "Bùi Quang Huy",
    seller: "HTX Cam Hàm Yên +2",
    itemCount: 5,
    total: 412000,
    paymentMethod: "Chuyển khoản",
    status: "Đang giao",
    date: "11/09 16:33"
  },
  {
    id: "DH-2026-01181",
    customer: "Vũ Thị Hoa",
    seller: "Nông trại Ba Vì",
    itemCount: 2,
    total: 76000,
    paymentMethod: "COD",
    status: "Đã huỷ",
    date: "11/09 15:02"
  },
  {
    id: "DH-2026-01180",
    customer: "Hoàng Văn Sơn",
    seller: "Vườn rau Tâm An",
    itemCount: 3,
    total: 121000,
    paymentMethod: "Ví điện tử",
    status: "Hoàn thành",
    date: "11/09 11:47"
  }
];

export const DETAILED_ORDER_DH_01187 = {
  id: "DH-2026-01187",
  createdAt: "12/09/2026 09:14",
  status: "Đang giao",
  currentStep: 3, // 0: Đặt hàng, 1: Đã xác nhận, 2: Đang chuẩn bị, 3: Đang giao, 4: Hoàn thành
  customer: {
    name: "Trần Thị Mai",
    phone: "0912 345 678",
    email: "mai.tran@gmail.com",
    orderCount: 7
  },
  deliveryAddress: {
    fullAddress: "Số 12, ngõ 45 Nguyễn Chí Thanh, Đống Đa, Hà Nội",
    note: "Giao giờ hành chính · Ghi chú: gọi trước 10 phút"
  },
  paymentAndShipping: {
    method: "Chuyển khoản",
    status: "Đã thanh toán",
    carrier: "GHN",
    trackingNumber: "1A2B3C4D"
  },
  items: [
    {
      id: 1,
      name: "Cà chua bi Đà Lạt",
      code: "SP-01187",
      aiLabel: "AI: Tươi 92%",
      seller: "Vườn rau Tâm An",
      quantity: 2,
      unit: "kg",
      unitPrice: 45000,
      totalPrice: 90000,
      imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Xoài cát Hoà Lộc",
      code: "SP-01186",
      aiLabel: null,
      seller: "HTX Xoài Cao Lãnh",
      quantity: 3,
      unit: "kg",
      unitPrice: 65000,
      totalPrice: 195000,
      imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=100&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Rau muống hữu cơ",
      code: "SP-01185",
      aiLabel: null,
      seller: "Vườn rau Tâm An",
      quantity: 2,
      unit: "bó",
      unitPrice: 12000,
      totalPrice: 24000,
      imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&auto=format&fit=crop&q=80"
    }
  ],
  pricing: {
    subtotal: 309000,
    shippingFee: 25000,
    discount: -30000,
    voucherCode: "FRESH10",
    total: 304000
  },
  history: [
    {
      time: "12/09/2026 14:02",
      title: "Đơn vị vận chuyển đã lấy hàng – mã vận đơn GHN 1A2B3C4D",
      actor: "Hệ thống"
    },
    {
      time: "12/09/2026 10:30",
      title: "Người bán xác nhận đủ hàng",
      actor: "Vườn rau Tâm An"
    },
    {
      time: "12/09/2026 09:40",
      title: "Admin xác nhận đơn",
      actor: "Nguyễn Văn Hà"
    },
    {
      time: "12/09/2026 09:14",
      title: "Khách đặt hàng, thanh toán chuyển khoản thành công",
      actor: "Trần Thị Mai"
    }
  ]
};
