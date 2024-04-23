import { BookEntity } from "@/books/entities/book.entity";
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
@Entity({
  name: "authors",
})
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ nullable: false })
  @Field()
  name: string;

  @Field()
  @Column({ nullable: false })
  surname: string;

  @Field()
  @Column({ nullable: false })
  description: string;

  @Field()
  @Column({ nullable: false })
  country: string;

  @Field()
  @Column({ nullable: false })
  picture: string;

  @Column({
    nullable: false,
  })
  @Field()
  birth_date: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.authors)
  user: UserEntity;

  @Field(() => [BookEntity])
  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];
}
