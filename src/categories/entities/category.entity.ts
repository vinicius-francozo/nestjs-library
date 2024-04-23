import { BookEntity } from "@/books/entities/book.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: "categories" })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field()
  @Column({ nullable: false })
  name: string;

  @OneToMany(() => BookEntity, (book) => book.category)
  books: BookEntity[];
}
