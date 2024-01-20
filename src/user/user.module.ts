import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocalStrategy } from "../infrastructure/auth/local.auth";
import { AuthController } from "./application/controllers/auth.controller";
import { AuthService } from "./application/service/auth.service";
import { CreateUserService } from "./application/service/create-user.service";
import { LoginService } from "./application/service/login.service";
import { User } from "./domain/entities/user.entity";
import UserMapper from "./domain/mappers/user.mapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    AuthService,
    CreateUserService,
    LoginService,
    UserMapper,
  ],
  exports: [AuthService, CreateUserService, LoginService, UserMapper],
})
export class UsersModule {}
