![image](https://github.com/ssbreno/teddy-test/assets/8092325/91048ad1-6f9a-4919-93f4-0231f72ce031)


## Introduction

Teddy Short Links

## Technologies Used

- Docker
- Fastify and NestJS
- JestJs (Testing framework)
- TypeORM
- PostgreSQL (Database)
- Logging with Winston
- Other Libraries: Prettier (Code formatter), ESLint (Linter)

## Requirements

- Docker and Docker Compose

## Documentation

API documentation is available at [Local API Docs](http://localhost:3000/docs) once the project is running.

## Getting Started

To run the NESTJS TEMPLATE project on your local machine, follow these steps:

1. **Environment Setup**: Create a `.env` file based on the provided `.env-local` template.
2. **Install Dependencies**: Run `npm install` to install required dependencies.
3. **Build Containers**: Use `docker-compose build` to build the Docker containers.
4. **Start Containers**: Execute `docker-compose up -d` to start the containers in detached mode.
5. **Run Migrations**:  Use `npm run migrate:run` to run migrations.
6. **Start the Application**: Use `npm run start` to start the application.

You can import all endpoint configurations from the `/docs` folder into Postman for API testing.

## Testing

To run the test suite, simply execute:

```bash
npm test
```

## Conclusion
