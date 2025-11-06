# Конфигурация nginx на сервере для SPA

## ✅ Правильная конфигурация для сервера

Замените ваш текущий блок `location /` на этот:

```nginx
# ---------------------------
# HTTPS Landing stanley
# ---------------------------
server {
    listen 443 ssl;
    server_name stanley.derendyaev.ru;

    ssl_certificate /etc/letsencrypt/live/derendyaev.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/derendyaev.ru/privkey.pem;

    # Проксируем на контейнер
    location / {
        proxy_pass http://stanok-landing:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Важно: НЕ используйте error_page здесь!
        # Контейнер сам обрабатывает 404 через try_files в nginx.conf
    }

    # Защита файлов конфигурации и git
    location ~ /\.(git|env|htaccess|htpasswd)$ {
        deny all;
        return 403;
    }

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Robots-Tag "noindex, nofollow";
    add_header X-Permitted-Cross-Domain-Policies none;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy no-referrer;
    add_header Strict-Transport-Security "max-age=15552000; includeSubDomains" always;
}
```

## 🔍 Что изменилось:

1. **Удалено** `error_page 404 = /index.html;` из блока `location /` - это неправильное место
2. **Оставлено** только `proxy_pass` - контейнер сам обрабатывает SPA routing через `try_files` в своем nginx.conf

## 📝 Как это работает:

1. Запрос приходит на внешний nginx (stanley.derendyaev.ru)
2. Nginx проксирует запрос в контейнер `stanok-landing:80`
3. Внутри контейнера nginx использует `try_files $uri $uri/ /index.html;`
4. Если файл не найден → возвращается `/index.html`
5. React Router обрабатывает маршрут и показывает 404 страницу для несуществующих путей

## ✅ После применения конфигурации:

```bash
# Проверьте конфигурацию
sudo nginx -t

# Перезагрузите nginx
sudo systemctl reload nginx
```

