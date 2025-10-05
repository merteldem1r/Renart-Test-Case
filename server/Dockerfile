# Multi-stage build for smaller production image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for building)
# Use npm install if package-lock.json is not available
RUN npm ci || npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Verify i18n files were copied (the build script already handles this)
RUN echo "Build completed. Checking i18n files:" && ls -la dist/i18n/ 2>/dev/null || echo "i18n files will be available at runtime"

# Production stage
FROM node:20-alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
# Use npm install if package-lock.json is not available
RUN (npm ci --omit=dev || npm install --only=production) && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Verify i18n files exist in dist - Debug information
RUN echo "=== Debugging i18n files ===" && \
    echo "Contents of /app/dist/:" && \
    ls -la /app/dist/ && \
    echo "Checking for i18n directory:" && \
    ls -la /app/dist/i18n/ 2>/dev/null || echo "No i18n directory found in dist" && \
    echo "Working directory: $(pwd)" && \
    echo "NODE_ENV will be: production"

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

# Change ownership
RUN chown -R nestjs:nodejs /app

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/v1 || exit 1

# Start the application
CMD ["node", "dist/main"]