import { BookEntity } from "src/books/entities/book.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "rents" })
export class RentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  status: number;

  @ManyToOne(() => BookEntity, (book) => book.favorites)
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.rents)
  user: UserEntity;
}
