import { Field, ID, ObjectType } from "@nestjs/graphql";

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AuthorEntity } from "../../authors/types/author.type";
import { CategoryEntity } from "../../categories/types/category.type";
import { FavoriteEntity } from "../../favorites/types/favorite.type";
import { RentEntity } from "../../rents/types/rent.entity";
import { UserEntity } from "../../users/types/user.type";
import { ReviewEntity } from "../../reviews/types/review.type";

@ObjectType()
@Entity({ name: "books" })
export class BookEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  title: string;

  @Field()
  @Column({ nullable: false })
  pages: number;

  @Field()
  @Column({ nullable: false })
  publisher: string;

  @Field()
  @Column({ nullable: false })
  sinopsis: string;

  @Field()
  @Column({ nullable: false })
  edition: string;

  @Field()
  @Column({ nullable: false })
  release_date: string;

  @Field()
  @Column({ nullable: false })
  cover: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.books)
  user: UserEntity;

  @Field(() => AuthorEntity)
  @ManyToOne(() => AuthorEntity, (author) => author.books)
  author: AuthorEntity;

  @Field(() => CategoryEntity)
  @ManyToOne(() => CategoryEntity, (category) => category.books)
  category: CategoryEntity;

  @Field(() => [ReviewEntity])
  @OneToMany(() => ReviewEntity, (review) => review.book)
  reviews: ReviewEntity[];

  @Field(() => [FavoriteEntity])
  @OneToMany(() => FavoriteEntity, (favorite) => favorite.book)
  favorites: FavoriteEntity[];

  @Field(() => [RentEntity])
  @OneToMany(() => RentEntity, (rent) => rent.book)
  rents: RentEntity[];
}
