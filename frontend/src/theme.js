import { createTheme } from "@mui/material/styles";

// Theme MUI cho khu vực Seller / Admin / Auth — màu đồng bộ với biến CSS trong index.css
// (khu khách hàng vẫn dùng CSS thuần, KHÔNG dùng MUI ở đó)
export const muiTheme = createTheme({
  palette: {
    primary: { main: "#16a34a", dark: "#15803d", light: "#4ade80", contrastText: "#ffffff" },
    secondary: { main: "#0284c7" },
    warning: { main: "#f59e0b" },
    error: { main: "#ef4444" },
    background: { default: "#f8fafc", paper: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#64748b" }
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    button: { textTransform: "none", fontWeight: 600 }
  },
  shape: { borderRadius: 12 }
});
