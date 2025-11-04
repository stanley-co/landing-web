# --- Этап 1: Сборка React приложения ---
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # Копируем package.json и package-lock.json
    COPY package*.json ./
    RUN npm install
    
    # Копируем исходники
    COPY . .
    
    # Собираем приложение (для Vite — dist, для CRA — build)
    RUN npm run build
    
    # --- Этап 2: Запуск через Nginx ---
    FROM nginx:alpine
    WORKDIR /usr/share/nginx/html
    
    # Удаляем дефолтные файлы
    RUN rm -rf ./*
    
    # Копируем собранное приложение из предыдущего этапа
    COPY --from=build /app/dist .
    
    # Копируем кастомный nginx.conf (если есть)
    COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    