import { useState } from "react";
import { useCart } from "../context/useCart";
import { Check, Plus, ShieldCheck, Sparkles, MapPin } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {/* AI Grade Badge */}
        <div className="ai-grade-tag">
          <Sparkles size={13} />
          <span>{product.aiGrade}</span>
        </div>

        {/* Freshness Rating Tag */}
        <div className="freshness-score-tag">
          {product.freshnessScore}% Tươi mới
        </div>
      </div>

      <div className="product-content">
        <div className="product-meta">
          <span className="cert-pill">
            <ShieldCheck size={12} /> {product.certification}
          </span>
          <span className="origin-text">
            <MapPin size={12} /> {product.origin}
          </span>
        </div>

        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-footer">
          <div className="product-price-block">
            <span className="product-price">{formatPrice(product.price)}</span>
            <span className="product-unit">/{product.unit}</span>
          </div>

          <button
            type="button"
            className={`add-cart-btn ${isAdded ? "added" : ""}`}
            onClick={handleAdd}
            aria-label={`Thêm ${product.name} vào giỏ`}
          >
            {isAdded ? (
              <>
                <Check size={16} /> Đã thêm
              </>
            ) : (
              <>
                <Plus size={16} /> Chọn mua
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
