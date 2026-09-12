import { Sprout, Sparkles, ShieldCheck, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand-col">
          <div className="footer-brand">
            <Sprout className="footer-icon" size={24} />
            <span className="footer-title">AgriFresh AI</span>
          </div>
          <p className="footer-desc">
            Nền tảng thương mại điện tử nông sản sạch thế hệ mới. Ứng dụng công nghệ Trí tuệ nhân tạo (Computer Vision) để phân loại độ tươi, phát hiện khuyết tật và minh bạch nguồn gốc sản phẩm.
          </p>
          <div className="footer-tech-pill">
            <Sparkles size={14} /> AI Quality Assurance 4.0
          </div>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Điều hướng</h4>
          <ul className="footer-menu">
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/products">Cửa hàng nông sản</Link>
            </li>
            <li>
              <Link to="/ai-check">AI Kiểm định chất lượng</Link>
            </li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Tiêu chuẩn kiểm định</h4>
          <ul className="footer-menu">
            <li className="flex-item">
              <ShieldCheck size={16} className="text-emerald" /> Tiêu chuẩn VietGAP
            </li>
            <li className="flex-item">
              <ShieldCheck size={16} className="text-emerald" /> Phân loại Deep Learning
            </li>
            <li className="flex-item">
              <ShieldCheck size={16} className="text-emerald" /> Nguồn gốc từ nhà vườn
            </li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Đề tài nghiên cứu</h4>
          <p className="footer-project-info">
            Hệ thống website thương mại điện tử Nông sản & Thực phẩm tích hợp mô hình AI phân loại phẩm cấp qua hình ảnh.
          </p>
          <div className="team-badge">Nhóm 5 - Đồ án thực tập / chuyên ngành</div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© {new Date().getFullYear()} AgriFresh AI. All rights reserved.</p>
          <p className="made-with">
            Phát triển với <Heart size={14} className="text-red" fill="currentColor" /> cho nền nông nghiệp Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
