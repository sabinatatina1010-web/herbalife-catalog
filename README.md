# Herbalife — Каталог продукции

Интерактивный веб-каталог продукции Herbalife с поиском, фильтрацией по категориям, модальным просмотром товара и быстрым заказом через WhatsApp.

## Стек

- Next.js 16 (App Router) + React + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma ORM
- Zod (валидация заявок)
- Lucide React

## Быстрый старт

1. Установите зависимости:

```bash
npm install
```

2. Запустите PostgreSQL (порт `5433`, чтобы не конфликтовать с локальным `5432`):

```bash
docker compose -p herbalife up -d
```

3. Скопируйте переменные окружения:

```bash
copy .env.example .env
```

4. Примените схему и заполните демо-данные:

```bash
npm run db:push
npm run db:seed
```

5. Запустите приложение:

```bash
npm run dev
```

Откройте [http://localhost:3000/catalog](http://localhost:3000/catalog).

## Переменные окружения

| Переменная | Назначение |
|---|---|
| `DATABASE_URL` | Строка подключения PostgreSQL |
| `WHATSAPP_PHONE` | Номер менеджера для WhatsApp (без `+`, например `77001234567`) |
| `NEXT_PUBLIC_APP_NAME` | Название приложения |

## API

| Метод | Endpoint | Назначение |
|---|---|---|
| `GET` | `/api/products` | Список активных товаров |
| `GET` | `/api/categories` | Список активных категорий |
| `GET` | `/api/products/[id]` | Детали товара |
| `POST` | `/api/orders` | Создание заявки + ссылка WhatsApp |

## Скрипты

```bash
npm run typecheck
npm run lint
npm run db:generate
npm run db:push
npm run db:seed
```

## Архитектура под админ-панель

В Prisma уже заложены:

- `Category.isActive`, `Category.sortOrder`
- `Product.isActive`, статусы наличия, рейтинг, состав и приготовление
- `OrderRequest` со статусами `new | processing | completed`

Полноценная админ-панель в MVP не реализована, но структура БД и API готовы к расширению.
