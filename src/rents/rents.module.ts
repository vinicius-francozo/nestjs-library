import { Module } from "@nestjs/common";
import { RentsService } from "./rents.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentEntity } from "../graphQL/rents/types/rent.entity";
import { AuthModule } from "src/auth/auth.module";
import { RentsResolver } from "../graphQL/rents/resolver/rents.resolvers";
import { AuthorEntity } from "../graphQL/authors/types/author.type";
import { BookEntity } from "../graphQL/books/types/book.type";
import { UserEntity } from "../graphQL/users/types/user.type";

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
