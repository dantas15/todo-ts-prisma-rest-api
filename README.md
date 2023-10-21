**Table of contents**

- [Environment variables](#environment-variables)
- [How to run](#how-to-run)
  - [Docker for development](#docker-for-development)
  - [Dependencies](#dependencies)
  - [Migrations](#migrations)

This is a boilerplate for back end development using the following technologies:

- Node.js
- Express.js
- PrismaORM
- ESLint + Prettier for code Linting
- Docker for the development environment with

  - Node.js v18 (current LTS version)
  - PostgreSQL

- I'm using yarn, but you can use any other package manager, for example npm:

```shell
npm run <SCRIPT_NAME>
```

## Environment variables

If you just want to run the development sever, just copy and paste the values from `.env.example` to a new `.env` file

```shell
cp .env.example .env
```

## How to run

### Docker for development

- If you have Node.js installed, just run

```shell
yarn dc:dev
```

Otherwise, just run the following commands:

- First of all, you need to build containers

```shell
docker compose build
```

- Start containers in detached mode

```shell
docker compose up -d
```

- Enter the node container

```shell
docker compose exec app bash
```

### Dependencies

- Install dependencies

```shell
yarn
```

### Migrations

- Run migrations

```shell
yarn migrate:run
```

- If you made changes to `prisma/schema.prisma`, don't forget to create a [migration](https://cloud.google.com/architecture/database-migration-concepts-principles-part-1):

```shell
yarn migrate:dev
```
