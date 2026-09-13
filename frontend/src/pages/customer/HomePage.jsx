import { Link } from "react-router-dom";
import { MOCK_PRODUCTS } from "../data/mockProducts";
import ProductCard from "../components/ProductCard";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Truck,
  Layers,
  CheckCircle2
} from "lucide-react";

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} className="text-amber" />
              <span>Tiên phong công nghệ Nông sản AI 4.0</span>
            </div>

            <h1 className="hero-title">
              Nông Sản Sạch Tươi Ngon, <br />
              <span className="text-gradient">Kiểm Định Bằng Trí Tuệ Nhân Tạo</span>
            </h1>

            <p className="hero-subtitle">
              Mỗi trái cây, củ quả và rau xanh tại AgriFresh đều được quét thị giác máy
              tính (AI Vision) để đánh giá độ tươi, phát hiện khuyết tật vỏ và phân
              loại phẩm cấp minh bạch trước khi đến tay gia đình bạn.
            </p>

            <div className="hero-cta-group">
              <Link to="/products" className="btn-primary">
                <span>Mua sắm ngay</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/ai-check" className="btn-secondary">
                <Cpu size={18} className="text-emerald" />
                <span>Thử nghiệm AI Kiểm định</span>
              </Link>
            </div>

            <div className="hero-trust-row">
              <div className="trust-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>100% Nông sản VietGAP</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Minh bạch phẩm cấp</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Đổi trả nếu dập úng</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card-glass">
              <img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80"
                alt="Nông sản tươi xanh được kiểm định"
                className="hero-main-img"
              />
              <div className="floating-ai-tag">
                <div className="ai-tag-icon">
                  <Cpu size={20} />
                </div>
                <div className="ai-tag-info">
                  <span className="tag-title">AI Vision Scanner</span>
                  <span className="tag-status">Độ tươi: 98.6% • Loại 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="features-section">
        <div className="section-container">
          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon-circle">
                <Cpu size={24} />
              </div>
              <h3>Phân Loại Bằng AI</h3>
              <p>
                Mô hình thị giác máy tính nhận diện chính xác độ chín, màu vỏ và
                khuyết tật li ti trên bề mặt quả.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle">
                <ShieldCheck size={24} />
              </div>
              <h3>Chuẩn VietGAP & GlobalGAP</h3>
              <p>
                Liên kết trực tiếp với các hợp tác xã nhà vườn tại Đà Lạt, Tiền Giang,
                Đắk Lắk canh tác hữu cơ.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle">
                <Layers size={24} />
              </div>
              <h3>Minh Bạch Phẩm Cấp</h3>
              <p>
                Phân định rõ ràng Loại 1 (Xuất khẩu) và Loại 2 (Bán lẻ tiêu chuẩn) giúp
                người tiêu dùng mua đúng giá trị.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle">
                <Truck size={24} />
              </div>
              <h3>Giao Nhanh Trong 2H</h3>
              <p>
                Quy trình chuỗi lạnh khép kín giữ trọn dinh dưỡng và độ tươi nguyên
                từ nông trường đến bàn ăn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-container">
          <div className="section-header-row">
            <div>
              <div className="section-kicker">Nông sản tươi trong ngày</div>
              <h2 className="section-heading">Sản Phẩm Đạt Chuẩn Kiểm Định AI</h2>
            </div>
            <Link to="/products" className="view-all-link">
              <span>Xem tất cả ({MOCK_PRODUCTS.length} sản phẩm)</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Teaser Banner */}
      <section className="ai-teaser-section">
        <div className="section-container">
          <div className="ai-teaser-banner">
            <div className="teaser-content">
              <div className="teaser-badge">
                <Sparkles size={16} /> Công nghệ đột phá của đề tài
              </div>
              <h2>Bạn Có Nông Sản Cần Kiểm Định Chất Lượng?</h2>
              <p>
                Trải nghiệm ngay tính năng tải ảnh quả/rau để mô hình AI phân tích tự động:
                chấm điểm độ tươi, phát hiện vết xước, đánh giá phẩm cấp Loại 1 hay Loại 2
                và gợi ý hạn sử dụng tức thì.
              </p>
              <Link to="/ai-check" className="btn-ai-action">
                <Cpu size={18} />
                <span>Bắt đầu kiểm tra ảnh ngay</span>
              </Link>
            </div>
            <div className="teaser-preview">
              <div className="scan-simulator-card">
                <div className="scan-line"></div>
                <img
                  src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80"
                  alt="AI Scan demo"
                />
                <div className="scan-overlay-info">
                  <div className="scan-badge">Đang quét... Phân loại: 98%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
