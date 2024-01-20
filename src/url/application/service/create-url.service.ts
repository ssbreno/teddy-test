import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { baseDomain } from "../../../core/constants";
import { RequestAuthenticated } from "../../../user/domain/types/request-authenticated";
import { CreateUrlDTO } from "../../domain/dto/create-url.dto";
import { Url } from "../../domain/entities/url.entity";
import UrlMapper from "../../domain/mappers/url.mapper";

export class CreateURLService {
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
    private readonly urlMapper: UrlMapper,
  ) {}

  async execute(dto: CreateUrlDTO, req: RequestAuthenticated) {
    const mapperUrl = await this.urlMapper.toEntity(dto, req.user);
    const createdUrl = await this.urlRepository.save(mapperUrl);

    return {
      ...createdUrl,
      shortUrl: baseDomain + createdUrl.shortUrl,
    };
  }
}
