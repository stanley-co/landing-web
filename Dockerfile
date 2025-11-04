# Используем nginx для сервинга статических файлов
FROM nginx:alpine

# Рабочая папка
WORKDIR /usr/share/nginx/html

# Чистим дефолтные файлы
RUN rm -rf ./*

# Копируем готовый фронт (dist/), собранный на GitHub Actions
COPY dist/ .

# Копируем кастомный конфиг nginx (если есть)
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
