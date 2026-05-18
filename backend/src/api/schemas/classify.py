from pydantic import BaseModel

from src.models.intent import IntentLabel


class ClassifyRequest(BaseModel):
    text: str


class ClassifyResponse(BaseModel):
    intent: IntentLabel
    confidence: float
