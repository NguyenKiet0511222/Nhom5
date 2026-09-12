import { useState } from "react";
import { aiApi } from "../services/api";
import { SAMPLE_PRODUCE_IMAGES } from "../services/aiService";
import {
  UploadCloud,
  Sparkles,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Coins,
  ShieldCheck,
  RefreshCw,
  Image as ImageIcon
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AIClassifierPage() {
  const [selectedImage, setSelectedImage] = useState(SAMPLE_PRODUCE_IMAGES[0].url);
  const [selectedSampleId, setSelectedSampleId] = useState(SAMPLE_PRODUCE_IMAGES[0].id);
  const [imageFile, setImageFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Xử lý chọn ảnh mẫu demo
  const handleSelectSample = (sample) => {
    setSelectedImage(sample.url);
    setSelectedSampleId(sample.id);
    setImageFile(null);
    setAnalysisResult(null);
  };

  // Xử lý tải ảnh từ máy tính
  const handleFileUpload = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Vui lòng tải lên định dạng hình ảnh hợp lệ (JPG, PNG, WebP)!");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      setSelectedSampleId(null);
      setImageFile(file);
      setAnalysisResult(null);
    };
    reader.readAsDataURL(file);
  };

  // Xử lý bấm phân tích AI
  const handleRunAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const result = await aiApi.classify(
        imageFile || selectedImage,
        selectedSampleId
      );
      setAnalysisResult(result);
    } catch (err) {
      console.error("Lỗi phân tích AI:", err);
      alert("Có lỗi trong quá trình phân tích hình ảnh. Vui lòng thử lại!");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="ai-classifier-page">
      {/* Header Banner */}
      <div className="ai-header-banner">
        <div className="section-container">
          <div className="ai-badge-header">
            <Sparkles size={16} /> Computer Vision & Deep Learning
          </div>
          <h1>AI Phân Loại & Đánh Giá Chất Lượng Nông Sản</h1>
          <p>
            Mô hình thị giác máy tính quét hình ảnh quả/rau để phát hiện vết khuyết tật,
            chấm điểm độ tươi tự động và phân loại phẩm cấp theo tiêu chuẩn xuất khẩu.
          </p>
        </div>
      </div>

      <div className="section-container ai-container">
        {/* Step 1: Chọn ảnh mẫu hoặc tải ảnh */}
        <div className="ai-layout-grid">
          {/* Cột trái: Upload & Xem trước ảnh */}
          <div className="ai-card upload-column">
            <div className="card-header-bar">
              <span className="step-num">1</span>
              <h3>Tải ảnh hoặc chọn mẫu thử nghiệm</h3>
            </div>

            {/* Quick Demo Samples */}
            <div className="sample-selector-block">
              <label className="field-label">
                <ImageIcon size={15} /> Ảnh mẫu có sẵn (bấm để thử ngay):
              </label>
              <div className="sample-thumbnails-grid">
                {SAMPLE_PRODUCE_IMAGES.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    className={`sample-thumb-btn ${
                      selectedSampleId === sample.id ? "active" : ""
                    }`}
                    onClick={() => handleSelectSample(sample)}
                  >
                    <img src={sample.url} alt={sample.name} />
                    <span className="sample-name-label">{sample.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Drag & Drop Area */}
            <div
              className={`dropzone-area ${isDragging ? "dragging" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
              }}
            >
              <input
                type="file"
                id="produce-image-input"
                accept="image/*"
                className="hidden-file-input"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="produce-image-input" className="dropzone-label">
                <UploadCloud size={36} className="upload-icon" />
                <span className="dropzone-title">
                  Kéo thả ảnh vào đây hoặc <strong>chọn từ máy tính</strong>
                </span>
                <span className="dropzone-hint">
                  Hỗ trợ: JPG, PNG, WebP (Ảnh rõ nét, đủ ánh sáng để đạt độ chính xác cao nhất)
                </span>
              </label>
            </div>

            {/* Image Preview Window */}
            {selectedImage && (
              <div className="image-preview-wrapper">
                <div className="preview-container">
                  <img
                    src={selectedImage}
                    alt="Preview nông sản"
                    className="preview-img"
                  />
                  {isAnalyzing && (
                    <div className="scanner-scanline">
                      <div className="laser-beam"></div>
                      <div className="scanner-text">
                        <Cpu size={18} className="spin-icon" />
                        <span>Mạng nơ-ron đang phân tích đa tầng...</span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="run-ai-btn"
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw size={18} className="spin-icon" />
                      <span>Đang chấm điểm chất lượng...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Phân tích chất lượng bằng AI</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Cột phải: Kết quả phân tích AI */}
          <div className="ai-card results-column">
            <div className="card-header-bar">
              <span className="step-num">2</span>
              <h3>Báo cáo kiểm định chất lượng AI</h3>
            </div>

            {analysisResult ? (
              <div className="ai-report-content">
                {/* Result Top Badge */}
                <div className="report-summary-card">
                  <div className="produce-id-row">
                    <div>
                      <span className="produce-sub">Chủng loại nhận diện</span>
                      <h2 className="produce-title">{analysisResult.produceName}</h2>
                    </div>
                    <div className="grade-badge-huge">
                      <ShieldCheck size={20} />
                      <span>{analysisResult.grade}</span>
                    </div>
                  </div>

                  {/* Freshness Bar */}
                  <div className="freshness-bar-container">
                    <div className="bar-label-row">
                      <span>Chỉ số độ tươi mới (Freshness Score)</span>
                      <span className="score-number">
                        {analysisResult.freshnessScore}%
                      </span>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${analysisResult.freshnessScore}%` }}
                      ></div>
                    </div>
                    <div className="confidence-text">
                      Độ tin cậy của thuật toán: <strong>{analysisResult.confidence}%</strong>
                    </div>
                  </div>
                </div>

                {/* Defect Scan Table */}
                <div className="defect-analysis-block">
                  <h4 className="block-title">
                    <AlertTriangle size={16} /> Kiểm tra khuyết tật & bề mặt vỏ
                  </h4>
                  <div className="defect-items-list">
                    {analysisResult.defects.map((d, index) => (
                      <div key={index} className="defect-row">
                        <div className="defect-info">
                          <span className="defect-name">{d.name}</span>
                          <span className="defect-severity">{d.severity}</span>
                        </div>
                        <span
                          className={`defect-status-pill ${
                            d.status === "safe" ? "status-safe" : "status-warning"
                          }`}
                        >
                          {d.status === "safe" ? (
                            <>
                              <CheckCircle2 size={13} /> An toàn
                            </>
                          ) : (
                            <>
                              <AlertTriangle size={13} /> Lưu ý
                            </>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Storage & Commercial Suggestions */}
                <div className="ai-insights-grid">
                  <div className="insight-box">
                    <div className="insight-header">
                      <Clock size={16} className="text-emerald" />
                      <span>Thời gian bảo quản tối ưu</span>
                    </div>
                    <p>{analysisResult.estimatedShelfLife}</p>
                  </div>

                  <div className="insight-box">
                    <div className="insight-header">
                      <Coins size={16} className="text-amber" />
                      <span>Mức giá đề xuất thu mua/bán</span>
                    </div>
                    <p>{analysisResult.suggestedPrice}</p>
                  </div>
                </div>

                {/* Recommendation Box */}
                <div className="recommendation-card">
                  <div className="rec-badge">
                    <Sparkles size={14} /> Khuyến nghị từ hệ thống
                  </div>
                  <p>{analysisResult.aiRecommendation}</p>
                </div>

                {/* Action Buttons */}
                <div className="report-actions">
                  <Link to="/products" className="btn-primary">
                    Xem sản phẩm đạt chuẩn trên cửa hàng
                  </Link>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => {
                      setAnalysisResult(null);
                    }}
                  >
                    Kiểm tra lượt mới
                  </button>
                </div>
              </div>
            ) : (
              <div className="waiting-state">
                <div className="empty-ai-icon">
                  <Cpu size={56} />
                </div>
                <h4>Sẵn sàng phân tích hình ảnh</h4>
                <p>
                  Hãy chọn một mẫu ảnh nông sản bên cạnh hoặc tải lên hình ảnh của bạn, sau đó bấm nút{" "}
                  <strong>"Phân tích chất lượng bằng AI"</strong> để xem bảng báo cáo chi tiết.
                </p>
                <div className="guide-checkmarks">
                  <div>
                    <CheckCircle2 size={16} className="text-emerald" /> Phân biệt trái cây Loại 1 vs Loại 2
                  </div>
                  <div>
                    <CheckCircle2 size={16} className="text-emerald" /> Nhận diện vết sâu đốm vỏ chính xác
                  </div>
                  <div>
                    <CheckCircle2 size={16} className="text-emerald" /> Gợi ý thời gian bảo quản theo nhiệt độ
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
