import { Module } from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthorEntity } from "./entities/author.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { AuthorsResolver } from "./authors.resolvers";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorEntity, UserEntity]),
    AuthModule,
    CloudinaryModule,
  ],
  providers: [AuthorsService, AuthorsResolver],
})
export class AuthorsModule {}
