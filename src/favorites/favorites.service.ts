import { Injectable, NotFoundException } from "@nestjs/common";
import { FavoriteEntity } from "../graphQL/favorites/types/favorite.type";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { BookEntity } from "../graphQL/books/types/book.type";
import { UserEntity } from "../graphQL/users/types/user.type";

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>
  ) {}

  async create(userId: number, bookId: number) {
    let user: UserEntity;
    let book: BookEntity;

    try {
      user = await this.userRepository.findOneByOrFail({ id: userId });
      book = await this.bookRepository.findOneByOrFail({ id: bookId });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Usuário, Livro]"
      );
    }
    const favorite: FavoriteEntity = this.favoriteRepository.create({
      user,
      book,
    });
    await this.favoriteRepository.save([favorite]);
    if (favorite) {
      return true;
    }
    return false;
  }

  async getUserFavorites(userId: number) {
    let user: UserEntity;
    try {
      user = await this.userRepository.findOneByOrFail({ id: userId });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Usuário]"
      );
    }

    const favorites: FavoriteEntity[] = await this.favoriteRepository.find({
      where: { user },
      select: {
        book: { id: true, title: true, cover: true, author: { name: true } },
      },
      relations: { book: { author: true } },
    });

    return favorites;
  }

  async findOneByUserAndBookId(userId: number, bookId: number) {
    let user: UserEntity;
    let book: BookEntity;

    try {
      user = await this.userRepository.findOneByOrFail({ id: userId });
      book = await this.bookRepository.findOneByOrFail({ id: bookId });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Usuário, Livro]"
      );
    }

    const favorite: boolean = await this.favoriteRepository.existsBy({
      user,
      book,
    });
    return favorite;
  }

  async remove(userId: number, bookId: number) {
    let user: UserEntity;
    let book: BookEntity;

    try {
      user = await this.userRepository.findOneByOrFail({ id: userId });
      book = await this.bookRepository.findOneByOrFail({ id: bookId });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Usuário, Livro]"
      );
    }
    const isDeleted: DeleteResult = await this.favoriteRepository.delete({
      user,
      book,
    });
    if (isDeleted.affected > 0) {
      return true;
    }
    return false;
  }
}
