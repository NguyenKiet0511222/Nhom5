import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import CustomerLayout from "./layouts/CustomerLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ComingSoon from "./components/ComingSoon";
import HomePage from "./pages/customer/HomePage";
import ProductsPage from "./pages/customer/ProductsPage";
import AIClassifierPage from "./pages/customer/AIClassifierPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SellerDashboardPage from "./pages/seller/SellerDashboardPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import "./App.css";

// TODO (tuần 3): khi có API đăng nhập, bọc khu seller/admin bằng RequireAuth:
//   <Route path="/seller" element={<RequireAuth roles={["SELLER", "ADMIN"]}><DashboardLayout role="seller" /></RequireAuth>}>
//   <Route path="/admin"  element={<RequireAuth roles={["ADMIN"]}><DashboardLayout role="admin" /></RequireAuth>}>

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Khu khách hàng + trang đăng nhập/đăng ký (CSS thuần, có Navbar/Footer/Giỏ hàng) */}
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/ai-check" element={<AIClassifierPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Khu người bán (MUI dashboard) */}
            <Route path="/seller" element={<DashboardLayout role="seller" />}>
              <Route index element={<SellerDashboardPage />} />
              <Route path="*" element={<ComingSoon />} />
            </Route>

            {/* Khu quản trị (MUI dashboard) */}
            <Route path="/admin" element={<DashboardLayout role="admin" />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="*" element={<ComingSoon />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
