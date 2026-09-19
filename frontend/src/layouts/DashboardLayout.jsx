import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ScopedCssBaseline,
  Toolbar,
  Typography
} from "@mui/material";
import {
  Menu,
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  FolderTree,
  ScanSearch,
  Sprout,
  LogOut,
  Home
} from "lucide-react";
import { useAuth } from "../context/useAuth";

const DRAWER_WIDTH = 248;

// Menu điều hướng theo vai trò — có trang mới thì thêm mục vào đây
const NAV_BY_ROLE = {
  seller: {
    title: "Kênh người bán",
    items: [
      { label: "Tổng quan", to: "/seller", icon: LayoutDashboard, end: true },
      { label: "Sản phẩm của tôi", to: "/seller/products", icon: Package },
      { label: "Đơn hàng", to: "/seller/orders", icon: ClipboardList }
    ]
  },
  admin: {
    title: "Quản trị hệ thống",
    items: [
      { label: "Tổng quan", to: "/admin", icon: LayoutDashboard, end: true },
      { label: "Duyệt sản phẩm", to: "/admin/products", icon: Package },
      { label: "Kiểm định AI", to: "/admin/ai-review", icon: ScanSearch },
      { label: "Đơn hàng", to: "/admin/orders", icon: ClipboardList },
      { label: "Người dùng", to: "/admin/users", icon: Users },
      { label: "Danh mục", to: "/admin/categories", icon: FolderTree }
    ]
  }
};

// Layout MUI dùng chung cho Seller và Admin: AppBar + Drawer trái + nội dung (Outlet)
export default function DashboardLayout({ role }) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = NAV_BY_ROLE[role];

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar sx={{ gap: 1 }}>
        <Sprout size={22} color="#16a34a" />
        <Box>
          <Typography variant="subtitle1" fontWeight={800} lineHeight={1.1}>
            AgriFresh
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {nav.title}
          </Typography>
        </Box>
      </Toolbar>
      <Divider />

      <List sx={{ flex: 1, px: 1 }}>
        {nav.items.map(({ label, to, icon: Icon, end }) => (
          <ListItemButton
            key={to}
            component={NavLink}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.active": { bgcolor: "primary.main", color: "#fff", "& svg": { color: "#fff" } }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Icon size={18} />
            </ListItemIcon>
            <ListItemText primary={label} slotProps={{ primary: { fontWeight: 600, fontSize: 14 } }} />
          </ListItemButton>
        ))}
      </List>

      <Divider />
      <Box sx={{ p: 1 }}>
        <ListItemButton component={Link} to="/" sx={{ borderRadius: 2 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Home size={18} />
          </ListItemIcon>
          <ListItemText primary="Về trang khách hàng" slotProps={{ primary: { fontSize: 14 } }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <ScopedCssBaseline sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          borderBottom: 1,
          borderColor: "divider"
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: "none" } }}
            aria-label="Mở menu"
          >
            <Menu size={22} />
          </IconButton>
          <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
            {nav.title}
          </Typography>

          {user ? (
            <>
              <Chip size="small" label={user.fullName || user.email} />
              <Button size="small" color="inherit" startIcon={<LogOut size={16} />} onClick={logout}>
                Đăng xuất
              </Button>
            </>
          ) : (
            <Button size="small" variant="outlined" component={Link} to="/login">
              Đăng nhập
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        {/* Mobile: drawer trượt ra */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: DRAWER_WIDTH } }}
        >
          {drawerContent}
        </Drawer>
        {/* Desktop: drawer cố định */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" }
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 }, minWidth: 0 }}>
        <Toolbar /> {/* chừa chỗ cho AppBar fixed */}
        <Outlet />
      </Box>
    </ScopedCssBaseline>
  );
}
