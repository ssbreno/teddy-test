import { User } from "../../../user/domain/entities/user.entity";
import { generateId } from "../../utils/generate-short-id";
import { CreateUrlDTO } from "../dto/create-url.dto";
import { Url } from "../entities/url.entity";

export default class UrlMapper {
  public toEntity(dto: CreateUrlDTO, user: User | null): Url {
    return {
      originalUrl: dto.originalUrl,
      shortUrl: generateId(6),
      user: user,
    };
  }
}
