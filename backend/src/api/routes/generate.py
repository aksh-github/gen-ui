import asyncio
from collections.abc import AsyncGenerator

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from src.api.schemas.generate import GenerateRequest
from src.core.config import settings


router = APIRouter()


@router.post("/generate")
async def generate(payload: GenerateRequest) -> StreamingResponse:
    async def stream_text() -> AsyncGenerator[str, None]:
        for index in range(0, len(payload.text), settings.stream_chunk_size):
            chunk = payload.text[index : index + settings.stream_chunk_size]
            yield f"data: {chunk}\n\n"
            await asyncio.sleep(0)

    return StreamingResponse(stream_text(), media_type="text/event-stream")
