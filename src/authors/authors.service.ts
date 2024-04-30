import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateAuthorInput } from "../graphQL/authors/inputs/update-author.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike, DeleteResult } from "typeorm";
import { AuthorEntity } from "../graphQL/authors/types/author.type";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { UserEntity } from "../graphQL/users/types/user.type";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { CreateAuthorInput } from "../graphQL/authors/inputs/create-author.input";

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>,

    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(userId: number, createAuthorDto: CreateAuthorInput) {
    let user: UserEntity;

    try {
      user = await this.userRepository.findOneByOrFail({ id: userId });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Usuário]"
      );
    }

    const authorExists: boolean = await this.authorRepository.existsBy({
      name: createAuthorDto.name,
      surname: createAuthorDto.surname,
    });

    if (!authorExists) {
      const upfile: UploadApiResponse | UploadApiErrorResponse =
        await this.cloudinaryService
          .uploadImage(await createAuthorDto.picture)
          .catch(() => {
            throw new BadRequestException("Invalid file type.");
          });

      const author: AuthorEntity = this.authorRepository.create({
        ...createAuthorDto,
        picture: upfile.secure_url,
        user,
      });
      await this.authorRepository.save([author]);
      return author;
    }
    throw new ConflictException("Já existe um autor com esse nome cadastrado");
  }

  async searchPaginated(perPage: number, page: number) {
    const authors: AuthorEntity[] = await this.authorRepository.find({
      skip: page > 0 ? (page - 1) * perPage : 1,
      take: perPage > 0 ? perPage : 15,
      select: { user: { id: true } },
      relations: { user: true },
    });

    return authors;
  }

  async findAll() {
    const authors: AuthorEntity[] = await this.authorRepository.find({
      select: { user: { id: true } },
      relations: { user: true },
    });

    return authors;
  }

  async findOne(id: number) {
    const author: AuthorEntity = await this.authorRepository.findOne({
      where: { id },
      select: { user: { id: true } },
      relations: { user: true },
    });

    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorInput) {
    const author: AuthorEntity = await this.authorRepository.findOneBy({ id });
    if (author) {
      if (updateAuthorDto.picture) {
        const upfile = await this.cloudinaryService
          .uploadImage(await updateAuthorDto.picture)
          .catch(() => {
            throw new BadRequestException("Invalid file type.");
          });

        await this.authorRepository.update(id, {
          ...updateAuthorDto,
          picture: upfile.secure_url,
        });

        return this.authorRepository.create({
          ...updateAuthorDto,
          picture: upfile.secure_url,
        });
      }
      await this.authorRepository.update(id, {
        ...updateAuthorDto,
        picture: author.picture,
      });

      return this.authorRepository.create({
        ...updateAuthorDto,
        picture: author.picture,
      });
    }
    throw new NotFoundException("Autor não encontrado");
  }

  async remove(id: number): Promise<boolean> {
    const isDeleted: DeleteResult = await this.authorRepository.delete(id);
    if (isDeleted.affected > 0) {
      return true;
    }
    return false;
  }
}
