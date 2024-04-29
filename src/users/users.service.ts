import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "../graphQL/users/inputs/create-user.input";
import { UpdateUserDto } from "../graphQL/users/inputs/update-user.input";
import { Repository } from "typeorm";
import { UserEntity } from "../graphQL/users/types/user.type";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { FileUpload, Upload } from "graphql-upload-ts";
import { AuthService } from "../auth/auth.service";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly cloudinaryService: CloudinaryService,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    if (createUserDto.confirmPassword === createUserDto.password) {
      try {
        const hashPassword = await bcrypt.hash(createUserDto.password, 10);

        const user = this.userRepository.create({
          ...createUserDto,
          password: hashPassword,
        });
        await this.userRepository.save([user]);

        console.log(user);
        return user;
      } catch (err) {
        throw new InternalServerErrorException("Esse email já existe");
      }
    }
    throw new BadRequestException("As senhas não coincidem.");
  }

  async findOne(id: number): Promise<UserEntity> {
    let user: UserEntity;
    try {
      user = await this.userRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException("Usuário não encontrado");
    }
    delete user.password;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });

    if (user) {
      delete user.password;
      if (updateUserDto.image) {
        const upfile = await this.cloudinaryService
          .uploadImage(await updateUserDto.image)
          .catch(() => {
            throw new BadRequestException("Invalid file type.");
          });

        await this.userRepository.update(
          { id: id },
          { image: upfile.secure_url }
        );

        return user;
      }
      await this.userRepository.update(
        { id },
        { ...updateUserDto, image: user.image }
      );
      return user;
    }
    throw new NotFoundException("Usuário não encontrado");
  }

  async changeImage(userId: number, file: FileUpload) {
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
