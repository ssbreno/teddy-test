import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../../user/application/service/auth.service";
import { LoginDTO } from "../../user/domain/dto/login.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(request: any): Promise<any> {
    const dto: LoginDTO = {
      email: request.payload.data.email,
      password: request.payload.data.password,
    };

    const user = await this.authService.validateUser(dto);
    if (!user) {
      throw new ForbiddenException("token expired");
    }
    return user;
  }
}
