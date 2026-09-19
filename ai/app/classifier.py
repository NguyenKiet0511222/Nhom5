"""Bộ phân loại nông sản: nạp model Keras nếu có, không thì trả kết quả mock ổn định.

Nhãn baseline (tuần 3) theo dataset "Fruits fresh and rotten for classification" trên Kaggle:
6 lớp = 3 loại quả x {fresh, rotten}. Tuần 6 mở rộng thêm rau củ -> chỉ cần sửa LABELS
và train lại, contract API không đổi.
"""

import hashlib
import io
import os
from pathlib import Path

import numpy as np
from PIL import Image

# QUAN TRỌNG: thứ tự này phải khớp CHÍNH XÁC với train_ds.class_names in ra ở
# notebooks/01_train_baseline_mobilenetv2.ipynb (Bước 4) — image_dataset_from_directory
# gán index 0..5 theo thứ tự BẢNG CHỮ CÁI của tên thư mục lớp, không phải thứ tự khai báo ở đây.
# Train xong, copy đúng danh sách notebook in ra và dán đè vào đây.
LABELS = [
    "fresh_apple",
    "fresh_banana",
    "fresh_orange",
    "rotten_apple",
    "rotten_banana",
    "rotten_orange",
]
IMG_SIZE = (224, 224)  # input chuẩn của MobileNetV2


class ProduceClassifier:
    def __init__(self) -> None:
        self.model = None
        self.version = "mock-0.1"
        self._preprocess_input = None

        model_path = Path(os.getenv("MODEL_PATH", "models/produce_classifier.keras"))
        if model_path.exists():
            # Import TensorFlow ở đây (chậm, nặng) để chế độ mock không cần cài TF
            import tensorflow as tf

            self.model = tf.keras.models.load_model(model_path)
            self.version = os.getenv("MODEL_VERSION", "mobilenetv2-v1")
            # PHẢI dùng đúng hàm tiền xử lý lúc train (xem notebook Bước 5), nếu không
            # model vẫn chạy nhưng đoán sai lung tung dù báo "%" tin cậy cao.
            self._preprocess_input = tf.keras.applications.mobilenet_v2.preprocess_input

    @property
    def is_loaded(self) -> bool:
        return self.model is not None

    def predict(self, image_bytes: bytes) -> dict:
        if self.model is None:
            scores = self._mock_scores(image_bytes)
        else:
            scores = self.model.predict(self._preprocess(image_bytes), verbose=0)[0]

        best = int(np.argmax(scores))
        label = LABELS[best]
        condition, produce_type = label.split("_", 1)

        return {
            "label": label,
            "produce_type": produce_type,       # apple / banana / orange ...
            "condition": condition,             # fresh / rotten
            "confidence": round(float(scores[best]), 4),
            "all_scores": {name: round(float(s), 4) for name, s in zip(LABELS, scores)},
            "model_version": self.version,
        }

    def _preprocess(self, image_bytes: bytes) -> np.ndarray:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize(IMG_SIZE)
        arr = np.asarray(img, dtype=np.float32)
        arr = self._preprocess_input(arr)  # scale về [-1, 1] giống lúc train MobileNetV2
        return np.expand_dims(arr, axis=0)

    @staticmethod
    def _mock_scores(image_bytes: bytes) -> np.ndarray:
        # Kết quả giả lập nhưng ổn định: cùng một ảnh luôn cho cùng kết quả (seed từ hash ảnh)
        seed = int.from_bytes(hashlib.sha256(image_bytes).digest()[:4], "big")
        rng = np.random.default_rng(seed)
        return rng.dirichlet(np.full(len(LABELS), 0.3))


classifier = ProduceClassifier()
