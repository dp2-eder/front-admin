FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build arguments for environment variables
ARG VITE_API_BASE_URL
ARG VITE_BASE_URL=/admin/
ARG VITE_SCRAPPER_URL

# Convert build args to env vars for Vite
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_SCRAPPER_URL=$VITE_SCRAPPER_URL

RUN npm run build
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html/admin

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
