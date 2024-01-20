import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "../../domain/dto/login.dto";
import { RefreshTokenDTO } from "../../domain/dto/refresh-token.dto";
import { User } from "../../domain/entities/user.entity";
import { CreateUserService } from "../service/create-user.service";
import { LoginService } from "../service/login.service";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly createUserService: CreateUserService,
  ) {}

  @Post("/login")
  @ApiBody({ type: LoginDTO })
  async login(@Body() loginDTO: LoginDTO): Promise<any> {
    return this.loginService.execute(loginDTO);
  }

  @Post("/create")
  @ApiBody({ type: LoginDTO })
  async createUser(@Body() createUserDTO: LoginDTO): Promise<User> {
    return this.createUserService.execute(createUserDTO);
  }

  @Post("/refresh-token")
  async refreshToken(@Body() refreshTokenDTO: RefreshTokenDTO) {
    return this.loginService.refreshToken(refreshTokenDTO);
  }
}
