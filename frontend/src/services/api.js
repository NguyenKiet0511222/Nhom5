import axios from "axios";
import { MOCK_PRODUCTS } from "../data/mockProducts";
import { classifyProduceImage } from "./aiService";

// Cấu hình URL Backend từ file .env (mặc định trỏ về backend cục bộ)
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

// ==========================================
// 1. API Nông sản (Products)
// ==========================================
export const productApi = {
  // Lấy danh sách sản phẩm (có fallback mock data nếu chưa chạy backend)
  getAll: async () => {
    try {
      const response = await apiClient.get("/products");
      return response.data;
    } catch (error) {
      console.warn("Backend chưa sẵn sàng, sử dụng dữ liệu mẫu:", error.message);
      return MOCK_PRODUCTS;
    }
  },

  // Lấy chi tiết 1 sản phẩm
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.warn("Backend chưa sẵn sàng, sử dụng dữ liệu mẫu:", error.message);
      return MOCK_PRODUCTS.find((p) => p.id === Number(id));
    }
  }
};

// ==========================================
// 2. API AI Phân loại chất lượng qua ảnh
// ==========================================
export const aiApi = {
  /**
   * Gửi ảnh tới Backend AI để nhận diện phẩm cấp & độ tươi
   * @param {File|string} imageFile Hoặc sampleId
   */
  classify: async (imageInput, sampleId = null) => {
    // Nếu có backend AI thực tế
    if (imageInput instanceof File) {
      const formData = new FormData();
      formData.append("image", imageInput);

      try {
        const response = await apiClient.post("/ai/classify", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
      } catch (error) {
        console.warn("Backend AI chưa phản hồi, sử dụng phân tích mô phỏng:", error.message);
      }
    }

    // Fallback phân tích mô phỏng
    return await classifyProduceImage(imageInput, sampleId);
  }
};

// ==========================================
// 3. API Đơn hàng & Giỏ hàng (Orders)
// ==========================================
export const orderApi = {
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post("/orders", orderData);
      return response.data;
    } catch (error) {
      console.warn("Backend chưa sẵn sàng, mô phỏng đặt hàng thành công:", error.message);
      return {
        success: true,
        orderId: `AGRI-${Math.floor(100000 + Math.random() * 900000)}`,
        message: "Đặt hàng thành công (Mô phỏng)"
      };
    }
  }
};
