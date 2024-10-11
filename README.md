# AWS_NODE_AGO24_DESAFIO_02_ALFRED

Desafio 2 CompassUol

---

## Summary

- [Project Structure](#project-structure)
- [Top-Level Directories](#top-level-directories)

---

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

---

## Top-Level Directories

- **`/docs`**: Contains swagger documentation file.
- **`/src`**: Contains the source code of the application server.
- **`/**/controller`\*\*: Controllers handle the business logic and interact with models and services to process requests and generate responses.
- **`/src/database`**: Contains files related to database configuration.
- **`/**/models`\*\*: Contains model files that define the schema and interact with the database.
- **`/**/routes`\*\*: Contains route definition files that map HTTP requests to controller methods.
- **`.env`**: Environment configuration file (not included in version control).
- **`.gitignore`**: Specifies files and directories to be ignored by Git.

---
