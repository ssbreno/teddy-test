import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UrlController } from "./application/controllers/url.controller";
import { CreateURLService } from "./application/service/create-url.service";
import { DeleteURLService } from "./application/service/delete-url.service";
import { GetURLFromUserService } from "./application/service/get-url-from-user.service";
import { UpdateURLService } from "./application/service/update-url.service";
import { Url } from "./domain/entities/url.entity";
import UrlMapper from "./domain/mappers/url.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [UrlController],
  providers: [
    CreateURLService,
    UrlMapper,
    GetURLFromUserService,
    DeleteURLService,
    UpdateURLService,
  ],
  exports: [
    CreateURLService,
    UrlMapper,
    GetURLFromUserService,
    DeleteURLService,
    UpdateURLService,
  ],
})
export class UrlModule {}
