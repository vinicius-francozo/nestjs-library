import { BookEntity } from "src/books/entities/book.entity";
import { UserEntity } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  name: "authors",
})
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false })
  picture: string;

  @Column({
    type: "date",
    nullable: false,
  })
  birth_date: string;

  @ManyToOne(() => UserEntity, (user) => user.authors)
  user: UserEntity;

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];
}
