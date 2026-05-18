from fastapi import APIRouter

from src.api.schemas.classify import ClassifyRequest, ClassifyResponse
from src.services.intent_service import IntentClassifier


router = APIRouter()
classifier = IntentClassifier()


@router.post("/classify", response_model=ClassifyResponse)
def classify(payload: ClassifyRequest) -> ClassifyResponse:
    return classifier.classify(payload.text)
