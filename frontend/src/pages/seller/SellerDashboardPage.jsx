import { Alert, Box, Typography } from "@mui/material";
import { Package, Clock, ClipboardList, ScanSearch } from "lucide-react";
import StatCardGrid from "../../components/StatCardGrid";

// Số liệu mẫu — thay bằng API GET /api/seller/dashboard khi làm tuần 4-5
const MOCK_STATS = [
  { label: "Sản phẩm đang bán", value: 12, icon: Package, color: "primary.main" },
  { label: "Chờ admin duyệt", value: 3, icon: Clock, color: "warning.main" },
  { label: "Đơn hàng mới", value: 5, icon: ClipboardList, color: "secondary.main" },
  { label: "Ảnh chờ AI kiểm định", value: 1, icon: ScanSearch, color: "error.main" }
];

export default function SellerDashboardPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={800} gutterBottom>
        Tổng quan cửa hàng
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Khung giao diện người bán (lộ trình tuần 4). Số liệu bên dưới là dữ liệu mẫu.
      </Alert>
      <StatCardGrid stats={MOCK_STATS} />
    </Box>
  );
}
