# AI service — phân loại chất lượng nông sản qua ảnh

Python + FastAPI, model MobileNetV2 (TensorFlow/Keras). Spring Boot gọi service này qua REST;
frontend **không** gọi thẳng.

> **Chưa biết gì về AI / lần đầu đọc phần này?** Đọc [`docs/GIAI-THICH-AI.md`](docs/GIAI-THICH-AI.md)
> trước — giải thích từng thuật ngữ, vì sao chọn MobileNetV2 (có so sánh số liệu), và bản đồ chỉ rõ
> từng bước nằm ở file/dòng nào. File README này chỉ là hướng dẫn thao tác nhanh.

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

## Huấn luyện model thật (baseline, mốc tuần 3)

Quyết định đã chốt (13/09/2026): **Transfer Learning MobileNetV2**, dataset khởi đầu **Kaggle "Fruits fresh and
rotten for classification"** (tuần 6 bổ sung ảnh rau củ Việt Nam tự chụp), train trên **Google Colab** (GPU miễn phí),
điểm "độ tươi %" hiển thị trên web = luôn dùng % tin cậy (confidence) model trả về cho nhãn nó chọn — không train
model hồi quy riêng.

1. Mở `notebooks/01_train_baseline_mobilenetv2.ipynb` bằng Google Colab (File > Upload notebook, hoặc mở trực tiếp
   từ GitHub sau khi push). Bật GPU: Runtime > Change runtime type > GPU.
2. Chạy tuần tự từng ô theo thứ tự — notebook có hướng dẫn tiếng Việt ở từng bước, kể cả cách lấy `kaggle.json`
   để tải dataset (kaggle.com/settings > API > Create New Token).
3. Notebook tự in ra danh sách lớp thực tế (`class_names`) sau khi tải dữ liệu — copy đúng danh sách này dán vào
   `LABELS` trong `app/classifier.py` (thứ tự phải khớp tuyệt đối, xem comment trong file).
4. Cuối notebook tải về `produce_classifier.keras` — copy vào `ai/models/produce_classifier.keras` (đã gitignore,
   chia sẻ file này cho nhóm qua Drive, không qua Git vì nặng).

## Nạp model đã có sẵn (không cần train lại)

1. Copy file `.keras` vào `ai/models/produce_classifier.keras`.
2. `pip install -r requirements-model.txt` (cài thêm TensorFlow) rồi chạy lại uvicorn. `GET /health` phải báo
   `model_loaded: true`.
3. Kiểm tra `LABELS` trong `app/classifier.py` khớp đúng thứ tự với lúc train model đó — sai thứ tự thì server
   vẫn chạy bình thường nhưng trả nhãn sai hoàn toàn dù "% tin cậy" vẫn cao.

## Lộ trình (theo tài liệu nhóm)

| Tuần | Việc AI |
|------|---------|
| 2 | EDA + tiền xử lý dataset baseline |
| 3 | Train baseline MobileNetV2 (6 lớp), có accuracy |
| 4 | Đóng gói FastAPI chạy local (khung này) |
| 5 | Nối Spring Boot ↔ AI service |
| 6 | Mở rộng dataset rau củ, train v2 |
| 7 | Ngưỡng tin cậy + hàng chờ admin, lưu nhãn admin sửa để retrain |
