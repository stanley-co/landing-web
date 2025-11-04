# --- Этап 1: Сборка React приложения ---
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # Копируем package.json и устанавливаем зависимости
    COPY package*.json ./
    RUN npm install
    
    # Копируем весь проект
    COPY . .
    
    # Собираем приложение (для Vite — dist, для CRA — build)
    RUN npm run build
    
    # --- Этап 2: Запуск через Nginx ---
    FROM nginx:alpine
    WORKDIR /usr/share/nginx/html
    
    # Удаляем дефолтную конфигурацию
    RUN rm -rf ./*
    
    # Копируем собранное приложение
    COPY --from=build /app/dist ./
    
    # Копируем кастомный nginx.conf
    COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    