FROM node:22.17-alpine AS build
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_PUBLIC_API_BASE_URL=/api/v1
ENV VITE_PUBLIC_API_BASE_URL=$VITE_PUBLIC_API_BASE_URL
ARG VITE_S3_HOST=/
ENV VITE_S3_HOST=$VITE_S3_HOST
ARG VITE_S3_BUCKET=media
ENV VITE_S3_BUCKET=$VITE_S3_BUCKET
ARG VITE_ADMIN_PREVIEW_ORIGIN
ENV VITE_ADMIN_PREVIEW_ORIGIN=$VITE_ADMIN_PREVIEW_ORIGIN
RUN npm run build

FROM nginx:1.28-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=10s --timeout=3s --retries=6 CMD wget --spider -q http://127.0.0.1/healthz || exit 1
CMD ["nginx", "-g", "daemon off;"]
