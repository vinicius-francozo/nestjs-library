import { Module } from "@nestjs/common";
import { RentsService } from "./rents.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentEntity } from "./entities/rent.entity";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { BookEntity } from "src/books/entities/book.entity";
import { AuthModule } from "src/auth/auth.module";
import { RentsResolver } from "./rents.resolvers";

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
  providers: [RentsService, RentsResolver],
})
export class RentsModule {}
