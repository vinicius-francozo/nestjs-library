import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "../../books/types/book.type";
import { UserEntity } from "../../users/types/user.type";

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
