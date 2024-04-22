import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBookDto } from "src/books/dto/create-book.dto";
import { UpdateBookDto } from "src/books/dto/update-book.dto";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository, ILike } from "typeorm";
import { AuthorEntity } from "./entities/author.entity";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(userId: number, createAuthorDto: CreateAuthorDto, file: Express.Multer.File) {
    // let user: UserEntity;

    // try {
    //   user = await this.userRepository.findOneByOrFail({ id: userId });
    // } catch {
    //   throw new NotFoundException(
    //     "Um desses campos não foram encontrados no banco de dados: [Usuário]"
    //   );
    // }

    const upfile = await this.cloudinaryService.uploadImage(file).catch(() => {
      throw new BadRequestException("Invalid file type.");
    });
    
    const authorExists = await this.authorRepository.existsBy({
      name: createAuthorDto.name,
      surname: createAuthorDto.surname,
    });
    if (!authorExists) {
      const dateParts = createAuthorDto.birth_date.split("/");
      const author = this.authorRepository.create({
        ...createAuthorDto,
        picture: upfile.secure_url
        // user,
      });
      await this.authorRepository.save([author]);
      return author;
    }
    throw new ConflictException("Já existe um autor com esse nome cadastrado");
  }

  async searchPaginated(perPage: number, page: number) {
    const authors = await this.authorRepository.find({
      skip: page > 0 ? (page - 1) * perPage : 1,
      take: perPage > 0 ? perPage : 15,
      select: { user: { id: true } },
      relations: { user: true },
    });

    return authors;
  }

  async findAll() {
    const authors = await this.authorRepository.find({
      select: { user: { id: true } },
      relations: { user: true },
    });

    return authors;
  }

  async findOne(id: number) {
    const author = await this.authorRepository.find({
      where: { id },
      select: { user: { id: true } },
      relations: { user: true },
    });

    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto, file: Express.Multer.File) {
    if (file){
      const upfile = await this.cloudinaryService.uploadImage(file).catch(() => {
        throw new BadRequestException("Invalid file type.");
      });

      await this.authorRepository.update(id, {...updateAuthorDto, picture: upfile.secure_url});
      return Object.assign(updateAuthorDto, { id });
    }
    await this.authorRepository.update(id, updateAuthorDto);
    return Object.assign(updateAuthorDto, { id });
  }

  async remove(id: number) {
    const isDeleted = await this.authorRepository.delete(id);
    if (isDeleted.affected > 0) {
      return { message: "autor deletado com sucesso" };
    }
    return { message: "autor não encontrado" };
  }
}
