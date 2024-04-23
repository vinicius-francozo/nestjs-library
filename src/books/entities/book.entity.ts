import { AuthorEntity } from "@/authors/entities/author.entity";
import { CategoryEntity } from "@/categories/entities/category.entity";
import { FavoriteEntity } from "@/favorites/entities/favorite.entity";
import { RentEntity } from "@/rents/entities/rent.entity";
import { ReviewEntity } from "@/reviews/entities/review.entity";
import { UserEntity } from "@/users/entities/user.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

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
