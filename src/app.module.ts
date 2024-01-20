import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { LoggingModule } from "./core";
import { LoggingInterceptor } from "./core/logging/logging.interceptor";
import { HealthModule } from "./health/health.module";
import { Url } from "./url/domain/entities/url.entity";
import { UrlModule } from "./url/url.module";
import { User } from "./user/domain/entities/user.entity";
import { UsersModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      useUTC: true,
      url: process.env.DATABASE_URL,
      entities: [User, Url],
      synchronize: false,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    LoggingModule,
    HealthModule,
    UsersModule,
    UrlModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
