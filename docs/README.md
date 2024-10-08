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
│  ├──/controllers
│  │
│  ├──/database
│  │    └──/migrations
│  │
│  ├──/models
│  │    ├──/cars
│  │    │     ├──/entities
│  │    │     ├──/repositories
│  │    │     ├──/routes
│  │    │     └──/services
│  │    │
│  │    ├──/customers
│  │    │     ├──/entities
│  │    │     ├──/repositories
│  │    │     ├──/routes
│  │    │     └──/services
│  │    │
│  │    ├──/orders
│  │    │     ├──/entities
│  │    │     ├──/repositories
│  │    │     ├──/routes
│  │    │     └──/services
│  │    │
│  │    └──/users
│  │          ├──/entities
│  │          ├──/repositories
│  │          ├──/routes
│  │          └──/services
│  │
│  └──/tests
│
├── .editorconfig
├── .env.example
├── .gitignore
├── .prettierrc.json
├── .eslint.config.mjs
├──  package-lock.json
├──  package.json
├──  pnpm-lock.yaml
└──  tsconfig.json
```

---

## Top-Level Directories

- **`/docs`**: Contains all documentation files and images to doc.
- **`/src`**: Contains the source code of the application server.
- **`/src/controller`**: Controllers handle the business logic and interact with models and services to process requests and generate responses.
- **`/src/database`**: Contains files related to database configuration.
- **`/src/models`**: Contains model files that define the schema and interact with the database.
- **`/src/tests`**: Contains all the file for the unit tests.
- **`/routes`**: Contains route definition files that map HTTP requests to controller methods.
- **`.env`**: Environment configuration file (not included in version control).
- **`.gitignore`**: Specifies files and directories to be ignored by Git.

---
