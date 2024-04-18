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

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  surname: string;

  @Column()
  age: number;

  @Column()
  phone: string;

  @Column()
  street: string;

  @Column()
  neighbourhood: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
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
