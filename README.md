# AWS_NODE_AGO24_DESAFIO_02_ALFRED

CompassCar is an API that provides server handling for a car rental business.

## Summary

- [Project Structure](#project-structure)
- [Top-Level Directories](#top-level-directories)
- [Installation](#intallation)
- [Usage](#usage)
- [API Documentatio](#api-documentation)

## Project Structure

The project folder consists of the following files and directories:

```
/AWS_NODE_AGO24_DESAFIO_02_ALFRED
│
├──/docs
│
├──/src
│  │
│  ├──/@types
│  │
│  ├──/database
│  │    ├──/migrations
│  │    ├──/seed
│  │    └──/utils
│  │
│  ├──/errors
│  │
│  ├──/modules
│  │    │
│  │    ├──/auth
│  │    │     ├──/controllers
│  │    │     ├──/interfaces
│  │    │     ├──/middlewares
│  │    │     ├──/routes
│  │    │     └──/services
│  │    │
│  │    ├──/cars
│  │    │     ├──/controllers
│  │    │     ├──/entities
│  │    │     ├──/interfaces
│  │    │     ├──/middlewares
│  │    │     ├──/repositories
│  │    │     ├──/routes
│  │    │     ├──/services
│  │    │     └──/utils
│  │    │
│  │    ├──/customers
│  │    │     ├──/controllers
│  │    │     ├──/entities
│  │    │     ├──/interfaces
│  │    │     ├──/middlewares
│  │    │     ├──/repositories
│  │    │     ├──/routes
│  │    │     └──/services
│  │    │
│  │    ├──/orders
│  │    │     ├──/controllers
│  │    │     ├──/entities
│  │    │     ├──/interfaces
│  │    │     ├──/repositories
│  │    │     ├──/routes
│  │    │     ├──/services
│  │    │     └──/utils
│  │    │
│  │    └──/users
│  │          ├──/controllers
│  │          ├──/entities
│  │          ├──/interfaces
│  │          ├──/repositories
│  │          ├──/routes
│  │          ├──/services
│  │          └──/utils
│  │
│  ├── app.ts
│  └── server.ts
│
├── .editorconfig
├── .env.example
├── .gitignore
├── .prettierrc.json
├──  docker-compose.yaml
├──  eslint.config.mjs
├──  package-lock.json
├──  package.json
├──  pnpm-lock.yaml
├──  README.md
└──  tsconfig.json
```

## Top Level Directories

- **`/docs`**: Application documentation.

- **`/src`**: Application source code.

  - **`/@types`**: Custom type definitions.
  - **`/database`**: Database management.
    - **`/migrations`**: Database migration files.
    - **`/seed`**: Scripts to seed the database.
    - **`/utils`**: Database utilities.
  - **`/errors`**: Custom error handling and definitions.
  - **`/modules`**: Application domain modules.
    - **`/auth`**, **`/cars`**, **`/customers`**, **`/orders`**, **`/users`**: Management of different system entities.
      - **`/controllers`**: Handles requests and responses.
      - **`/entities`**: Domain entity definitions.
      - **`/interfaces`**: Type declarations and contracts.
      - **`/middlewares`**: Middleware logic (validations, authentication, etc.).
      - **`/repositories`**: Database access and manipulation.
      - **`/routes`**: API route definitions.
      - **`/services`**: Business logic.
      - **`/utils`**: Utility functions specific to each domain.
  - **`app.ts`**: Main application file.
  - **`server.ts`**: Server initialization.

- **`.editorconfig`**: Editor configuration settings.
- **`.env.example`**: Example environment variables file.
- **`.gitignore`**: Files/folders ignored by Git.
- **`.prettierrc.json`**: Prettier formatting configuration.
- **`docker-compose.yaml`**: Docker container definitions.
- **`eslint.config.mjs`**: ESLint configuration.
- **`package.json`**: Project dependencies and scripts.
- **`pnpm-lock.yaml`**: PNPM lock file.
- **`README.md`**: Main application documentation.
- **`tsconfig.json`**: TypeScript configuration.

## Intallation

### 1. Clone the repository

```bash
  git clone https://github.com/RogerioCordeiro/AWS_NODE_AGO24_DESAFIO_02_ALFRED.git
```

### 2. Change to project folder

```bash
  cd AWS_NODE_AGO24_DESAFIO_02_ALFRED
```

### 3. Create a `.env` File

Create a `.env` file in the root directory of your project. You can use the `.env.example` file as a template. Copy the contents of `.env.example` to create your own `.env` file.

### 4. Configure Your `.env` File

Edit the `.env` file and set the values for the following variables:

```dotenv
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
DATABASE_URL=

DOCKER_VOLUMES=

SEED_USER_NAME=
SEED_USER_EMAIL=
SEED_USER_PASSWORD=

JWT_EXPIRES_IN=
JWT_SECRET=

API_PORT=
```

## Usage

### 1. Build docker container

```bash
  docker-compose up
```

### 2. Run migrations to create tables

- Using npm

```bash
  npm run typeorm:run
```

- Using pnpm

```bash
  pnpm typeorm:run
```

### 3. Start the application

- Using npm

```bash
  npm run dev
```

- Using pnpm

```bash
  pnpm dev
```

## API Documentation

The API documentation is available at [http://localhost:${API_PORT}/api-docs](http://localhost:3003/api-docs).
