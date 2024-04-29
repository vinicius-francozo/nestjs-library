import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AuthorEntity } from "../../authors/types/author.type";
import { BookEntity } from "../../books/types/book.type";
import { FavoriteEntity } from "../../favorites/types/favorite.type";
import { RentEntity } from "../../rents/types/rent.entity";
import { ReviewEntity } from "../../reviews/types/review.type";

@ObjectType()
@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  surname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  age: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  neighbourhood: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  number: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field({ nullable: true })
  @Column({ nullable: false, default: false })
  isAdmin: boolean;

  @Field(() => [AuthorEntity])
  @OneToMany(() => AuthorEntity, (author) => author.user)
  authors: AuthorEntity[];

  @Field(() => [BookEntity])
  @OneToMany(() => BookEntity, (book) => book.user)
  books: BookEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  @Field(() => [ReviewEntity])
  reviews: ReviewEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  @Field(() => [FavoriteEntity])
  favorites: FavoriteEntity[];

  @OneToMany(() => RentEntity, (rent) => rent.user)
  @Field(() => [RentEntity])
  rents: RentEntity[];
}
