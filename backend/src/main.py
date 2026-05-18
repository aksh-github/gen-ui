from fastapi import FastAPI

from src.api.routes.classify import router as classify_router
from src.api.routes.generate import router as generate_router


app = FastAPI()

app.include_router(classify_router)
app.include_router(generate_router)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Hello, world"}
