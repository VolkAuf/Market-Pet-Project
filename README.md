## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## О приложении

Это простой интернет-магазин, созданный по макету из Figma. 
Цель — провести работу с динамическими данными,
реализовать удобный и адаптивный интерфейс для покупок, 
а также обеспечить качественный пользовательский опыт при оформлении заказа.

## Что реализовано
- Подгрузка товаров с API с постраничной загрузкой по мере скролла (infinite scroll)

- Отображение отзывов, которые приходят в формате HTML внутри JSON, безопасно отображаются благодаря очистке через dompurify

- Корзина с удобным управлением количеством товаров

- Маска ввода телефона с помощью react-imask и валидация перед отправкой заказа

- Сохранение корзины и телефона в localStorage, чтобы данные не терялись при перезагрузке страницы

- Отправка заказа на сервер с отображением информативного попапа после успешной отправки

- Прелоадеры при загрузке для плавного UX

- Адаптивный дизайн под мобильные и планшеты, согласно макету

## Использованные технологии
- **Next.js** — серверный рендеринг и маршрутизация

- **React 19** — создание компонентов и логики UI

- **zustand** — простое и лёгкое управление состоянием

- **swr** — удобный и эффективный способ работы с запросами к API

- **dompurify** — безопасный рендеринг HTML из отзывов

- **react-imask** — маска ввода для поля телефона

- **Sass** — стили и адаптивность