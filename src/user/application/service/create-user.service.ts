import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginDTO } from "../../domain/dto/login.dto";
import { User } from "../../domain/entities/user.entity";
import UserMapper from "../../domain/mappers/user.mapper";

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(dto: LoginDTO) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: dto.email })
      .getOne();

    if (user)
      throw new HttpException(
        { message: "Usuário já existe" },
        HttpStatus.BAD_REQUEST,
      );

    const createdUser = this.userRepository.create(
      this.userMapper.toEntity(dto),
    );

    await this.userRepository.save(createdUser);

    return createdUser;
  }
}
