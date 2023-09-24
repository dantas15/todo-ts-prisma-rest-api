# rest-express-prisma-boilerplate

This is a boilerplate for back end development using the following technologies:

- Node.js
- Express.js
- PrismaORM
- ESLint + Prettier for code Linting
- Docker for the development environment with
  - Node.js v20
  - PostgreSQL

## How to run

### With Docker

- Build containers

```bash
docker compose build
```

- Start containers in detached mode

```bash
docker compose up -d
```

- Enter the node container

```bash
docker compose exec app bash
```

### Deps

- Install dependencies

```bash
yarn
```
