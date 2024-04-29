import { Module } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BookEntity } from "../graphQL/books/types/book.type";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { BooksResolver } from "../graphQL/books/resolver/books.resolvers";
import { AuthorEntity } from "../graphQL/authors/types/author.type";
import { CategoryEntity } from "../graphQL/categories/types/category.type";
import { UserEntity } from "../graphQL/users/types/user.type";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookEntity,
      CategoryEntity,
      UserEntity,
      AuthorEntity,
    ]),
    AuthModule,
    CloudinaryModule,
  ],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}
