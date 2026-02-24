# CRM API Test Suite

Автоматизированные тесты для CRM API на базе **Playwright Test** + **TypeScript**.

## 📋 Оглавление

- [Возможности](#возможности)
- [Требования](#требования)
- [Установка](#установка)
- [Настройка](#настройка)
- [Структура проекта](#структура-проекта)
- [Запуск тестов](#запуск-тестов)
- [Доступные эндпоинты](#доступные-эндпоинты)
- [Создание тестов](#создание-тестов)
- [Отчётность](#отчётность)

---

## 🚀 Возможности

- ✅ Позитивные и негативные тесты для всех эндпоинтов
- ✅ Валидация JSON Schema
- ✅ HMAC-SHA256 аутентификация
- ✅ Параметризованные тесты
- ✅ HTML-отчёты
- ✅ Скриншоты и видео при ошибках

---

## 📦 Требования

- Node.js ≥ 18
- npm ≥ 9

---

## ⬇️ Установка

```bash
# Установка зависимостей
npm install
```

---

## ⚙️ Настройка

1. Создайте файл `.env` в корне проекта на основе `.envExample`:

```bash
API_URL=https://your-api-domain.com
API_ID=your_api_id
API_SECRET=your_secret_key
```

2. Переменные окружения:

| Переменная | Описание |
|------------|----------|
| `API_URL` | Базовый URL API |
| `API_ID` | Идентификатор интеграции |
| `API_SECRET` | Секретный ключ для HMAC-подписи |

---

## 📁 Структура проекта

```
CRM-test/
├── src/
│   ├── helpers/              # Вспомогательные классы
│   │   ├── baseTest.ts       # Базовый класс для тестов
│   │   ├── sendRequest.ts    # Отправка запросов с подписью
│   │   └── validate-schema.ts # Валидация JSON Schema
│   ├── schemas/              # JSON Schema для валидации
│   │   ├── orders/
│   │   ├── users/
│   │   ├── catalog/
│   │   └── statuses/
│   ├── test-data/            # Тестовые данные
│   │   ├── orders/
│   │   ├── users/
│   │   ├── catalog/
│   │   ├── statuses/
│   │   └── randomData/       # Генераторы случайных данных
│   └── tests/                # Тесты
│       ├── orders/
│       ├── users/
│       ├── catalog/
│       ├── statuses/
│       └── schema/
├── .env                      # Переменные окружения (не в git)
├── .envExample               # Шаблон переменных
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

---

## ▶️ Запуск тестов

### Все тесты

```bash
npm run test:all
```

### По группам

```bash
npm run test:orders       # Тесты заказов
npm run test:users        # Тесты пользователей
npm run test:catalog      # Тесты каталога
npm run test:statuses     # Тесты статусов
npm run test:schema       # Тесты схемы API
```

### Отдельные эндпоинты

```bash
# Orders
npm run orders:add-file        # Добавление из файла
npm run orders:add-random      # Добавление случайных данных
npm run orders:get             # Получение списка
npm run orders:get-short       # Краткая информация
npm run orders:get-short-id    # По ID источника
npm run orders:update          # Обновление (все тесты)
npm run orders:update-pos      # Обновление (позитивные)
npm run orders:update-neg      # Обновление (негативные)
npm run orders:open            # Открытие карточки

# Users
npm run users:online           # Онлайн пользователи
npm run users:online-pos       # Позитивные тесты
npm run users:online-neg       # Негативные тесты
npm run users:list             # Список имён
npm run users:list-pos         # Позитивные тесты
npm run users:list-neg         # Негативные тесты

# Catalog
npm run catalog:offer-list     # Список предложений
npm run catalog:category       # Категории (все тесты)
npm run catalog:category-pos   # Позитивные тесты
npm run catalog:category-neg   # Негативные тесты

# Statuses
npm run statuses:list          # Список статусов
npm run statuses:list-pos      # Позитивные тесты
npm run statuses:list-neg      # Негативные тесты

# Schema
npm run schema                 # Получение схемы API
```

### Один файл

```bash
npx playwright test src/tests/orders/update.test.ts
```

### С фильтром по названию

```bash
npx playwright test --grep "positive"
npx playwright test --grep "Negative update"
```

---

## 📡 Доступные эндпоинты

### Orders (Заказы)

| Метод | Endpoint | Описание | Тесты |
|-------|----------|----------|-------|
| POST | `/orders/add` | Создание заказа | ✅ |
| POST | `/orders/get` | Получение списка по фильтру | ✅ |
| POST | `/orders/get-short` | Краткая информация по ID | ✅ |
| POST | `/orders/get-short-by-source-id` | По ID источника | ✅ |
| POST | `/orders/update` | Обновление заказа | ✅ |
| POST | `/orders/open` | Открыть карточку | ✅ |

### Users (Пользователи)

| Метод | Endpoint | Описание | Тесты |
|-------|----------|----------|-------|
| POST | `/users/online` | Статус онлайн | ✅ |
| POST | `/users/user-name-list` | Список имён | ✅ |

### Catalog (Каталог)

| Метод | Endpoint | Описание | Тесты |
|-------|----------|----------|-------|
| POST | `/catalog/offer-list` | Список предложений | ✅ |
| POST | `/catalog/category-list` | Список категорий | ✅ |

### Statuses (Статусы)

| Метод | Endpoint | Описание | Тесты |
|-------|----------|----------|-------|
| POST | `/statuses/list` | Список статусов | ✅ |

### Schema

| Метод | Endpoint | Описание | Тесты |
|-------|----------|----------|-------|
| GET | `/schema` | OpenAPI схема | ✅ |

---

## 📝 Создание тестов

### Пример позитивного теста

```typescript
import {test, expect} from "@playwright/test";
import testData from "../../test-data/orders/update_positive.json" with {type: "json"};
import {validateSchemaObject} from "../../helpers/validate-schema.js";
import {BaseTest} from "../../helpers/baseTest.js";

const UPDATE_PATH = "/rest/api/orders/update";
const SCHEMA_PATH = "src/schemas/orders/update.schema.json";

test.describe("orders/update positive tests", () => {
    for (const [i, params] of testData.entries()) {
        test(`Positive update checks #${i}`, async ({request}) => {
            const timestamp = Math.floor(Date.now() / 1000);
            const payload = BaseTest.buildPayload(params, timestamp, UPDATE_PATH);
            const signature = BaseTest.crypt(process.env.API_SECRET, payload);
            const body = BaseTest.buildBody(params, timestamp, process.env.API_ID, signature);

            const response = await request.post(process.env.API_URL + UPDATE_PATH, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Timestamp": String(timestamp),
                    "X-Signature": signature,
                },
                data: body,
            });

            const json = await response.json();
            
            expect(response.status()).toBe(200);
            expect(validateSchemaObject(json, SCHEMA_PATH)).toBe(true);
        });
    }
});
```

### Пример негативного теста

```typescript
test.describe("orders/update negative tests", () => {
    for (const [i, params] of testDataNegative.entries()) {
        test(`Negative update checks #${i}`, async ({request}) => {
            // ... подготовка запроса
            
            const response = await request.post(/* ... */);
            const json = await response.json();
            
            expect(json.errors).toBeTruthy();
            expect(json.errors.code).toBeTruthy();
        });
    }
});
```

---

## 📊 Отчётность

### HTML-отчёт

После запуска тестов откройте отчёт:

```bash
npx playwright show-report
```

Или вручную откройте файл `playwright-report/index.html` в браузере.

### Скриншоты и видео

При падении тестов автоматически сохраняются:
- **Скриншоты**: `test-results/`
- **Видео**: `test-results/` (в папке каждого теста)

Настройки в `playwright.config.ts`:

```typescript
{
  use: {
    screenshot: 'on',
    video: 'retain-on-failure',
  }
}
```

---

## 🔧 Утилиты

### Валидация JSON Schema

```typescript
import {validateSchemaObject} from "../../helpers/validate-schema.js";

const isValid = validateSchemaObject(responseData, "src/schemas/orders/add.schema.json");
expect(isValid).toBe(true);
```

### Генерация подписи

```typescript
import {BaseTest} from "../../helpers/baseTest.js";

const timestamp = Math.floor(Date.now() / 1000);
const payload = BaseTest.buildPayload(data, timestamp, "/rest/api/orders/add");
const signature = BaseTest.crypt(secretKey, payload);
```

---

## 📌 Заметки

- Все тесты используют **HMAC-SHA256** для подписи запросов
- Подпись генерируется из: `JSON.stringify(data) + timestamp + path`
- Ответы API валидируются по JSON Schema
- Тесты разделены на позитивные и негативные сценарии

---

## 📄 Лицензия

ISC
