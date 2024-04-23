import { Injectable, NotFoundException } from "@nestjs/common";
import { FavoriteEntity } from "./entities/favorite.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookEntity } from "../books/entities/book.entity";
import { UserEntity } from "../users/entities/user.entity";

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
    const favorite = this.favoriteRepository.create({
      user,
      book,
    });
    await this.favoriteRepository.save([favorite]);
    return favorite;
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

    const favorites = await this.favoriteRepository.find({
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

    const favorite = await this.favoriteRepository.findOneBy({ user, book });
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
    const isDeleted = await this.favoriteRepository.delete({ user, book });
    if (isDeleted.affected > 0) {
      return true;
    }
    return false;
  }
}
