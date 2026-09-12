import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/useCart";
import { ShoppingBag, Sparkles, Sprout, Menu, X } from "lucide-react";

export default function Navbar() {
  const { totalCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon-wrapper">
            <Sprout className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">AgriFresh</span>
            <span className="brand-badge">
              <Sparkles size={12} /> AI Tech
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
          >
            Trang chủ
          </Link>
          <Link
            to="/products"
            className={`nav-link ${isActive("/products") ? "active" : ""}`}
          >
            Cửa hàng Nông sản
          </Link>
          <Link
            to="/ai-check"
            className={`nav-link ai-nav-link ${isActive("/ai-check") ? "active" : ""}`}
          >
            <Sparkles size={16} className="sparkle-icon" />
            AI Kiểm định chất lượng
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="header-actions">
          <button
            type="button"
            className="cart-button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Mở giỏ hàng"
          >
            <ShoppingBag size={20} />
            <span className="cart-label">Giỏ hàng</span>
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-panel">
          <Link
            to="/"
            className={`mobile-nav-link ${isActive("/") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Trang chủ
          </Link>
          <Link
            to="/products"
            className={`mobile-nav-link ${isActive("/products") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Cửa hàng Nông sản
          </Link>
          <Link
            to="/ai-check"
            className={`mobile-nav-link ai-link ${isActive("/ai-check") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Sparkles size={16} /> AI Kiểm định chất lượng
          </Link>
        </div>
      )}
    </header>
  );
}
