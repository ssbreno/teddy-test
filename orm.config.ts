import * as dotenv from "dotenv";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: process.env.DB_URL,
  entities: ["src/**/domain/entities/**/*.entity{.ts,.js}"],
  migrations: ["src/infrastructure/database/migrations/*.{js,ts}"],
  migrationsTableName: "migrations",
  namingStrategy: new SnakeNamingStrategy(),
  ssl: {
    rejectUnauthorized: false,
  },
};

export const AppDataSource = new DataSource(dataSourceOptions);
