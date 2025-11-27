# Инструкция по организации хранения изображений в S3

## Обзор

Все изображения проекта должны храниться в S3-хранилище Yandex Cloud. Это позволяет:
- Уменьшить размер репозитория
- Ускорить загрузку страниц
- Централизованно управлять медиа-контентом
- Легко масштабировать хранилище

## Базовая структура S3

**Базовый URL:** `https://storage.yandexcloud.net/stanley-co`

## Структура папок в S3

```
stanley-co/
├── data/                          # JSON файлы с данными
│   ├── products/
│   │   └── products.json
│   ├── news/
│   │   └── news.json
│   ├── articles/
│   │   └── articles.json
│   └── carousel/
│       └── carousel.json
│
└── images/                        # Все изображения
    ├── carousel/                  # Изображения для карусели на главной странице оборудования
    │   ├── equipment-hero-1.jpg
    │   ├── vacuum-emulsifiers.jpg
    │   └── production-lines.jpg
    │
    ├── products/                  # Изображения оборудования (по ID продукта)
    │   ├── vm-01.jpg             # Главное изображение
    │   ├── vm-01-1.jpg            # Дополнительное изображение для галереи
    │   ├── vm-01-2.jpg            # Дополнительное изображение для галереи
    │   ├── vm-01-3.jpg            # Дополнительное изображение для галереи
    │   ├── vm-05.jpg
    │   ├── pm-02.jpg
    │   ├── pm-02-1.jpg            # Дополнительные изображения для галереи
    │   ├── pm-06.jpg
    │   ├── sr-04.jpg
    │   ├── sr-08.jpg
    │   ├── ds-03.jpg
    │   ├── ds-07.jpg
    │   ├── fa-01.jpg
    │   ├── up-01.jpg
    │   ├── cp-01.jpg
    │   ├── pp-01.jpg
    │   ├── sp-01.jpg
    │   ├── sip-01.jpg
    │   ├── sip-02.jpg
    │   ├── sip-03.jpg
    │   ├── lm-01.jpg
    │   ├── lm-01-1.jpg            # Дополнительные изображения для галереи
    │   ├── lr-01.jpg
    │   └── ld-01.jpg
    │
    ├── articles/                  # Главные изображения статей
    │   ├── 2025-01-optimization-guide.jpg
    │   ├── 2024-12-maintenance-tips.jpg
    │   ├── 2024-11-quality-control.jpg
    │   ├── 2024-10-energy-efficiency.jpg
    │   └── 2024-09-automation-benefits.jpg
    │
    ├── articles/
    │   └── content/              # Изображения внутри статей
    │       ├── 2025-01-optimization-guide-content-1.jpg
    │       ├── 2024-12-maintenance-tips-content-1.jpg
    │       ├── 2024-11-quality-control-content-1.jpg
    │       ├── 2024-10-energy-efficiency-content-1.jpg
    │       └── 2024-09-automation-benefits-content-1.jpg
    │
    └── news/                     # Главные изображения новостей
        ├── 2025-04-vacuum-line.jpg
        ├── 2025-03-exhibition-participation.jpg
        ├── 2025-02-production-expansion.jpg
        ├── 2025-01-new-partnership.jpg
        ├── 2024-12-certification-update.jpg
        ├── 2024-11-innovation-award.jpg
        ├── 2024-10-new-product-line.jpg
        ├── 2024-09-production-milestone.jpg
        └── 2024-08-technical-training.jpg
        │
        └── content/              # Изображения внутри новостей
            ├── 2025-04-vacuum-line-content-1.jpg
            ├── 2025-03-exhibition-participation-content-1.jpg
            ├── 2025-02-production-expansion-content-1.jpg
            ├── 2024-12-certification-update-content-1.jpg
            ├── 2024-11-innovation-award-content-1.jpg
            ├── 2024-10-new-product-line-content-1.jpg
            └── 2024-08-technical-training-content-1.jpg
```

## Правила именования файлов

### Карусель
- Формат: `{описательное-имя}.jpg`
- Примеры:
  - `equipment-hero-1.jpg`
  - `vacuum-emulsifiers.jpg`
  - `production-lines.jpg`

### Оборудование (Products)
- Главное изображение: `{product-id}.jpg`
- Дополнительные изображения для галереи: `{product-id}-{номер}.jpg`
- Примеры:
  - `vm-01.jpg` (главное изображение для продукта с id="vm-01")
  - `vm-01-1.jpg`, `vm-01-2.jpg`, `vm-01-3.jpg` (дополнительные изображения для галереи)
  - `pm-02.jpg` (главное изображение для продукта с id="pm-02")
  - `sip-01.jpg` (главное изображение для продукта с id="sip-01")

### Статьи (Articles)
- Главное изображение: `{article-id}.jpg`
- Изображения в контенте: `{article-id}-content-{номер}.jpg`
- Примеры:
  - `2025-01-optimization-guide.jpg` (главное)
  - `2025-01-optimization-guide-content-1.jpg` (в контенте)

### Новости (News)
- Главное изображение: `{news-id}.jpg`
- Изображения в контенте: `{news-id}-content-{номер}.jpg`
- Примеры:
  - `2025-04-vacuum-line.jpg` (главное)
  - `2025-04-vacuum-line-content-1.jpg` (в контенте)

## Пути в JSON файлах

### Карусель (carousel.json)
```json
{
  "id": 1,
  "image": "images/carousel/equipment-hero-1.jpg",
  "title": "Заголовок",
  "description": "Описание"
}
```

### Оборудование (products.json)
```json
{
  "id": "vm-01",
  "name": "Название",
  "image": "images/products/vm-01.jpg",
  "galleryImages": [
    "images/products/vm-01.jpg",
    "images/products/vm-01-1.jpg",
    "images/products/vm-01-2.jpg",
    "images/products/vm-01-3.jpg"
  ],
  ...
}
```

