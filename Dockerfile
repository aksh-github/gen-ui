FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose your chosen custom internal port
EXPOSE 5050

HEALTHCHECK CMD curl --fail http://localhost:5050/chat/_stcore/health || exit 1

# CRITICAL: Added port=5050 and baseUrlPath=chat
ENTRYPOINT ["streamlit", "run", "app.py", "--server.port=5050", "--server.address=0.0.0.0", "--server.baseUrlPath=chat"]
