import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateBookInput } from "../graphQL/books/inputs/create-book.input";
import { UpdateBookInput } from "../graphQL/books/inputs/update-book.input";
import { DeleteResult, ILike, Repository } from "typeorm";
import { BookEntity } from "../graphQL/books/types/book.type";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorEntity } from "../graphQL/authors/types/author.type";
import { CategoryEntity } from "../graphQL/categories/types/category.type";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { UserEntity } from "../graphQL/users/types/user.type";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>,

    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,

    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(userId: number, createBookDto: CreateBookInput) {
    let user: UserEntity;
    let author: AuthorEntity;
    let category: CategoryEntity;

    try {
      user = await this.userRepository.findOneByOrFail({ id: userId });
      author = await this.authorRepository.findOneByOrFail({
        id: createBookDto.author_id,
      });
      category = await this.categoryRepository.findOneByOrFail({
        id: createBookDto.category_id,
      });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Usuário, Autor, Categoria]"
      );
    }

    const upfile: UploadApiResponse | UploadApiErrorResponse =
      await this.cloudinaryService
        .uploadImage(await createBookDto.cover)
        .catch(() => {
          throw new BadRequestException("Invalid file type.");
        });

    const book: BookEntity = this.bookRepository.create({
      ...createBookDto,
      cover: upfile.secure_url,
      author,
      category,
      user,
    });
    await this.bookRepository.save([book]);
    return book;
  }

  async searchPaginated(perPage: number, page: number) {
    const books: BookEntity[] = await this.bookRepository.find({
      skip: page > 0 ? (page - 1) * perPage : 1,
      take: perPage > 0 ? perPage : 15,
      relations: { category: true, author: true },
    });

    return books;
  }

  async findAll(): Promise<BookEntity[]> {
    const books: BookEntity[] = await this.bookRepository.find({
      select: { author: { id: true, name: true, surname: true } },
      relations: { category: true, author: true },
    });

    return books;
  }

  async findOne(id: number) {
    const book: BookEntity = await this.bookRepository.findOne({
      where: { id },
      select: {
        category: { id: true, name: true },
        author: { id: true, name: true, surname: true },
        user: { id: true },
        reviews: {
          text: true,
          rate: true,
          id: true,
          user: { id: true, username: true },
        },
      },
      relations: {
        category: true,
        author: true,
        reviews: { user: true },
        user: true,
      },
    });
    return book;
  }

  async listByName(name: string) {
    const books: BookEntity[] = await this.bookRepository.find({
      where: { title: ILike(`%${name}%`) },
      select: { author: { id: true, name: true, surname: true } },
      relations: { category: true, author: true },
    });

    return books;
  }

  async update(id: number, updateBookDto: UpdateBookInput) {
    let author: AuthorEntity;
    let category: CategoryEntity;
    const book: BookEntity = await this.bookRepository.findOneBy({ id });
    if (updateBookDto.author_id) {
      try {
        author = await this.authorRepository.findOneByOrFail({
          id: updateBookDto.author_id,
        });
      } catch {
        throw new NotFoundException("Autor não encontrado");
      }
    }
    if (updateBookDto.category_id) {
      try {
        category = await this.categoryRepository.findOneByOrFail({
          id: updateBookDto.category_id,
        });
      } catch {
        throw new NotFoundException("Categoria não encontrado");
      }
    }
    delete updateBookDto.author_id;
    delete updateBookDto.category_id;
    if (book) {
      if (updateBookDto.cover) {
        const upfile: UploadApiResponse | UploadApiErrorResponse =
          await this.cloudinaryService
            .uploadImage(await updateBookDto.cover)
            .catch(() => {
              throw new BadRequestException("Invalid file type.");
            });

        await this.bookRepository.update(id, {
          ...updateBookDto,
          cover: upfile.secure_url,
          author: author ?? book.author,
          category: category ?? book.category,
        });

        return this.bookRepository.create({
          ...updateBookDto,
          cover: upfile.secure_url,
          author: author ?? book.author,
          category: category ?? book.category,
        });
      }
      await this.bookRepository.update(id, {
        ...updateBookDto,
        cover: book.cover,
        author: author ?? book.author,
        category: category ?? book.category,
      });

      return this.bookRepository.create({
        ...updateBookDto,
        cover: book.cover,
        author: author ?? book.author,
        category: category ?? book.category,
      });
    }
    throw new NotFoundException("Livro não encontrado");
  }

  async remove(id: number): Promise<boolean> {
    const isDeleted: DeleteResult = await this.bookRepository.delete(id);
    if (isDeleted.affected > 0) {
      return true;
    }
    return false;
  }
}
