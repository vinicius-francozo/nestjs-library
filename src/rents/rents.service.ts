import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RentEntity } from "./entities/rent.entity";
import { AuthorEntity } from "../authors/entities/author.entity";
import { BookEntity } from "../books/entities/book.entity";
import { UserEntity } from "../users/entities/user.entity";

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,

    @InjectRepository(RentEntity)
    private rentRepository: Repository<RentEntity>
  ) {}

  async create(userId: number, bookId: number): Promise<boolean> {
    let book: BookEntity;
    let user: UserEntity;
    let rented: RentEntity;
    try {
      console.log(bookId, userId);
      book = await this.bookRepository.findOneByOrFail({ id: bookId });
      user = await this.userRepository.findOneByOrFail({ id: userId });
      rented = await this.rentRepository.findOne({
        where: [
          { user, book, status: 0 },
          { user, book, status: 1 },
        ],
      });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Livro, Usuário]"
      );
    }
    if (!rented) {
      const rent = this.rentRepository.create({
        book,
        user,
      });
      await this.rentRepository.save([rent]);
      return true;
    }

    return false;
  }

  async listCheckout(userId: number): Promise<RentEntity[]> {
    let user: UserEntity;

    try {
      user = await this.userRepository.findOneByOrFail({ id: userId });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Usuário]"
      );
    }

    const rents = await this.rentRepository.find({
      where: { user, status: 0 },
      select: {
        id: true,
        book: {
          id: true,
          title: true,
          cover: true,
          sinopsis: true,
          author: { name: true },
        },
      },
      relations: { book: { author: true } },
    });

    return rents;
  }

  async getOneCheckoutOrRented(userId: number, bookId: number) {
    let book: BookEntity;
    let user: UserEntity;
    try {
      book = await this.bookRepository.findOneByOrFail({ id: bookId });
      user = await this.userRepository.findOneByOrFail({ id: userId });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Livro, Usuário]"
      );
    }

    const rentOrCheckout = await this.rentRepository.find({
      where: [
        { user, book, status: 0 },
        { user, book, status: 1 },
      ],
      select: {
        id: true,
        book: {
          id: true,
          title: true,
          cover: true,
          sinopsis: true,
          author: { name: true },
        },
        status: true,
      },
      relations: { book: { author: true } },
    });
    return rentOrCheckout;
  }

  async confirmPurchase(userId: number) {
    let user: UserEntity;
    try {
      user = await this.userRepository.findOneByOrFail({ id: userId });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Usuário]"
      );
    }

    await this.rentRepository.update({ user, status: 0 }, { status: 1 });
    return true;
  }

  async listRents(userId: number) {
    let user: UserEntity;
    try {
      user = await this.userRepository.findOneByOrFail({ id: userId });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Usuário]"
      );
    }

    const rent = await this.rentRepository.find({
      where: { user, status: 1 },
      select: {
        book: {
          id: true,
          title: true,
          cover: true,
          sinopsis: true,
          author: { name: true },
        },
      },
      relations: { book: { author: true } },
    });

    return rent;
  }

  async returnBook(userId: number, rentId: number) {
    let user: UserEntity;
    try {
      user = await this.userRepository.findOneByOrFail({ id: userId });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Usuário]"
      );
    }

    const returnedBook = await this.rentRepository.update(
      { id: rentId, user, status: 1 },
      { status: 2 }
    );

    if (returnedBook.affected > 0) {
      return true;
    }
    return false;
  }

  async remove(userId: number, rentId: number) {
    let user: UserEntity;
    try {
      user = await this.userRepository.findOneByOrFail({ id: userId });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Usuário]"
      );
    }

    const isDeleted = await this.rentRepository.delete({
      user,
      id: rentId,
      status: 0,
    });
    if (isDeleted.affected > 0) {
      return true;
    }
    return false;
  }
}
