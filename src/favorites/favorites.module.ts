import { Module } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { FavoritesController } from "./favorites.controller";
import { FavoriteEntity } from "./entities/favorite.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookEntity } from "src/books/entities/book.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { FavoritesResolver } from "./favorites.resolvers";

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity, BookEntity, UserEntity]),
    AuthModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesResolver],
})
export class FavoritesModule {}
