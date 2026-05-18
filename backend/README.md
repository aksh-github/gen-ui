# Backend

This folder contains a small FastAPI API with one hello-world route.

## Requirements

- Python 3.11 or newer
- `pip`

## Project Layout

```text
backend/
├── requirements.txt
├── src/
│   ├── main.py
│   ├── api/
│   │   ├── routes/
│   │   └── schemas/
│   ├── core/
│   ├── models/
│   └── services/
└── .venv/
```

## Setup

Create the virtual environment:

```bash
python3 -m venv .venv
```

Activate it:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt uvicorn
```

## Run the API

Start the server from the `backend` directory:

```bash
uvicorn src.main:app --host 127.0.0.1 --port 8000
```

If you are running locally outside the sandbox and want auto-reload during development, you can use:

```bash
uvicorn src.main:app --host 127.0.0.1 --port 8000 --reload
```

## Verify

Open the API root in your browser or use `curl`:

```bash
curl http://127.0.0.1:8000/
```

You should get:

```json
{"message":"Hello, world"}
```

## Streaming Endpoint

`POST /generate` accepts JSON with a `text` field and returns Server-Sent Events:

```bash
curl -N -X POST http://127.0.0.1:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"text":"hello from the stream"}'
```

Each chunk is emitted as an SSE `data:` message.

## Intent Classification

`POST /classify` accepts JSON with a `text` field and returns a simple intent label:

```bash
curl -X POST http://127.0.0.1:8000/classify \
  -H "Content-Type: application/json" \
  -d '{"text":"hello there"}'
```

Example response:

```json
{"intent":"greeting","confidence":0.89}
```

## App Entry Point

The FastAPI application lives in [src/main.py](src/main.py).
