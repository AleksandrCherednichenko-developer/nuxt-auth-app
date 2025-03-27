# Nuxt 3 Auth Application

## Технологический стек
- Nuxt 3
- TypeScript
- Pinia
- SASS
- Vue DatePicker

## Развертывание на PROD
1. Сборка проекта: `npm run build`
2. Настройка PM2 для управления процессом
3. Настройка Nginx как reverse proxy
4. Настройка SSL-сертификата
5. Настройка CI/CD pipeline

## Основные функции
- Аутентификация пользователей
- Сохранение сессии
- Фильтрация данных по дате и статусу
- Защищенные роуты

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
