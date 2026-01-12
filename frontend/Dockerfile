# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build the app
RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Install serve to serve built files OR use vite preview
COPY package*.json ./
RUN npm ci --only=production

# Copy built app from builder
COPY --from=builder /app/dist ./dist

# Install netcat for health checks
RUN apk add --no-cache netcat-openbsd

# Expose port
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD nc -z localhost 5173 || exit 1

# Start Vite in dev mode (for development with hot reload)
# Use this if you want live updates during development:
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# Alternatively, if you prefer production build serving:
# CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
