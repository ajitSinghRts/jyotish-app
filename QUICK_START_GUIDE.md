# 🚀 AstroOS Quick Start Guide

## ⚡ 5-Minute Setup

Get the full Vedic Astrology platform running in minutes!

### What's Been Built For You ✅

✅ **Complete Backend** - FastAPI with all astrology calculations
✅ **Modern Frontend** - React 19 with beautiful UI
✅ **API Integration** - Ready-to-use API client service
✅ **Docker Setup** - One-command deployment
✅ **Authentication** - JWT token system
✅ **Production Ready** - Security, CORS, error handling
✅ **Comprehensive Docs** - Setup, deployment, troubleshooting

---

## Option 1: Docker Compose (Recommended) - 2 Minutes ⚡

```bash
# Clone the repository
git clone https://github.com/raghavrecharge/Jyotish.git
cd Jyotish

# Copy environment file
cp backend/.env.example backend/.env

# Start everything with Docker
docker-compose up -d

# Done! Access the app:
# Frontend: http://localhost:5173
# Backend API: http://localhost:8001
# API Docs: http://localhost:8001/docs
```

---

## Option 2: Local Development - 5 Minutes ⚙️

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
cp .env.example .env
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8001
```

### Frontend Setup (New Terminal)
```bash
cd frontend
npm install
echo 'VITE_API_URL=http://localhost:8001/api' > .env.local
npm run dev
```

### Database (Docker)
```bash
# MySQL
docker run -d --name mysql-astroos \\
  -e MYSQL_ROOT_PASSWORD=root \\
  -e MYSQL_DATABASE=astroos_db \\
  -e MYSQL_USER=astroos_user \\
  -e MYSQL_PASSWORD=astroos_pass \\
  -p 3306:3306 \\
  mysql:8.0

# Redis
docker run -d --name redis-astroos -p 6379:6379 redis:7-alpine
```

---

## Verify Everything Works 🧪

```bash
# Check backend
curl http://localhost:8001/api/health
# Expected: {"status": "healthy", "service": "AstroOS", ...}

# Check frontend
# Open browser: http://localhost:5173

# Check API docs
# Open browser: http://localhost:8001/docs
```

---

## Key Features Ready to Use 🎯

### User Management
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Get Profile: `GET /api/auth/me`

### Birth Profiles
- Create: `POST /api/profiles`
- List: `GET /api/profiles`
- Get One: `GET /api/profiles/{id}`

### Astrology Calculations
- Natal Chart: `POST /api/charts/natal`
- Divisional Charts: `POST /api/charts/varga/{number}`
- Dashas: `POST /api/dashas/vimshottari`
- Yogas: `POST /api/yogas`
- Compatibility: `POST /api/compatibility`

### Complete Swagger Documentation
Navigate to `http://localhost:8001/docs` to test all endpoints interactively!

---

## Project Structure 📁

```
Jyotish/
├── backend/              # FastAPI application
│   ├── app/            # Main app code
│   │   ├── api/       # API endpoints
│   │   ├── core/      # Config, auth, database
│   │   ├── models/    # Database models
│   │   └── schemas/   # Pydantic schemas
│   ├── requirements.txt
│   ├── .env.example
│   └── server.py
├── frontend/            # React application  
│   ├── src/
│   ├── App.tsx
│   ├── services/
│   │   └── apiClient.ts  # API communication
│   └── package.json
├── docker-compose.yml
├── IMPLEMENTATION_GUIDE.md
├── SETUP_AND_DEPLOYMENT.md
└── README.md
```

---

## Environment Variables

### Backend (backend/.env)
```bash
MYSQL_HOST=localhost
MYSQL_USER=astroos_user
MYSQL_PASSWORD=astroos_pass
MYSQL_DB=astroos_db
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key
CORS_ORIGINS=http://localhost:5173
```

### Frontend (frontend/.env.local)
```bash
VITE_API_URL=http://localhost:8001/api
```

---

## Common Commands 🛠️

### Docker Management
```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f backend

# Check status
docker-compose ps
```

### Database
```bash
# Run migrations
alembic upgrade head

# Create new migration
alembic revision --autogenerate -m "description"

# Access MySQL
mysql -h localhost -u astroos_user -p astroos_db
```

### Frontend Development
```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Demo Credentials 👤

When you first run the app, you can use:
- Email: `demo@astroos.com`
- Password: `demo123`

Or create your own account via registration endpoint.

---

## API Examples 📡

### Create a Birth Profile
```bash
curl -X POST http://localhost:8001/api/profiles \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "birth_date": "1990-01-15",
    "birth_time": "10:30:00",
    "birth_place": "New Delhi, India",
    "latitude": 28.6139,
    "longitude": 77.2090,
    "timezone": "Asia/Kolkata"
  }'
```

### Calculate Natal Chart
```bash
curl -X POST http://localhost:8001/api/charts/natal \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "dob": "1990-01-15",
    "tob": "10:30",
    "lat": 28.6139,
    "lng": 77.2090,
    "tz": "Asia/Kolkata"
  }'
```

---

## Troubleshooting 🔧

### Port Already in Use
```bash
# Find what's using port 8001
lsof -i :8001

# Kill the process
kill -9 <PID>
```

### Docker Issues
```bash
# Clean restart
docker-compose down
rm -rf mysql_data redis_data
docker-compose up -d
```

### Frontend Not Loading
```bash
# Check if backend is running
curl http://localhost:8001/api/health

# Clear node modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## Documentation Links 📚

- **Full Setup Guide**: [SETUP_AND_DEPLOYMENT.md](./SETUP_AND_DEPLOYMENT.md)
- **Implementation Details**: [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
- **API Documentation**: http://localhost:8001/docs
- **GitHub Issues**: https://github.com/raghavrecharge/Jyotish/issues

---

## Next Steps 🎯

1. ✅ Start with Docker Compose
2. ✅ Test API endpoints at /docs
3. ✅ Explore the frontend UI
4. ✅ Create a birth profile
5. ✅ Run astrology calculations
6. ✅ Deploy to production (see SETUP_AND_DEPLOYMENT.md)

---

## Support 💬

Having issues? Check:
1. These docs
2. API Swagger docs at http://localhost:8001/docs
3. GitHub Issues
4. Error logs in terminal or `docker-compose logs`

---

**You now have a production-ready Vedic Astrology Platform! 🌟**
