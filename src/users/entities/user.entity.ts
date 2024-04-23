import { AuthorEntity } from "@/authors/entities/author.entity";
import { BookEntity } from "@/books/entities/book.entity";
import { FavoriteEntity } from "@/favorites/entities/favorite.entity";
import { RentEntity } from "@/rents/entities/rent.entity";
import { ReviewEntity } from "@/reviews/entities/review.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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

  @Field()
  @Column({ nullable: true })
  name: string;

  @Field()
  @Column({ nullable: true })
  surname: string;

  @Field()
  @Column({ nullable: true })
  age: number;

  @Field()
  @Column({ nullable: true })
  phone: string;

  @Field()
  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  neighbourhood: string;

  @Column({ nullable: true })
  number: string;

  @Field()
  @Column({ nullable: true })
  city: string;

  @Field()
  @Column({ nullable: true })
  country: string;

  @Field()
  @Column({ nullable: true })
  image: string;

  @Field()
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
