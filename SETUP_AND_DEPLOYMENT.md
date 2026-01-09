# AstroOS Production Setup & Deployment Guide

## 🚀 Complete Integration & Deployment Instructions

This guide provides step-by-step instructions to deploy the fully integrated AstroOS system (Backend + Frontend) to production.

## System Architecture

```
┌─────────────────┐
│  React Frontend │
│  (Port 5173)    │
└────────┬────────┘
         │ API Calls
         ▼
┌─────────────────────────────┐
│   FastAPI Backend           │
│   (Port 8001)               │
│   - Authentication          │
│   - Astrology Calculations  │
│   - User Profiles           │
└────────┬────────────────────┘
         │
    ┌────┴──────┬──────────────┐
    ▼           ▼              ▼
  MySQL      Redis        OpenAI/Gemini
  (3306)     (6379)       APIs
```

## Part 1: Development Environment Setup

### 1.1 Prerequisites
- Python 3.9+ installed
- Node.js 18+ installed
- Docker & Docker Compose installed
- Git installed
- Terminal/Command Line access

### 1.2 Clone & Navigate
```bash
# Clone the backend repository
git clone https://github.com/raghavrecharge/Jyotish.git
cd Jyotish

# Clone the frontend (if separate)
git clone https://github.com/raghavrecharge/Jyotish-Ai.git frontend
```

### 1.3 Backend Setup (Local Development)
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate

# Copy environment template
cp .env.example .env

# Edit .env with your values
# nano .env  (or use your editor)

# Install dependencies
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start backend server
uvicorn app.main:app --reload --port 8001
```

### 1.4 Frontend Setup (Local Development)
```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
echo 'VITE_API_URL=http://localhost:8001/api' > .env.local

# Start dev server
npm run dev
```

### 1.5 Database Setup (Docker)
```bash
# Start MySQL
docker run -d --name astroos-mysql \\
  -e MYSQL_ROOT_PASSWORD=root \\
  -e MYSQL_DATABASE=astroos_db \\
  -e MYSQL_USER=astroos_user \\
  -e MYSQL_PASSWORD=astroos_pass \\
  -p 3306:3306 \\
  mysql:8.0

# Start Redis
docker run -d --name astroos-redis \\
  -p 6379:6379 \\
  redis:7-alpine
```

## Part 2: Docker Compose Deployment

### 2.1 Quick Start with Docker Compose
```bash
# From project root
cd Jyotish

# Copy environment template
cp backend/.env.example backend/.env

# Edit environment variables
# Update SECRET_KEY, API keys, etc.

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 2.2 Access Services
- Frontend: http://localhost:5173
- Backend API: http://localhost:8001
- API Docs: http://localhost:8001/docs
- ReDoc: http://localhost:8001/redoc
- Database: localhost:3306
- Redis: localhost:6379

## Part 3: Production Deployment

### 3.1 Environment Configuration

Create `.env` in backend/ with production values:

```bash
# Security - GENERATE NEW VALUES!
SECRET_KEY=$(openssl rand -hex 32)

# Database (Use managed service like AWS RDS, Google Cloud SQL, or DigitalOcean)
MYSQL_HOST=prod-db.example.com
MYSQL_USER=prod_user
MYSQL_PASSWORD=generate_strong_password
MYSQL_DB=astroos_prod

# Redis (Use managed service like AWS ElastiCache)
REDIS_URL=redis://prod-redis.example.com:6379

# Environment
ENVIRONMENT=production
DEBUG=False

# CORS - Update with your domain
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# AI Services
OPENAI_API_KEY=sk-prod-key
GEMINI_API_KEY=prod-gemini-key
```

### 3.2 Deployment Options

#### Option A: Docker on EC2/VPS
```bash
# On your server
git clone <your-repo>
cd Jyotish

# Copy production env
cp backend/.env.example backend/.env
# Edit with production values

# Build and run
docker-compose -f docker-compose.yml up -d

# Setup SSL with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d yourdomain.com
```

#### Option B: Kubernetes
```bash
# Create namespace
kubectl create namespace astroos

# Deploy using Helm or kubectl manifests
kubectl apply -f k8s/ -n astroos

# Check deployment
kubectl get pods -n astroos
```

#### Option C: Platform Services
- Heroku: Deploy with `git push heroku main`
- AWS: Use ECS + RDS + ElastiCache
- Google Cloud: Use Cloud Run + Cloud SQL + Memorystore
- DigitalOcean: Use App Platform + Managed Databases

### 3.3 Frontend Deployment

#### Build Production Bundle
```bash
cd frontend
npm run build

# Output: dist/ folder with optimized assets
```

#### Deploy to CDN
- Vercel: `npm install -g vercel && vercel`
- Netlify: Drag & drop `dist` folder
- AWS S3 + CloudFront: `aws s3 sync dist/ s3://bucket-name/`
- GitHub Pages: Configure in package.json

## Part 4: Monitoring & Maintenance

### 4.1 Health Checks
```bash
# Backend health
curl http://localhost:8001/api/health

# Database connectivity
mysql -h localhost -u astroos_user -p -e "SELECT 1;"

# Redis connectivity
redis-cli ping
```

### 4.2 Logging
```bash
# View backend logs
docker-compose logs -f backend

# View frontend logs
docker-compose logs -f frontend

# Access logs
docker-compose logs -f mysql
```

### 4.3 Scaling
```bash
# Increase backend instances
docker-compose up -d --scale backend=3

# Load balance with nginx (configure nginx.conf)
# Point to http://backend:8001
```

## Part 5: Troubleshooting

### Issue: Backend won't start
```bash
# Check logs
docker-compose logs backend

# Verify environment variables
cat backend/.env

# Check database connectivity
mysql -h localhost -u astroos_user -p astroos_db
```

### Issue: Frontend shows CORS errors
```bash
# Update backend .env
CORS_ORIGINS=http://localhost:5173,https://yourdomain.com

# Restart backend
docker-compose restart backend
```

### Issue: Database migrations fail
```bash
# Reset and migrate
docker-compose exec backend alembic downgrade base
docker-compose exec backend alembic upgrade head
```

## Part 6: Security Checklist

- [ ] Change default database password
- [ ] Generate new SECRET_KEY
- [ ] Set DEBUG=False in production
- [ ] Enable HTTPS/SSL certificates
- [ ] Setup firewall rules
- [ ] Enable database backups
- [ ] Setup monitoring and alerts
- [ ] Configure API rate limiting
- [ ] Enable CORS only for trusted domains
- [ ] Rotate API keys regularly
- [ ] Setup automated security updates

## Part 7: Backup & Disaster Recovery

### Database Backup
```bash
# Automatic backups (every day at 2 AM)
0 2 * * * mysqldump -u root -p astroos_db > /backups/astroos_$(date +\\%Y-\\%m-\\%d).sql

# Restore from backup
mysql -u root -p astroos_db < /backups/astroos_2024-01-15.sql
```

### Redis Persistence
```bash
# Redis is configured with AOF (Append Only File)
# Backups stored in named volume: redis_data
```

## Support & Documentation

- API Documentation: http://your-domain:8001/docs
- GitHub Issues: https://github.com/raghavrecharge/Jyotish/issues
- Implementation Guide: IMPLEMENTATION_GUIDE.md

## Next Steps

1. ✅ Complete development setup
2. ✅ Test locally with docker-compose
3. ✅ Configure production environment
4. ✅ Deploy to production infrastructure
5. ✅ Setup monitoring and alerts
6. ✅ Configure backups and recovery
7. ✅ Launch to users!
