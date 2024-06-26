import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRentDto } from "./dto/create-rent.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "src/books/entities/book.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { RentEntity } from "./entities/rent.entity";
import { AuthorEntity } from "src/authors/entities/author.entity";

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,

    @InjectRepository(RentEntity)
    private rentRepository: Repository<RentEntity>,

    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>
  ) {}

  async create(userId: number, bookId: number, createRentDto: CreateRentDto) {
    let book: BookEntity;
    let user: UserEntity;
    let rented: RentEntity;
    try {
      book = await this.bookRepository.findOneByOrFail({ id: bookId });
      user = await this.userRepository.findOneByOrFail({ id: userId });
      rented = await this.rentRepository.findOneBy({
        book,
        user,
        status: 0 || 1,
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
      return {
        message: "Livro adicionado ao carrinho",
      };
    }

    return { message: "Erro ao adicionar livro ao carrinho" };
  }

  async listCheckout(userId: number) {
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
      where: { user, book, status: 0 || 1 },
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
    return { message: "Livros alugados! confira em Meus Livros" };
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

    const returnedBook = this.rentRepository.update(
      { id: rentId, user, status: 1 },
      { status: 2 }
    );

    return { message: "Livro devolvido com sucesso" };
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
      return { message: "Aluguel deletado com sucesso" };
    }
    return { message: "Aluguel não encontrado" };
  }
}
