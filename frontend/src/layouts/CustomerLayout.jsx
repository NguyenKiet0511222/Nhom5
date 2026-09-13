import { Outlet } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCart } from "../context/useCart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

// Layout cho khu khách hàng: Navbar + nội dung trang + giỏ hàng + Footer
export default function CustomerLayout() {
  const { lastAddedItem } = useCart();

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      {/* Slide-over Giỏ hàng toàn cục */}
      <CartDrawer />

      {/* Thông báo nhanh khi vừa thêm nông sản vào giỏ */}
      {lastAddedItem && (
        <div className="toast-notification">
          <CheckCircle size={18} className="text-emerald" />
          <span>
            Đã thêm <strong>{lastAddedItem}</strong> vào giỏ hàng!
          </span>
        </div>
      )}

      <Footer />
    </div>
  );
}
