![image](https://github.com/ssbreno/teddy-test/assets/8092325/cd25cb7f-e423-46f7-868d-d9b9ce102252)


[DEV] https://short-link-c41e08f1537b.herokuapp.com/api/v1/healthcheck

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

API documentation is available at [Local API Docs](https://short-link-c41e08f1537b.herokuapp.com/docs#/) once the project is running.

## Getting Started

To run the Teddy Short project on your local machine, follow these steps:

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

The conclusion was to set up a simple yet comprehensive architecture to support the application's evolution towards something more robust. I would like to highlight some areas for improvement:

- Switch the infrastructure to AWS or GCP for better scalability.
- Migrate the database from Heroku to RDS.
- Implement Memcache to be used as a cache database for queries.
- Switch from TypeORM to DrizzleORM, as it appears to be a more powerful and performant ORM.
- Set up everything using Terraform or CloudFormation.
