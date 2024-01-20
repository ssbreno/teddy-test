import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateUrlDTO } from "../../domain/dto/update-url.dto";
import { Url } from "../../domain/entities/url.entity";

export class UpdateURLService {
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
  ) {}

  async execute(dto: UpdateUrlDTO) {
    const originalUrls = await this.urlRepository.findOne({
      where: { shortUrl: dto.shortUrl },
    });

    if (!originalUrls) {
      throw new HttpException(
        { message: "URL não encontrado" },
        HttpStatus.NOT_FOUND,
      );
    }
    const mapperUrl = {
      ...originalUrls,
      originalUrl: dto.originalUrl,
      updatedAt: new Date(),
    };
    const createdUrl = await this.urlRepository.save(mapperUrl);

    return createdUrl;
  }
}
