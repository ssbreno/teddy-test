import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginDTO } from "../../domain/dto/login.dto";
import { RefreshTokenDTO } from "../../domain/dto/refresh-token.dto";
import { User } from "../../domain/entities/user.entity";
import { bcryptUtils } from "../../utils/bcrypt-hash";

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(dto: LoginDTO) {
    const user = await this.userRepository.createQueryBuilder("user").getOne();

    if (!user) {
      throw new HttpException(
        { message: "Usuário não encontrado" },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!(await bcryptUtils.compare(dto.password, user.password))) {
      throw new HttpException(
        { message: "Senha incorreta" },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      access_token: (await this.generateToken(user, false))?.token,
      refresh_token: (await this.generateToken(user, true))?.token,
    };
  }

  async validateRefreshToken(dto: RefreshTokenDTO) {
    let payload: any;
    try {
      if (!dto.access_token)
        throw new HttpException(
          { message: "Token não encontrado" },
          HttpStatus.UNAUTHORIZED,
        );

      payload = this.jwtService.decode(dto.access_token, { json: true }) as any;

      if (!payload)
        throw new HttpException(
          { message: "Token invalido" },
          HttpStatus.UNAUTHORIZED,
        );

      const user = await this.userRepository
        .createQueryBuilder("user")
        .getOne();

      if (!user)
        throw new HttpException(
          { message: "Usuario não encontrado" },
          HttpStatus.UNAUTHORIZED,
        );

      this.jwtService.verify(dto.access_token, {
        secret: process.env.JWT_SECRET,
      });

      return user;
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        throw new HttpException(
          { message: "Invalid Signature" },
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (error.name === "TokenExpiredError") {
        throw new HttpException(
          { message: "Token expirado" },
          HttpStatus.FORBIDDEN,
        );
      }

      throw new HttpException(error.name, HttpStatus.UNAUTHORIZED);
    }
  }

  async refreshToken(dto: RefreshTokenDTO) {
    const updateToken: any = await this.validateRefreshToken(dto);
    return {
      access_token: (await this.generateToken(updateToken, false))?.token,
      refresh_token: (await this.generateToken(updateToken, true))?.token,
    };
  }

  async generateToken(data: any, isRefreshToken: boolean) {
    const payload = { data };
    return {
      token: this.jwtService.sign(
        {
          payload,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: !isRefreshToken
            ? process.env.JWT_EXPIRES_IN_ACCESS_TOKEN
            : process.env.JWT_EXPIRES_IN_REFRESH_TOKEN,
        },
      ),
    };
  }
}
