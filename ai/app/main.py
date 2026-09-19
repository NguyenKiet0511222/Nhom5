"""AI service phân loại chất lượng nông sản qua ảnh (FastAPI).

Chạy:  uvicorn app.main:app --reload --port 8000
Docs:  http://localhost:8000/docs

Chỉ Spring Boot gọi service này (app.ai.base-url ở backend). Frontend KHÔNG gọi thẳng.
"""

from fastapi import FastAPI, File, HTTPException, UploadFile

from .classifier import LABELS, classifier

app = FastAPI(
    title="Nhóm 5 - AI Service phân loại nông sản",
    version="0.1.0",
    description="Nhận ảnh nông sản, trả về loại nông sản + tươi/hỏng + độ tin cậy.",
)


@app.get("/health")
def health() -> dict:
    return {
        "status": "UP",
        "model_loaded": classifier.is_loaded,
        "model_version": classifier.version,
        "labels": LABELS,
    }


@app.post("/classify")
async def classify(image: UploadFile = File(...)) -> dict:
    """Contract với Spring Boot — giữ nguyên tên field khi đổi model:

    {
      "label": "fresh_apple",
      "produce_type": "apple",
      "condition": "fresh",          # fresh | rotten
      "confidence": 0.9312,          # 0..1 -> backend so với ngưỡng auto-accept
      "all_scores": {"fresh_apple": 0.93, ...},
      "model_version": "mock-0.1"
    }
    """
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File tải lên phải là ảnh (jpg/png/webp)")

    image_bytes = await image.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="File ảnh rỗng")

    try:
        return classifier.predict(image_bytes)
    except Exception as exc:  # ảnh hỏng, không decode được...
        raise HTTPException(status_code=422, detail=f"Không xử lý được ảnh: {exc}") from exc
