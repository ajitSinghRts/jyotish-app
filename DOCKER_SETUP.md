# Complete Docker Setup Guide - Jyotish App

## Overview

This guide provides complete instructions for running the Jyotish App with Docker Compose. The application includes:

- **MySQL 8.0**: Database server
- **Redis 7**: Cache and message broker
- **FastAPI Backend**: API server
- **Celery Worker**: Background task queue
- **React + Vite Frontend**: Web interface

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 1.29 or higher)
- 4GB RAM minimum
- 2GB disk space

### Installation

```bash
# macOS (using Homebrew)
brew install docker docker-compose

# Linux (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install docker.io docker-compose

# Windows
Download and install Docker Desktop from https://www.docker.com/products/docker-desktop
```

## Quick Start (3 Steps)

### Step 1: Setup Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your values (optional for development)
vim .env
```

### Step 2: Build and Start All Services

```bash
# Build all Docker images
docker-compose build

# Start all services in the background
docker-compose up -d

# Or view logs while starting (recommended first time)
docker-compose up
```

### Step 3: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8001
- **API Docs**: http://localhost:8001/docs (Swagger UI)
- **MySQL**: localhost:3306
- **Redis**: localhost:6379

## Detailed Service Configuration

### 1. MySQL Database

**Container Name**: `jyotish_mysql`
**Port**: 3306
**Default Credentials**:
- Root Password: `rootpass123`
- Database: `astroos`
- User: `astro`
- Password: `astropass123`

**Health Check**: MySQL health check runs every 10 seconds

```bash
# Connect to MySQL
mysql -h localhost -u astro -p
# Password: astropass123

# Or using docker exec
docker exec jyotish_mysql mysql -u astro -pastropass123 astroos
```

### 2. Redis Cache

**Container Name**: `jyotish_redis`
**Port**: 6379
**Purpose**: Caching, message broker for Celery

```bash
# Connect to Redis
redis-cli -h localhost -p 6379

# Or using docker exec
docker exec jyotish_redis redis-cli ping
```

### 3. FastAPI Backend

**Container Name**: `jyotish_backend`
**Port**: 8001
**Services**:
- REST API endpoints
- Alembic migrations (automatic on startup)
- FastAPI documentation at http://localhost:8001/docs

**Startup Process**:
1. Waits for MySQL to be healthy
2. Waits for Redis to be available
3. Runs database migrations
4. Starts FastAPI server with hot reload

```bash
# View backend logs
docker logs jyotish_backend

# Follow backend logs
docker logs -f jyotish_backend
```

### 4. Celery Worker

**Container Name**: `jyotish_celery`
**Purpose**: Background task processing
**Dependencies**: Redis (message broker), Backend

**Celery Worker Features**:
- Automatic task retry
- Task logging
- Status tracking

```bash
# View celery logs
docker logs jyotish_celery

# Follow celery logs with task details
docker logs -f jyotish_celery
```

### 5. React + Vite Frontend

**Container Name**: `jyotish_frontend`
**Port**: 5173
**Features**:
- Hot module replacement (HMR)
- Development mode enabled
- API integration with backend

```bash
# View frontend logs
docker logs jyotish_frontend
```

## Common Docker Compose Commands

### Starting Services

```bash
# Start all services in background
docker-compose up -d

# Start specific service
docker-compose up -d mysql

# Start with verbose output
docker-compose up --verbose

# Build images before starting
docker-compose up -d --build
```

### Stopping Services

```bash
# Stop all running services
docker-compose stop

# Stop specific service
docker-compose stop backend

# Stop and remove containers
docker-compose down

# Remove everything including volumes
docker-compose down -v
```

### Viewing Logs

```bash
# View logs from all services
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs from specific service
docker-compose logs backend

# View last 100 lines
docker-compose logs -f --tail=100
```

### Checking Service Status

```bash
# View running containers
docker-compose ps

# View container resource usage
docker stats
```

### Executing Commands in Containers

```bash
# Execute bash in backend container
docker exec -it jyotish_backend bash

# Run Python command in backend
docker exec jyotish_backend python -c "import app; print('Working')"

# Run MySQL query
docker exec jyotish_mysql mysql -u astro -pastropass123 astroos -e "SHOW TABLES;"
```

## Troubleshooting

### Service Port Already in Use

```bash
# Find what's using the port (macOS/Linux)
lsof -i :8001
lsof -i :3306
lsof -i :6379

# Kill the process
kill -9 <PID>

# Or change ports in docker-compose.yml
# Change "8001:8001" to "8002:8001" to use port 8002
```

### MySQL Connection Refused

```bash
# Check MySQL is running
docker-compose ps mysql

# Check MySQL logs
docker logs jyotish_mysql

# Restart MySQL
docker-compose restart mysql
```

### Backend Can't Connect to MySQL

```bash
# Check network
docker network ls

# Check backend logs
docker logs jyotish_backend

# Verify database URL in .env
echo $DATABASE_URL
```

### Frontend Can't Reach Backend

```bash
# Check VITE_BACKEND_URL in .env
# Should be http://backend:8001 for Docker internal
# Should be http://localhost:8001 for browser

# Check network connectivity
docker exec jyotish_frontend curl http://backend:8001/docs
```

### Clear Everything and Start Fresh

```bash
# Remove all containers, networks, and volumes
docker-compose down -v

# Rebuild and start fresh
docker-compose build --no-cache
docker-compose up -d

# Check all services are running
docker-compose ps
```

## Production Deployment

### Security Considerations

1. **Change Passwords**: Update all default credentials in .env
2. **Use Strong Secret Key**: Generate a strong SECRET_KEY
3. **Set DEBUG=false**: Disable debug mode in production
4. **Use Environment-Specific Configs**: Create .env.production

### Performance Optimization

```bash
# Limit container memory usage
docker-compose up -d -m 2g backend

# Set resource limits in docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
```

## Useful Aliases

Add these to your `.bashrc` or `.zshrc`:

```bash
alias dc='docker-compose'
alias dcup='docker-compose up -d'
alias dcdown='docker-compose down'
alias dclogs='docker-compose logs -f'
alias dcps='docker-compose ps'
alias dcsh='docker-compose exec'
```

## Next Steps

- Explore API documentation: http://localhost:8001/docs
- Check frontend at: http://localhost:5173
- Review backend code: `./backend/app/`
- Review frontend code: `./frontend/src/`
- Check logs for any errors

## Support

For issues:
1. Check logs: `docker-compose logs`
2. Verify ports are available
3. Ensure .env is properly configured
4. Check Docker version compatibility
