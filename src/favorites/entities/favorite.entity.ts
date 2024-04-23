import { BookEntity } from "@/books/entities/book.entity";
import { UserEntity } from "@/users/entities/user.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: "favorites" })
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => BookEntity)
  @ManyToOne(() => BookEntity, (book) => book.favorites)
  book: BookEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.favorites)
  user: UserEntity;
}
