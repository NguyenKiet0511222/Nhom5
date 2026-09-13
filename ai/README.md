# AI service — phân loại chất lượng nông sản qua ảnh

Python + FastAPI, model MobileNetV2 (TensorFlow/Keras). Spring Boot gọi service này qua REST;
frontend **không** gọi thẳng.

## Chạy local

```bash
cd ai
python -m venv .venv
.venv\Scripts\activate          # Windows  (Mac/Linux: source .venv/bin/activate)
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

- Swagger: http://localhost:8000/docs
- `GET /health` — trạng thái + model đã nạp chưa
- `POST /classify` — form-data field `image` → nhãn AI (xem docstring trong `app/main.py`)

Chưa có file model → service chạy **chế độ mock** (kết quả ổn định theo ảnh) để web dev không bị chặn.

## Nạp model thật

1. Train trên Colab/Kaggle (notebook để trong `notebooks/`), lưu `model.save("produce_classifier.keras")`.
2. Copy file vào `ai/models/produce_classifier.keras` (thư mục này đã gitignore — chia sẻ qua Drive).
3. `pip install -r requirements-model.txt` rồi chạy lại uvicorn. `GET /health` phải báo `model_loaded: true`.
4. Kiểm tra `LABELS` và `_preprocess()` trong `app/classifier.py` khớp với notebook train.

## Lộ trình (theo tài liệu nhóm)

| Tuần | Việc AI |
|------|---------|
| 2 | EDA + tiền xử lý dataset baseline |
| 3 | Train baseline MobileNetV2 (6 lớp), có accuracy |
| 4 | Đóng gói FastAPI chạy local (khung này) |
| 5 | Nối Spring Boot ↔ AI service |
| 6 | Mở rộng dataset rau củ, train v2 |
| 7 | Ngưỡng tin cậy + hàng chờ admin, lưu nhãn admin sửa để retrain |
