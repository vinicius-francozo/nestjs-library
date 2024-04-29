import { Module } from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthorEntity } from "../graphQL/authors/types/author.type";
import { AuthModule } from "src/auth/auth.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { AuthorsResolver } from "../graphQL/authors/resolver/authors.resolvers";
import { UserEntity } from "../graphQL/users/types/user.type";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorEntity, UserEntity]),
    AuthModule,
    CloudinaryModule,
  ],
  providers: [AuthorsService, AuthorsResolver],
})
export class AuthorsModule {}
