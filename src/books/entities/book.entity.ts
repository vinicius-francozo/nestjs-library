import { AuthorEntity } from "src/authors/entities/author.entity";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { FavoriteEntity } from "src/favorites/entities/favorite.entity";
import { RentEntity } from "src/rents/entities/rent.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";
import { UserEntity } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "books" })
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  pages: number;

  @Column({ nullable: false })
  publisher: string;

  @Column({ nullable: false })
  sinopsis: string;

  @Column({ nullable: false })
  edition: string;

  @Column({ nullable: false, type: "date" })
  release_date: string;

  @Column({ nullable: false })
  cover: string;

  @ManyToOne(() => UserEntity, (user) => user.books)
  user: UserEntity;

  @ManyToOne(() => AuthorEntity, (author) => author.books)
  author: AuthorEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.books)
  category: CategoryEntity;

  @OneToMany(() => ReviewEntity, (review) => review.book)
  reviews: ReviewEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.book)
  favorites: FavoriteEntity[];

  @OneToMany(() => RentEntity, (rent) => rent.book)
  rents: RentEntity[];
}