**Примечание**: Поле `galleryImages` опционально. Если оно не указано, будет использоваться только главное изображение (`image`). Все пути должны быть относительными и начинаться с `images/products/`.

### Статьи (articles.json)
```json
{
  "id": "2025-01-optimization-guide",
  "image": "images/articles/2025-01-optimization-guide.jpg",
  "content": [
    {
      "type": "image",
      "src": "images/articles/content/2025-01-optimization-guide-content-1.jpg",
      "caption": "Подпись"
    }
  ]
}
```

### Новости (news.json)
```json
{
  "id": "2025-04-vacuum-line",
  "image": "images/news/2025-04-vacuum-line.jpg",
  "content": [
    {
      "type": "image",
      "src": "images/news/content/2025-04-vacuum-line-content-1.jpg",
      "caption": "Подпись"
    }
  ]
}
```

## Как загрузить файлы в S3

### Через веб-интерфейс Yandex Cloud

1. Войдите в консоль Yandex Cloud
2. Перейдите в раздел "Object Storage"
3. Выберите бакет `stanley-co`
4. Создайте необходимые папки согласно структуре выше
5. Загрузите изображения в соответствующие папки

### Через AWS CLI (если настроен)

```bash
# Загрузка изображения продукта
aws s3 cp vm-01.jpg s3://stanley-co/images/products/vm-01.jpg

# Загрузка изображения карусели
aws s3 cp equipment-hero-1.jpg s3://stanley-co/images/carousel/equipment-hero-1.jpg

# Загрузка изображения статьи
aws s3 cp 2025-01-optimization-guide.jpg s3://stanley-co/images/articles/2025-01-optimization-guide.jpg

# Загрузка JSON файла
aws s3 cp carousel.json s3://stanley-co/data/carousel/carousel.json
```

### Через Yandex CLI

```bash
# Установка Yandex CLI (если не установлен)
# https://cloud.yandex.ru/docs/cli/quickstart

# Настройка профиля
yc config profile create my-profile
yc config set token <your-token>

# Загрузка файла
yc storage cp equipment-hero-1.jpg s3://stanley-co/images/carousel/equipment-hero-1.jpg
```

## Настройка публичного доступа

Для того чтобы изображения были доступны через URL, необходимо настроить публичный доступ к бакету:

1. В консоли Yandex Cloud перейдите в настройки бакета `stanley-co`
2. Включите "Публичный доступ"
3. Убедитесь, что политика доступа разрешает чтение для всех

## Проверка доступности

После загрузки файла проверьте его доступность по URL:

```
https://storage.yandexcloud.net/stanley-co/images/products/vm-01.jpg
```

## Рекомендации по изображениям

### Форматы
- Используйте формат **JPEG** для фотографий
- Используйте формат **PNG** для изображений с прозрачностью (если необходимо)
- Используйте формат **WebP** для оптимизации (опционально)

### Размеры изображений

#### Карусель
- Рекомендуемый размер: **1920x1080px** (Full HD)
- Минимальный размер: **1280x720px**
- Соотношение сторон: **16:9**

#### Оборудование (Products)
- Рекомендуемый размер: **1200x800px**
- Минимальный размер: **800x600px**
- Соотношение сторон: **3:2**

#### Статьи и Новости
- Главное изображение: **1200x630px** (для социальных сетей)
- Изображения в контенте: **1200x800px** или по необходимости
- Соотношение сторон: **16:9** или **3:2**

### Оптимизация
- Сжимайте изображения перед загрузкой (используйте инструменты типа TinyPNG, ImageOptim)
- Целевой размер файла: **100-500 KB** для обычных изображений
- Для больших изображений: **до 1 MB**

## Обновление JSON файлов

После загрузки изображений в S3 необходимо обновить соответствующие JSON файлы:

1. **carousel.json** - обновить пути к изображениям карусели
2. **products.json** - обновить пути к изображениям продуктов
3. **articles.json** - обновить пути к изображениям статей
4. **news.json** - обновить пути к изображениям новостей

После обновления JSON файлов загрузите их в S3:
```
s3://stanley-co/data/carousel/carousel.json
s3://stanley-co/data/products/products.json
s3://stanley-co/data/articles/articles.json
s3://stanley-co/data/news/news.json
```

## Важные замечания

1. **Не используйте пробелы** в именах файлов - используйте дефисы или подчеркивания
2. **Используйте строчные буквы** для имен файлов (кроме случаев, когда это необходимо)
3. **Следуйте единому формату именования** для каждого типа контента
4. **Проверяйте доступность** файлов после загрузки
5. **Обновляйте JSON файлы** синхронно с загрузкой изображений
6. **Используйте кэширование** - файлы в S3 кэшируются на 5 минут в приложении

## Пример полного процесса добавления нового продукта

1. Подготовьте изображение продукта (например, `vm-02.jpg`)
2. Загрузите изображение в S3: `s3://stanley-co/images/products/vm-02.jpg`
3. Добавьте запись в `products.json`:
   ```json
   {
     "id": "vm-02",
     "name": "Вакуумный эмульгатор VM-02",
     "image": "images/products/vm-02.jpg",
     ...
   }
   ```
4. Загрузите обновленный `products.json` в S3: `s3://stanley-co/data/products/products.json`
5. Проверьте отображение на сайте

## Поддержка

При возникновении проблем с загрузкой или доступностью изображений:
1. Проверьте правильность путей в JSON файлах
2. Убедитесь, что файлы загружены в правильные папки
3. Проверьте настройки публичного доступа к бакету
4. Проверьте URL изображения напрямую в браузере




