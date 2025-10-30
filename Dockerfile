# ---------- Stage 1: Build frontend ----------
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# ---------- Stage 2: Build backend ----------
FROM node:18-alpine AS backend

WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production

# Copy backend code
COPY backend/ ./

# Copy built frontend into backend's public folder (Express can serve it)
COPY --from=frontend-build /app/frontend/dist ./public

# Expose backend port
EXPOSE 5000

# Start the backend (which serves frontend + API)
CMD ["node", "server.js"]
