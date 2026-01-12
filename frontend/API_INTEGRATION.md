# Frontend-Backend API Integration Guide

## Architecture Overview

This document details the integration between the Jyotish-App frontend (React + TypeScript) and backend (FastAPI).

### Current Backend Implementation
- **Framework**: FastAPI
- **Base URL**: `http://localhost:8001/api`
- **Prefix**: `/api`
- **Available Endpoints**: See below

## Backend API Documentation

### Currently Available Endpoints (server.py)

#### 1. Health Check
- **Endpoint**: `GET /api/`
- **Description**: Root health check endpoint
- **Response**: `{"message": "Hello World"}`
- **Status**: ✓ Implemented

#### 2. Status Check - Create
- **Endpoint**: `POST /api/status`
- **Description**: Creates a new status check record
- **Request Body**:
  ```json
  {
    "client_name": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "uuid",
    "client_name": "string",
    "timestamp": "ISO8601"
  }
  ```
- **Database**: MongoDB (status_checks collection)
- **Status**: ✓ Implemented

#### 3. Status Check - List
- **Endpoint**: `GET /api/status`
- **Description**: Retrieves all status checks
- **Query Parameters**: None
- **Response**:
  ```json
  [
    {
      "id": "uuid",
      "client_name": "string",
      "timestamp": "ISO8601"
    }
  ]
  ```
- **Status**: ✓ Implemented
- **Pagination**: Fixed to 1000 records

### Planned Endpoints (NOT YET IMPLEMENTED)

These endpoints are referenced in apiClient.ts but not yet implemented in server.py:

#### Authentication Endpoints
- `POST /auth/register` - TODO
- `POST /auth/login` - TODO
- `GET /auth/me` - TODO

#### Profile Endpoints
- `GET /profiles` - TODO
- `POST /profiles` - TODO
- `GET /profiles/{id}` - TODO

#### Chart Calculation Endpoints
- `POST /charts/natal` - TODO
- `POST /charts/varga/{number}` - TODO
- `POST /dashas/vimshottari` - TODO
- `POST /yogas` - TODO
- `POST /ashtakavarga` - TODO
- `POST /transits/today` - TODO

#### Analysis Endpoints
- `POST /compatibility` - TODO
- `POST /varshaphala` - TODO
- `POST /strength/shadbala` - TODO
- `POST /remedies` - TODO
- `POST /align27` - TODO

#### Knowledge & Chat Endpoints
- `GET /kb` - TODO (Knowledge Base)
- `POST /chat` - TODO (Chat with AI)

#### Export Endpoints
- `GET /export/pdf/{id}` - TODO

## Environment Configuration

### Frontend Environment Variables

**Development (.env.development)**
```
VITE_API_URL=http://localhost:8001/api
VITE_APP_ENV=development
```

**Production (.env.production)**
```
VITE_API_URL=https://api.astroos.com/api
VITE_APP_ENV=production
```

### Backend Environment Variables (see backend/.env)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=astroos_dev
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## API Client Architecture

### Current Implementation (services/apiClient.ts)

**Strengths**:
- ✓ JWT token management
- ✓ Bearer token authentication
- ✓ Centralized API calls
- ✓ localStorage token persistence

**Areas for Improvement**:
- ✗ Missing error handling (only throws generic errors)
- ✗ No retry logic
- ✗ No request/response logging
- ✗ No loading state management
- ✗ No timeout configuration
- ✗ No request cancellation support
- ✗ No response interceptors

## Integration Requirements

### Phase 1: Production-Ready API Client (IMMEDIATE)

1. **Create types/api.ts** - Define all API response types
   - StatusCheck
   - User/Auth responses
   - Profile types
   - Chart data types

2. **Create services/apiConfig.ts** - Centralized configuration
   - Base URL handling for dev/prod
   - Timeout settings
   - Retry configuration
   - Error handling

3. **Create services/httpClient.ts** - HTTP interceptor
   - Request/response logging
   - Error handling with retry
   - Request timeout
   - Response normalization

4. **Create services/healthService.ts** - Health check service
   - Status endpoint integration
   - Monitoring heartbeat
   - Error recovery

### Phase 2: Connect UI to Backend

1. **Status Dashboard** - Consume GET /api/status
   - Display status list with loading/error states
   - Add new status with POST /api/status
   - Real-time updates

2. **Health Monitoring** - Use health check endpoint
   - Backend connectivity verification
   - Automatic reconnection logic
   - Status indicator UI

### Phase 3: Full Feature Integration

1. Implement remaining backend endpoints
2. Connect all frontend screens to APIs
3. Add loading spinners and error boundaries
4. Implement caching strategy
5. Add offline support

## Error Handling Strategy

### Current Gaps
```typescript
// Current implementation throws generic errors
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

### Proposed Implementation
```typescript
interface ApiError {
  status: number;
  code: string;
  message: string;
  details?: any;
}

class ApiErrorHandler {
  handle(error: any): ApiError
  retry(fn: () => Promise<any>, maxRetries: number): Promise<any>
  isRetryable(status: number): boolean
}
```

## Authentication Flow

### Token Management
1. Login via `POST /auth/login`
2. Receive `access_token` in response
3. Store in `localStorage` as `'accessToken'`
4. Attach to requests: `Authorization: Bearer {token}`
5. Handle token expiration and refresh

### Current Issues
- ✗ No refresh token support
- ✗ No token expiration handling
- ✗ No logout cleanup
- ✗ No role-based access control

## Data Flow Example

### Status Check Feature

```
[UI Component]
     ↓
[React Hook - useStatusChecks()]
     ↓
[apiClient.getStatusChecks()]
     ↓
[HTTP GET request]
     ↓
[Backend: GET /api/status]
     ↓
[Database Query]
     ↓
[Response: StatusCheck[]]
     ↓
[UI State Update]
     ↓
[Render List]
```

## Testing Strategy

### API Testing
1. Test with Postman/Thunder Client
2. Mock responses in development
3. Integration tests for critical flows
4. E2E tests for user journeys

### Frontend Testing
1. Unit tests for API client methods
2. Component tests with mock data
3. Loading/error state testing
4. Token management testing

## Deployment Checklist

- [ ] Frontend environment variables configured
- [ ] Backend API base URL correct for environment
- [ ] CORS configured on backend
- [ ] SSL/TLS certificates installed
- [ ] API rate limiting configured
- [ ] Logging and monitoring enabled
- [ ] Error tracking (Sentry) configured
- [ ] API documentation up-to-date
- [ ] Load testing completed
- [ ] Security audit passed

## Next Steps

1. Create type definitions for all API responses
2. Implement enhanced HTTP client with error handling
3. Create health check service
4. Update UI components with loading/error states
5. Implement backend endpoints as needed
6. Add comprehensive error handling
7. Set up monitoring and alerting

## References

- Backend: `../backend/server.py`
- API Client: `./services/apiClient.ts`
- Environment Setup: `.env` files
