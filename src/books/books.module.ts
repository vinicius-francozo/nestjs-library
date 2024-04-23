import { Module } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { BookEntity } from "./entities/book.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { AuthModule } from "src/auth/auth.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { BooksResolver } from "./books.resolvers";

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
  controllers: [BooksController],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}
