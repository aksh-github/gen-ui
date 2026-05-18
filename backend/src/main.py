from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.routes.classify import router as classify_router
from src.api.routes.generate import router as generate_router


app = FastAPI()

# Allow CORS for frontend development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(classify_router)
app.include_router(generate_router)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Hello, world"}
