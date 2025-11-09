# Управление данными через S3-хранилище

## Обзор

Проект настроен на динамическую загрузку контента (продукты и новости) из Yandex Cloud S3-хранилища. Это позволяет обновлять контент сайта без необходимости редеплоя приложения.

## URL-адреса S3

- **Продукты**: `https://storage.yandexcloud.net/stanley-co/data/products/products.json`
- **Новости**: `https://storage.yandexcloud.net/stanley-co/news/news.json`

## Структура данных

### Products (products.json)

```json
[
  {
    "id": "vm-01",
    "name": "Название продукта",
    "category": "Категория",
    "image": "/assets/images/test-image.png",
    "description": "Краткое описание",
    "specs": {
      "ОБЪЕМ": "1000-3000 л",
      "power": "15-30 кВт",
      ...
    },
    "fullDescription": "Полное описание продукта",
    "advantages": [
      {
        "icon": "shieldCheckmarkOutline",
        "title": "Заголовок преимущества",
        "description": "Описание преимущества"
      }
    ]
  }
]
```

#### Поля продукта:

- **id** (обязательно): Уникальный идентификатор продукта
- **name** (обязательно): Название продукта
- **category** (обязательно): Категория продукта
- **image** (обязательно): Путь к изображению
- **description** (обязательно): Краткое описание
- **specs** (обязательно): Объект со спецификациями (ключ-значение)
- **fullDescription** (обязательно): Полное описание продукта
- **advantages** (опционально): Массив преимуществ продукта (минимум 3 рекомендуется)

#### Иконки для advantages:

Доступные иконки из библиотеки ionicons (примеры):
- `shieldCheckmarkOutline` - щит с галочкой
- `constructOutline` - инструменты
- `timeOutline` - часы
- `checkmarkCircleOutline` - круг с галочкой
- `speedometerOutline` - спидометр
- `thermometerOutline` - термометр
- `flashOutline` - молния
- `cubeOutline` - куб
- `settingsOutline` - настройки
- `analyticsOutline` - аналитика
- `gridOutline` - сетка
- `desktopOutline` - рабочий стол
- `documentsOutline` - документы
- `lockClosedOutline` - замок
- `medkitOutline` - аптечка
- `beakerOutline` - колба
- `cashOutline` - деньги
- `resizeOutline` - изменить размер
- `rocketOutline` - ракета
- `waterOutline` - вода
- `layersOutline` - слои
- `trendingUpOutline` - тренд вверх
- `diamondOutline` - алмаз
- `cogOutline` - шестеренка
- `pulseOutline` - пульс
- `extensionPuzzleOutline` - пазл
- `cloudUploadOutline` - облако загрузки
- `statsChartOutline` - график статистики
- `swapHorizontalOutline` - обмен горизонтально
- `optionsOutline` - опции
- `ribbonOutline` - лента

