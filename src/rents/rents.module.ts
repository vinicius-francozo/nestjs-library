import { Module } from "@nestjs/common";
import { RentsService } from "./rents.service";
import { RentsController } from "./rents.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentEntity } from "./entities/rent.entity";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { BookEntity } from "src/books/entities/book.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RentEntity,
      AuthorEntity,
      UserEntity,
      BookEntity,
    ]),
    AuthModule,
  ],
  controllers: [RentsController],
  providers: [RentsService],
})
export class RentsModule {}
