FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    netcat-traditional \
    postgresql-client \
    curl \
        build-essential \
    python3-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Ensure alembic is configured
ENV PYTHONUNBUFFERED=1

EXPOSE 8001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8001/health || exit 1

# Default command (overridden in docker-compose)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]
