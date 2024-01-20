import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw, Repository } from "typeorm";
import { LoginDTO } from "../../domain/dto/login.dto";
import { User } from "../../domain/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async validateUser(dto: LoginDTO): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email: Raw((alias) => `LOWER(${alias}) = :email`, {
          email: dto.email.trim().toLowerCase(),
        }),
      },
    });

    if (!user) {
      throw new NotAcceptableException("Usuário não encontrado");
    }
    if (user) {
      return user;
    }
    return null;
  }
}
