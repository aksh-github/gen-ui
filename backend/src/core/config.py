from pydantic import BaseModel


class Settings(BaseModel):
    stream_chunk_size: int = 8


settings = Settings()
