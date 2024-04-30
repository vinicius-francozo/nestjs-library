import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "../graphQL/users/types/user.type";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { FileUpload, Upload } from "graphql-upload-ts";
import { AuthService } from "../auth/auth.service";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { CreateUserInput } from "../graphQL/users/inputs/create-user.input";
import { UpdateUserInput } from "../graphQL/users/inputs/update-user.input";

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly cloudinaryService: CloudinaryService,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    if (createUserInput.confirmPassword === createUserInput.password) {
      try {
        const hashPassword: string = await bcrypt.hash(
          createUserInput.password,
          10
        );

        const user: UserEntity = this.userRepository.create({
          ...createUserInput,
          password: hashPassword,
        });
        await this.userRepository.save([user]);

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

  async update(
    id: number,
    updateUserInput: UpdateUserInput
  ): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOneBy({ id });

    if (user) {
      delete user.password;
      if (updateUserInput.image) {
        const upfile: UploadApiResponse | UploadApiErrorResponse =
          await this.cloudinaryService
            .uploadImage(await updateUserInput.image)
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
        { ...updateUserInput, image: user.image }
      );
      return user;
    }
    throw new NotFoundException("Usuário não encontrado");
  }

  async changeImage(userId: number, file: FileUpload) {
    const user: UserEntity = await this.userRepository.findOneBy({
      id: userId,
    });
    if (user) {
      const upfile: UploadApiResponse | UploadApiErrorResponse =
        await this.cloudinaryService.uploadImage(file).catch(() => {
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
