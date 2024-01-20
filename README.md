<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Introduction

NestJs Template

## Technologies Used

- Docker
- Fastify and NestJS
- JestJs (Testing framework)
- PostgreSQL (Database)
- Logging with Winston
- Helmet
- pnpm
- Other Libraries: Prettier (Code formatter), ESLint (Linter)

## Requirements

- Docker and Docker Compose

## Documentation

API documentation is available at [Local API Docs](http://localhost:3000/docs) once the project is running.

## Getting Started

To run the NESTJS TEMPLATE project on your local machine, follow these steps:

1. **Environment Setup**: Create a `.env` file based on the provided `.env-local` template.
2. **Install Dependencies**: Run `pnpm install` to install required dependencies.
3. **Build Containers**: Use `docker-compose build` to build the Docker containers.
4. **Start Containers**: Execute `docker-compose up -d` to start the containers in detached mode.
6. **Start the Application**: Use `pnpm run start` to start the application.

You can import all endpoint configurations from the `/docs` folder into Postman for API testing.

## Testing

To run the test suite, simply execute:

```bash
pnpm test
```
