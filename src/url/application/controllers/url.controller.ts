import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FastifyReply } from "fastify";
import { JwtAuthGuard } from "../../../infrastructure/auth/Guards/jwt.guard";
import { RequestAuthenticated } from "../../../user/domain/types/request-authenticated";
import { CreateUrlDTO } from "../../domain/dto/create-url.dto";
import { UpdateUrlDTO } from "../../domain/dto/update-url.dto";
import { CreateURLService } from "../service/create-url.service";
import { DeleteURLService } from "../service/delete-url.service";
import { GetURLFromUserService } from "../service/get-url-from-user.service";
import { UpdateURLService } from "../service/update-url.service";

@Controller("url")
@ApiTags("Url")
export class UrlController {
  constructor(
    private readonly createUrlService: CreateURLService,
    private readonly getURLFromUserService: GetURLFromUserService,
    private readonly deleteURLService: DeleteURLService,
    private readonly updateURLService: UpdateURLService,
  ) {}

  @Post()
  async shortenUrl(
    @Body() createUrlDto: CreateUrlDTO,
    @Req() req: RequestAuthenticated,
  ) {
    const shortenedUrl = await this.createUrlService.execute(createUrlDto, req);
    return { shortenedUrl };
  }

  @Get(":shortId")
  async redirectToOriginal(
    @Param("shortId") shortId: string,
    @Res() res: FastifyReply,
  ) {
    const url =
      await this.getURLFromUserService.findByShortUrlAndUpdateClickCount(
        shortId,
      );

    if (url) {
      return res.redirect(url.originalUrl);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getClicks(@Req() req: RequestAuthenticated) {
    const getClicks = await this.getURLFromUserService.execute(req);
    return getClicks;
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteShortenUrl(@Query("shortUrl") shortUrl: string) {
    const deleteUrl = await this.deleteURLService.execute(shortUrl);
    return deleteUrl;
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateOriginShortenUrl(@Body() updateUrlDto: UpdateUrlDTO) {
    const updateUrlOrigin = await this.updateURLService.execute(updateUrlDto);
    return updateUrlOrigin;
  }
}
