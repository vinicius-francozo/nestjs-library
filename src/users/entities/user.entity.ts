import { AuthorEntity } from "src/authors/entities/author.entity";
import { BookEntity } from "src/books/entities/book.entity";
import { FavoriteEntity } from "src/favorites/entities/favorite.entity";
import { RentEntity } from "src/rents/entities/rent.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  neighbourhood: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: false, default: false })
  isAdmin: boolean;

  @OneToMany(() => AuthorEntity, (author) => author.user)
  authors: AuthorEntity[];

  @OneToMany(() => BookEntity, (book) => book.user)
  books: BookEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorites: FavoriteEntity[];

  @OneToMany(() => RentEntity, (rent) => rent.user)
  rents: RentEntity[];
}
