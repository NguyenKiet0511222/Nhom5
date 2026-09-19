import {
  Alert,
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { Package, Users, ClipboardList, ScanSearch } from "lucide-react";
import StatCardGrid from "../../components/StatCardGrid";

// Số liệu mẫu — thay bằng API GET /api/admin/dashboard khi làm tuần 6
const MOCK_STATS = [
  { label: "Sản phẩm chờ duyệt", value: 8, icon: Package, color: "warning.main" },
  { label: "Hàng chờ AI (tin cậy thấp)", value: 2, icon: ScanSearch, color: "error.main" },
  { label: "Đơn hàng hôm nay", value: 27, icon: ClipboardList, color: "secondary.main" },
  { label: "Người dùng", value: 154, icon: Users, color: "primary.main" }
];

// Minh hoạ luồng cốt lõi: AI gắn nhãn -> admin duyệt dựa trên nhãn + độ tin cậy
const MOCK_PENDING = [
  { id: 101, name: "Táo Fuji Đà Lạt", seller: "HTX Đà Lạt Xanh", label: "Táo · Tươi", confidence: 0.96 },
  { id: 102, name: "Chuối tiêu hồng", seller: "Nông trại Ba Bể", label: "Chuối · Tươi", confidence: 0.71 },
  { id: 103, name: "Cam sành Cái Bè", seller: "Vườn cam Tư Lành", label: "Cam · Hỏng", confidence: 0.88 }
];

const AUTO_ACCEPT_THRESHOLD = 0.85; // trùng app.ai.auto-accept-threshold ở backend, admin chỉnh ở tuần 7

export default function AdminDashboardPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={800} gutterBottom>
        Tổng quan hệ thống
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Khung giao diện quản trị (lộ trình tuần 6). Số liệu bên dưới là dữ liệu mẫu.
      </Alert>

      <StatCardGrid stats={MOCK_STATS} />

      <Paper variant="outlined" sx={{ mt: 3, overflowX: "auto" }}>
        <Box sx={{ px: 2, pt: 2 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Sản phẩm chờ duyệt (gợi ý từ AI)
          </Typography>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Người bán</TableCell>
              <TableCell>Nhãn AI</TableCell>
              <TableCell align="right">Tin cậy</TableCell>
              <TableCell>Đề xuất</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_PENDING.map((p) => {
              const autoAccept = p.confidence >= AUTO_ACCEPT_THRESHOLD;
              return (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.seller}</TableCell>
                  <TableCell>{p.label}</TableCell>
                  <TableCell align="right">{Math.round(p.confidence * 100)}%</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      color={autoAccept ? "success" : "warning"}
                      label={autoAccept ? "AI tự chấp nhận" : "Cần admin kiểm định"}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
