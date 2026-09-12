import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { useCart } from "./context/useCart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AIClassifierPage from "./pages/AIClassifierPage";
import { CheckCircle } from "lucide-react";
import "./App.css";

function AppContent() {
  const { lastAddedItem } = useCart();

  return (
    <div className="app-layout">
      {/* Header Điều hướng */}
      <Navbar />

      {/* Nội dung trang theo Router */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/ai-check" element={<AIClassifierPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Slide-over Giỏ hàng toàn cục */}
      <CartDrawer />

      {/* Thông báo nhanh khi vừa thêm nông sản vào giỏ */}
      {lastAddedItem && (
        <div className="toast-notification">
          <CheckCircle size={18} className="text-emerald" />
          <span>Đã thêm <strong>{lastAddedItem}</strong> vào giỏ hàng!</span>
        </div>
      )}

      {/* Chân trang */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}
