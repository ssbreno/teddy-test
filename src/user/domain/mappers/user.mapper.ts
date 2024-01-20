import { hashSync } from "bcryptjs";
import { bcryptUtils } from "../../utils/bcrypt-hash";
import { LoginDTO } from "../dto/login.dto";
import { User } from "../entities/user.entity";

export default class UserMapper {
  public toEntity(dto: LoginDTO): User {
    return {
      email: dto.email,
      password: dto.password
        ? hashSync(dto.password, bcryptUtils.genSalt())
        : undefined,
    };
  }

  public toDTO(user: User): User {
    return {
      email: user.email,
    };
  }
}
