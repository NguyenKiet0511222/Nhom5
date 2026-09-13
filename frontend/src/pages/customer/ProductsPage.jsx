import { useState, useMemo } from "react";
import { MOCK_PRODUCTS, CATEGORIES, AI_GRADES } from "../../data/mockProducts";
import ProductCard from "../../components/ProductCard";
import { Search, Filter, Sparkles, RefreshCw } from "lucide-react";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // 1. Lọc theo danh mục
      const matchCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      // 2. Lọc theo phẩm cấp AI
      const matchGrade =
        selectedGrade === "all" || product.aiGrade.includes(selectedGrade);

      // 3. Lọc theo tìm kiếm từ khóa
      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.origin.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchCategory && matchGrade && matchQuery;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "freshness") return b.freshnessScore - a.freshnessScore;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedGrade, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedGrade("all");
    setSortBy("default");
  };

  return (
    <div className="products-page">
      <div className="page-header-banner">
        <div className="section-container">
          <div className="page-badge">
            <Sparkles size={14} /> Danh mục nông sản tuyển chọn
          </div>
          <h1>Cửa Hàng Nông Sản Sạch</h1>
          <p>
            Tất cả sản phẩm đều được kiểm định độ tươi và phân hạng phẩm cấp minh bạch
            bằng công nghệ AI trước khi bày bán.
          </p>
        </div>
      </div>

      <div className="section-container main-content-wrapper">
        {/* Controls: Search, Filters, Sort */}
        <div className="filters-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Tìm theo tên quả, rau, vùng trồng (Đà Lạt, Tiền Giang...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Tìm kiếm sản phẩm"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
              >
                ×
              </button>
            )}
          </div>

          <div className="sort-box">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sắp xếp sản phẩm"
            >
              <option value="default">Sắp xếp: Mặc định</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="freshness">Độ tươi: Cao nhất</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-groups-row">
          <div className="filter-group">
            <span className="filter-label">
              <Filter size={14} /> Danh mục:
            </span>
            <div className="pill-group">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`filter-pill ${selectedCategory === cat.id ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">
              <Sparkles size={14} /> Phẩm cấp AI:
            </span>
            <div className="pill-group">
              {AI_GRADES.map((grade) => (
                <button
                  key={grade.id}
                  type="button"
                  className={`filter-pill grade-pill ${
                    selectedGrade === grade.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedGrade(grade.id)}
                >
                  {grade.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Count & Reset Button */}
        <div className="results-summary-row">
          <span>
            Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm nông sản phù hợp
          </span>
          {(selectedCategory !== "all" ||
            selectedGrade !== "all" ||
            searchQuery !== "" ||
            sortBy !== "default") && (
            <button
              type="button"
              className="reset-filters-btn"
              onClick={handleResetFilters}
            >
              <RefreshCw size={14} /> Đặt lại bộ lọc
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products-state">
            <p>Không tìm thấy nông sản nào phù hợp với bộ lọc hiện tại.</p>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleResetFilters}
            >
              Xem lại tất cả sản phẩm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
