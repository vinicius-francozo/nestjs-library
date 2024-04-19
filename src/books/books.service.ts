import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { ILike, Repository } from "typeorm";
import { BookEntity } from "./entities/book.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { CategoryEntity } from "src/categories/entities/category.entity";

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
    private categoryRepository: Repository<CategoryEntity>
  ) {}

  async create(userId: number, createBookDto: CreateBookDto) {
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
    const book = this.bookRepository.create({
      ...createBookDto,
      author,
      category,
      user,
    });
    await this.bookRepository.save([book]);
    return book;
  }

  async searchPaginated(perPage: number, page: number) {
    const books = await this.bookRepository.find({
      skip: page > 0 ? (page - 1) * perPage : 1,
      take: perPage > 0 ? perPage : 15,
      relations: { category: true, author: true },
    });

    return books;
  }

  async findAll() {
    const books = await this.bookRepository.find({
      select: { author: { id: true, name: true, surname: true } },
      relations: { category: true, author: true },
    });

    return books;
  }

  async findOne(id: number) {
    const book = await this.bookRepository.find({
      where: { id },
      select: {
        category: { id: true, name: true },
        author: { id: true, name: true, surname: true },
        reviews: {
          text: true,
          rate: true,
          id: true,
          user: { id: true, username: true },
        },
      },
      relations: { category: true, author: true, reviews: { user: true } },
    });
    return book;
  }

  async listByName(name: string) {
    const book = await this.bookRepository.find({
      where: { title: ILike(`%${name}%`) },
      select: { author: { id: true, name: true, surname: true } },
      relations: { category: true, author: true },
    });

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.bookRepository.update(id, updateBookDto);
    return Object.assign(updateBookDto, { id });
  }

  async remove(id: number) {
    const isDeleted = await this.bookRepository.delete(id);
    if (isDeleted.affected > 0) {
      return { message: "livro deletado com sucesso" };
    }
    return { message: "livro não encontrado" };
  }
}
