import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ScopedCssBaseline,
  TextField,
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
  Home,
  Search,
  Bell,
  Settings
} from "lucide-react";
import { useAuth } from "../context/useAuth";

const DRAWER_WIDTH = 248;

// Menu điều hướng theo vai trò — có trang mới thì thêm mục vào đây
const NAV_BY_ROLE = {
  seller: {
    title: "Kênh người bán",
    logoTitle: "Nông sản Việt",
    items: [
      { label: "Tổng quan", to: "/seller", icon: LayoutDashboard, end: true },
      { label: "Sản phẩm của tôi", to: "/seller/products", icon: Package },
      { label: "Đơn hàng", to: "/seller/orders", icon: ClipboardList }
    ]
  },
  admin: {
    title: "Quản trị hệ thống",
    logoTitle: "Nông sản Việt",
    items: [
      { label: "Tổng quan", to: "/admin", icon: LayoutDashboard, end: true },
      { label: "Sản phẩm", to: "/admin/products", icon: Package, badge: "14 chờ duyệt", badgeColor: "warning" },
      { label: "Đơn hàng", to: "/admin/orders", icon: ClipboardList, badge: "23 mới", badgeColor: "info" },
      { label: "Kiểm định AI", to: "/admin/ai-review", icon: ScanSearch, badge: "32", badgeColor: "error" },
      { label: "Người dùng", to: "/admin/users", icon: Users },
      { label: "Danh mục", to: "/admin/categories", icon: FolderTree }
    ],
    otherItems: [
      { label: "Cài đặt", to: "/admin/settings", icon: Settings }
    ]
  }
};

export default function DashboardLayout({ role }) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const nav = NAV_BY_ROLE[role] || NAV_BY_ROLE.admin;

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", bgcolor: "#fff" }}>
      {/* Brand Header */}
      <Toolbar sx={{ gap: 1.5, px: 2.5 }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 34,
            height: 34,
            borderRadius: 1.5,
            bgcolor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#16a34a"
          }}
        >
          <Sprout size={20} />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={800} lineHeight={1.1} sx={{ color: "#1e293b" }}>
            {nav.logoTitle}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {nav.title}
          </Typography>
        </Box>
      </Toolbar>
      <Divider />

      {/* Main Nav Items */}
      <List sx={{ flex: 1, px: 1.5, py: 1.5 }}>
        {nav.items.map(({ label, to, icon: Icon, end, badge, badgeColor }) => (
          <ListItemButton
            key={to}
            component={NavLink}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 1.5,
              mb: 0.8,
              py: 1,
              px: 1.5,
              color: "#475569",
              "&.active": {
                bgcolor: "#f1f5f9",
                color: "#0f172a",
                fontWeight: 700,
                borderLeft: "3px solid #0f172a",
                "& svg": { color: "#0f172a" }
              },
              "&:hover": { bgcolor: "#f8fafc" }
            }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: "#64748b" }}>
              <Icon size={18} />
            </ListItemIcon>
            <ListItemText
              primary={label}
              slotProps={{
                primary: {
                  fontSize: 13.5,
                  fontWeight: location.pathname === to ? 700 : 500
                }
              }}
            />
            {badge && (
              <Chip
                label={badge}
                size="small"
                color={badgeColor || "default"}
                sx={{
                  height: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  px: 0.5,
                  "& .MuiChip-label": { px: 1 }
                }}
              />
            )}
          </ListItemButton>
        ))}

        {/* Mục Khác (Admin only) */}
        {nav.otherItems && (
          <>
            <Box sx={{ px: 1.5, pt: 2, pb: 0.5 }}>
              <Typography variant="caption" sx={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
                Khác
              </Typography>
            </Box>
            {nav.otherItems.map(({ label, to, icon: Icon }) => (
              <ListItemButton
                key={to}
                component={NavLink}
                to={to}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: 1.5,
                  mb: 0.8,
                  py: 0.8,
                  px: 1.5,
                  color: "#64748b",
                  "&.active": { bgcolor: "#f1f5f9", color: "#0f172a" }
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: "#64748b" }}>
                  <Icon size={18} />
                </ListItemIcon>
                <ListItemText primary={label} slotProps={{ primary: { fontSize: 13.5 } }} />
              </ListItemButton>
            ))}
            <ListItemButton
              onClick={logout}
              sx={{
                borderRadius: 1.5,
                mb: 0.8,
                py: 0.8,
                px: 1.5,
                color: "#ef4444",
                "&:hover": { bgcolor: "#fef2f2" }
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: "#ef4444" }}>
                <LogOut size={18} />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" slotProps={{ primary: { fontSize: 13.5, fontWeight: 600 } }} />
            </ListItemButton>
          </>
        )}
      </List>

      <Divider />
      <Box sx={{ p: 1.5 }}>
        <ListItemButton component={Link} to="/" sx={{ borderRadius: 1.5 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <Home size={18} />
          </ListItemIcon>
          <ListItemText primary="Về trang khách hàng" slotProps={{ primary: { fontSize: 13 } }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <ScopedCssBaseline sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Top Header */}
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          borderBottom: 1,
          borderColor: "#e2e8f0",
          bgcolor: "#ffffff"
        }}
      >
        <Toolbar sx={{ gap: 2, px: { xs: 2, md: 3 } }}>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: "none" } }}
            aria-label="Mở menu"
          >
            <Menu size={20} />
          </IconButton>

          {/* Quick Search bar according to wireframe */}
          <Box sx={{ flex: 1, maxWidth: 420 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Tìm sản phẩm, đơn hàng, người bán..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={16} color="#94a3b8" />
                    </InputAdornment>
                  ),
                  sx: {
                    height: 36,
                    fontSize: 13,
                    bgcolor: "#f8fafc",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#e2e8f0" }
                  }
                }
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }} />

          {/* Notification Button with badge 5 */}
          <Button
            size="small"
            variant="outlined"
            startIcon={<Bell size={16} />}
            sx={{
              textTransform: "none",
              borderColor: "#e2e8f0",
              color: "#334155",
              fontSize: 13,
              borderRadius: 2,
              px: 1.5,
              height: 36
            }}
          >
            Thông báo{" "}
            <Box
              component="span"
              sx={{
                ml: 1,
                bgcolor: "#0f172a",
                color: "#fff",
                borderRadius: 1,
                px: 0.8,
                py: 0.1,
                fontSize: 11,
                fontWeight: 700
              }}
            >
              5
            </Box>
          </Button>

          {/* User Avatar Circle "HÀ" or User Name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#334155",
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 700,
                border: "2px solid #e2e8f0"
              }}
            >
              {user?.fullName
                ? user.fullName.split(" ").slice(-1)[0].substring(0, 2).toUpperCase()
                : "HÀ"}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: DRAWER_WIDTH } }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box", borderRightColor: "#e2e8f0" }
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content View */}
      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 }, minWidth: 0 }}>
        <Toolbar sx={{ minHeight: "56px !important" }} />
        <Outlet />
      </Box>
    </ScopedCssBaseline>
  );
}
