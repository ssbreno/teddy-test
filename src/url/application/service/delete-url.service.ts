import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Url } from "../../domain/entities/url.entity";

export class DeleteURLService {
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
  ) {}

  async execute(originalUrl: string) {
    const originalUrls = await this.urlRepository.findOne({
      where: { originalUrl: originalUrl },
    });

    if (!originalUrls) {
      throw new HttpException(
        { message: "URL não encontrado" },
        HttpStatus.NOT_FOUND,
      );
    }
    originalUrls.deletedAt = new Date();
    await this.urlRepository.save(originalUrls);
    return originalUrls;
  }
}
