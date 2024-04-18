import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async createToken(user: UserEntity) {
    return this.JwtService.sign({});
  }

  async verifyToken() {
    // return this.JwtService.verify()
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userRepository.findOneByOrFail({
        email,
        password,
      });

      return true;
    } catch {
      throw new UnauthorizedException("Email e/ou senha incorretos");
    }
  }
}
