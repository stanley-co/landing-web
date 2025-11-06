# 🔧 Настройка nginx для SPA (React Router)

## Проблема

При прямом переходе на вложенные маршруты (например, `/news/2025-02-production-expansion`) nginx возвращает 404, потому что не знает про SPA-маршруты.

## ✅ Решение

Нужно настроить nginx в Docker контейнере так, чтобы все запросы к несуществующим файлам перенаправлялись на `index.html`, где React Router обработает маршрут.

---

## 📋 Инструкция по применению

### Вариант 1: Изменить конфиг внутри контейнера

1. **Войдите в контейнер:**
   ```bash
   docker exec -it stanok-landing sh
   ```

2. **Проверьте текущий конфиг:**
   ```bash
   cat /etc/nginx/conf.d/default.conf
   ```

3. **Отредактируйте конфиг:**
   ```bash
   vi /etc/nginx/conf.d/default.conf
   ```
   
   Или используйте `nano`:
   ```bash
   nano /etc/nginx/conf.d/default.conf
   ```

4. **Измените блок `location /` на:**
   ```nginx
   location / {
       root   /usr/share/nginx/html;
       index  index.html index.htm;
       
       # Для SPA: если файл не найден, отдаём index.html
       try_files $uri $uri/ /index.html;
   }
   ```

5. **Проверьте конфигурацию:**
   ```bash
   nginx -t
   ```

6. **Перезагрузите nginx:**
   ```bash
   nginx -s reload
   ```
   
   Или:
   ```bash
   service nginx reload
   ```

7. **Выйдите из контейнера:**
   ```bash
   exit
   ```

---

### Вариант 2: Использовать готовый конфиг (рекомендуется)

1. **Скопируйте готовый конфиг в контейнер:**
   ```bash
   docker cp nginx.conf stanok-landing:/etc/nginx/conf.d/default.conf
   ```

2. **Проверьте конфигурацию:**
   ```bash
   docker exec -it stanok-landing nginx -t
   ```

3. **Перезагрузите nginx:**
   ```bash
   docker exec -it stanok-landing nginx -s reload
   ```

---

### Вариант 3: Пересобрать контейнер с новым конфигом

Если вы используете Dockerfile или docker-compose:

1. **Скопируйте `nginx.conf` в проект** (если его там нет)

2. **В Dockerfile добавьте:**
   ```dockerfile
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   ```

3. **Пересоберите образ:**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

---

## 🧪 Проверка

После применения изменений:

1. **Очистите кэш браузера** (Ctrl+Shift+R или Cmd+Shift+R)

2. **Проверьте прямые переходы:**
   - `/news/2025-02-production-expansion`
   - `/equipment/vm-01`
   - `/contacts`
   - Любой несуществующий маршрут (должна показаться 404 страница React)

3. **Проверьте в DevTools:**
   - Network tab должен показывать 200 для всех маршрутов
   - Не должно быть 404 ошибок

---

## 📝 Что делает `try_files $uri $uri/ /index.html;`

1. **`$uri`** — пытается найти точный файл по запрошенному пути
2. **`$uri/`** — пытается найти директорию
3. **`/index.html`** — если ничего не найдено, отдаёт `index.html`

Таким образом, React Router получает управление и обрабатывает маршрут на клиенте.

---

## ⚠️ Важно

- **Не нужно** менять код React/Ionic приложения
- **Не нужно** менять внешний nginx (если он есть)
- Меняется **только** конфигурация nginx внутри контейнера `stanok-landing`

---

## 🔍 Отладка

Если что-то не работает:

1. **Проверьте логи nginx:**
   ```bash
   docker exec -it stanok-landing tail -f /var/log/nginx/error.log
   ```

2. **Проверьте, что конфиг применился:**
   ```bash
   docker exec -it stanok-landing cat /etc/nginx/conf.d/default.conf
   ```

3. **Проверьте синтаксис:**
   ```bash
   docker exec -it stanok-landing nginx -t
   ```