[Полный список иконок](https://ionic.io/ionicons)

### News (news.json)

```json
[
  {
    "id": "2025-04-vacuum-line",
    "title": "Заголовок новости",
    "date": "2025-04-18",
    "category": "Продукты",
    "image": "/assets/images/test-image.png",
    "preview": "Краткое превью новости",
    "content": [
      {
        "type": "paragraph",
        "text": "Текст параграфа"
      },
      {
        "type": "image",
        "src": "/assets/images/test-image.png",
        "caption": "Подпись к изображению"
      },
      {
        "type": "quote",
        "text": "Цитата"
      }
    ]
  }
]
```

#### Поля новости:

- **id** (обязательно): Уникальный идентификатор новости
- **title** (обязательно): Заголовок новости
- **date** (обязательно): Дата в формате YYYY-MM-DD
- **category** (обязательно): Категория новости
- **image** (обязательно): Путь к главному изображению
- **preview** (обязательно): Краткое превью для списка новостей
- **content** (обязательно): Массив блоков контента

#### Типы блоков контента:

1. **paragraph**: Текстовый параграф
   ```json
   { "type": "paragraph", "text": "Текст параграфа" }
   ```

2. **image**: Изображение с подписью
   ```json
   { 
     "type": "image", 
     "src": "/путь/к/изображению.png",
     "caption": "Подпись к изображению"
   }
   ```

3. **quote**: Цитата
   ```json
   { "type": "quote", "text": "Текст цитаты" }
   ```

## Кэширование

Утилита `fetchStaticData` автоматически кэширует загруженные данные на стороне клиента на **5 минут**. Это снижает нагрузку на S3 и ускоряет навигацию по сайту.

При обновлении страницы после истечения времени кэша данные будут загружены заново из S3.

## Логирование

Все операции загрузки данных логируются в консоль браузера:

```
[fetchStaticData] Загрузка данных из: https://storage.yandexcloud.net/stanley-co/...
[fetchStaticData] Статус: loading...
[fetchStaticData] Статус: success
[fetchStaticData] Данные успешно загружены и закэшированы
```

Или в случае ошибки:
```
[fetchStaticData] Статус: error
[fetchStaticData] Ошибка при загрузке данных из ...
```

## Graceful Fallback

### Для преимуществ продукта (advantages)

Если у продукта не указано поле `advantages` или массив пустой, компонент `ProductDescription` автоматически отобразит стандартный набор преимуществ:

1. Высокое качество материалов
2. Точное соответствие спецификациям
3. Гарантия и сервисное обслуживание
4. Индивидуальные решения

### Для ошибок загрузки

При ошибке загрузки данных пользователи увидят:
- Сообщение об ошибке
- Spinner во время загрузки
- Graceful error screens с описанием проблемы

## Обновление данных в S3

### Шаги для обновления:

1. **Создайте/отредактируйте JSON файл** локально со всеми необходимыми изменениями
2. **Проверьте валидность JSON** (используйте любой JSON валидатор)
3. **Загрузите файл в S3**:
   - Для продуктов: `stanley-co/data/products/products.json`
   - Для новостей: `stanley-co/news/news.json`
4. **Убедитесь в публичном доступе** к файлам (Content-Type: application/json)
5. **Проверьте изменения**: откройте сайт в браузере в режиме инкогнито или очистите кэш

### Пример загрузки через AWS CLI:

```bash
# Для продуктов
aws s3 cp products.json s3://stanley-co/data/products/products.json \
  --endpoint-url=https://storage.yandexcloud.net \
  --content-type="application/json" \
  --acl public-read

# Для новостей
aws s3 cp news.json s3://stanley-co/news/news.json \
  --endpoint-url=https://storage.yandexcloud.net \
  --content-type="application/json" \
  --acl public-read
```

### Пример загрузки через Yandex Cloud CLI:

```bash
# Для продуктов
yc storage s3api put-object \
  --bucket stanley-co \
  --key data/products/products.json \
  --body products.json \
  --content-type application/json \
  --acl public-read

# Для новостей
yc storage s3api put-object \
  --bucket stanley-co \
  --key news/news.json \
  --body news.json \
  --content-type application/json \
  --acl public-read
```

## Тестирование локально

Для тестирования изменений перед загрузкой в S3:

1. Обновите файлы `src/data/products-with-advantages.json` или `src/data/news.json`
2. Временно измените URL в `src/utils/fetchStaticData.ts`:
   ```typescript
   export const S3_URLS = {
     PRODUCTS: '/src/data/products-with-advantages.json', // для локального теста
     NEWS: '/src/data/news.json' // для локального теста
   } as const;
   ```
3. Запустите dev сервер: `npm run dev`
4. Проверьте изменения
5. Верните оригинальные URL перед коммитом

## Важные примечания

- ✅ Всегда проверяйте валидность JSON перед загрузкой
- ✅ Убедитесь, что все обязательные поля заполнены
- ✅ Используйте уникальные ID для продуктов и новостей
- ✅ Формат даты для новостей: `YYYY-MM-DD`
- ✅ Минимум 3 преимущества для каждого продукта (рекомендуется)
- ✅ Проверяйте корректность имен иконок
- ⚠️ При обновлении файлов в S3 изменения станут видны после истечения кэша (5 минут) или при принудительном обновлении страницы (Ctrl+F5)
- ⚠️ Не удаляйте существующие продукты/новости, если на них есть ссылки

## Мониторинг

Следите за консолью браузера для отслеживания:
- Успешных загрузок данных
- Ошибок сети или парсинга JSON
- Использования кэша

## Поддержка

Если возникли проблемы с загрузкой данных:
1. Проверьте доступность URL в браузере
2. Проверьте валидность JSON
3. Проверьте CORS-политики S3 bucket
4. Проверьте права доступа к файлам (должны быть public-read)
5. Просмотрите логи в консоли браузера

