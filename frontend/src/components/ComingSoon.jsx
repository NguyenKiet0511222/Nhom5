import { useLocation } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import { Construction } from "lucide-react";

// Trang giữ chỗ cho các mục dashboard chưa làm (theo lộ trình tuần 4-7)
export default function ComingSoon() {
  const { pathname } = useLocation();

  return (
    <Paper variant="outlined" sx={{ p: 5, textAlign: "center" }}>
      <Box sx={{ color: "warning.main", mb: 1.5, display: "flex", justifyContent: "center" }}>
        <Construction size={40} />
      </Box>
      <Typography variant="h6" fontWeight={700}>
        Trang đang được xây dựng
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Đường dẫn <code>{pathname}</code> sẽ có nội dung ở các tuần tiếp theo.
      </Typography>
    </Paper>
  );
}
