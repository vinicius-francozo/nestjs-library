import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserEntity } from "../graphQL/users/types/user.type";
require("dotenv").config();

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async createToken(user: UserEntity) {
    return this.JwtService.sign({
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  }

  async verifyToken(token: string) {
    return this.JwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }

  async login(username: string, password: string) {
    try {
      const user = await this.userRepository.findOneByOrFail({
        username,
      });

      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error();
      }

      return await this.createToken(user);
    } catch {
      throw new UnauthorizedException("Email e/ou senha incorretos");
    }
  }
}
