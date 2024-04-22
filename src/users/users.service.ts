import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import * as bcrypt from "bcrypt";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly cloudinaryService: CloudinaryService,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.confirmPassword === createUserDto.password) {
      try {
        const hashPassword = await bcrypt.hash(createUserDto.password, 10);

        const user = this.userRepository.create({
          ...createUserDto,
          password: hashPassword,
        });
        await this.userRepository.save([user]);

        return await this.authService.createToken(user);
      } catch (err) {
        throw new InternalServerErrorException("Esse email já existe");
      }
    }
    throw new BadRequestException("As senhas não coincidem.");
  }

  async findOne(id: number) {
    let user: UserEntity;
    try {
      user = await this.userRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException("Usuário não encontrado");
    }
    delete user.password;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.update({ id }, updateUserDto);
    return updatedUser;
  }

  async changeImage(userId: number, file: Express.Multer.File) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user) {
      const upfile = await this.cloudinaryService
        .uploadImage(file)
        .catch(() => {
          throw new BadRequestException("Invalid file type.");
        });

      await this.userRepository.update(
        { id: userId },
        { image: upfile.secure_url }
      );

      delete user.password;
      return user;
    }
    throw new NotFoundException("Usuário não encontrado");
  }
}
