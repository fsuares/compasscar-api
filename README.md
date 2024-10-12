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
│  ├──/models
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
│  │    │     ├──/repositories
│  │    │     ├──/routes
│  │    │     └──/services
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
│  └──/tests
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

## Top-Level Directories

- **`/docs`**: Contains swagger documentation file.
- **`/src`**: Contains the source code of the application server.
- **`/src/@types`**: Contains custom TypeScript type definitions to enhance the development experience and provide support for static typing.
- **`/database`**: Contains files related to database configuration.
- **`/database/migrations`**: Contains scripts for performing database migrations, allowing schema changes to be applied in a controlled manner.
- **`/errors`**: This directory centralizes the definition and handling of custom errors for the application, allowing for more organized exception management.
- **`/src/modules`**: The models directory groups the logic related to different entities of the application. Each subdirectory contains the specific structure of the entity, organized into components.
- **`.env`**: Environment configuration file (not included in version control).

## Intallation

#### Clone the repository

```bash
  git clone https://github.com/RogerioCordeiro/AWS_NODE_AGO24_DESAFIO_02_ALFRED.git
```

## Usage

- ### Change to project folder

```bash
  cd AWS_NODE_AGO24_DESAFIO_02_ALFRED
```

- ### Build docker container

```bash
  docker-compose up
```

## Environment Variables

This project uses the `dotenv` package to manage environment variables. To set up your environment variables, follow these steps:

### 1. Create a `.env` File

Create a `.env` file in the root directory of your project. You can use the `.env.example` file as a template. Copy the contents of `.env.example` to create your own `.env` file.

### 2. Configure Your `.env` File

![envsample](/docs/images/dotenv.png)

Edit the `.env` file and set the values for the following variables:

## API Documentation

The API documentation is available at [/api-docs](http://localhost:${API_PORT}/api-docs).
