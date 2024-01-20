import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RequestAuthenticated } from "../../../user/domain/types/request-authenticated";
import { Url } from "../../domain/entities/url.entity";

export class GetURLFromUserService {
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
  ) {}

  async execute(req: RequestAuthenticated): Promise<Url[]> {
    const urlsFromUser = await this.urlRepository.find({
      where: { user: { id: req.user.id }, deletedAt: null },
      relations: ["user"],
    });

    if (!urlsFromUser) {
      throw new HttpException(
        { message: "Usuário não encontrado" },
        HttpStatus.NOT_FOUND,
      );
    }

    return urlsFromUser.map((url) => ({
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clickCount: url.clickCount,
    }));
  }

  async findByShortUrlAndUpdateClickCount(shortId: string): Promise<Url> {
    const url = await this.urlRepository.findOne({
      where: { shortUrl: shortId },
    });

    if (url) {
      url.clickCount = (url.clickCount ?? 0) + 1;
      url.updatedAt = new Date();
      await this.urlRepository.save(url);
    }

    return url;
  }
}
