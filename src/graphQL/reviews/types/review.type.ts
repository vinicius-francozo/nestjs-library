import { Field, ID, ObjectType } from "@nestjs/graphql";

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "../../books/types/book.type";
import { UserEntity } from "../../users/types/user.type";

@ObjectType()
@Entity({ name: "reviews" })
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field()
  @Column({ nullable: false })
  text: string;

  @Field()
  @Column({ nullable: false })
  rate: number;

  @Field(() => BookEntity)
  @ManyToOne(() => BookEntity, (book) => book.reviews)
  book: BookEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user: UserEntity;
}
