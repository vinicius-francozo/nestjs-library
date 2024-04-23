import { BookEntity } from "@/books/entities/book.entity";
import { UserEntity } from "@/users/entities/user.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: "rents" })
export class RentEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field()
  @Column({ default: 0 })
  status: number;

  @Field(() => BookEntity)
  @ManyToOne(() => BookEntity, (book) => book.favorites)
  book: BookEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.rents)
  user: UserEntity;
}
