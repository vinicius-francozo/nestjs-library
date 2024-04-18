import { BookEntity } from "src/books/entities/book.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "rents" })
export class RentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BookEntity, (book) => book.favorites)
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.rents)
  user: UserEntity;
}
