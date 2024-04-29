import { Module } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { FavoriteEntity } from "../graphQL/favorites/types/favorite.type";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { FavoritesResolver } from "../graphQL/favorites/resolver/favorites.resolvers";
import { BookEntity } from "../graphQL/books/types/book.type";
import { UserEntity } from "../graphQL/users/types/user.type";

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity, BookEntity, UserEntity]),
    AuthModule,
  ],
  providers: [FavoritesService, FavoritesResolver],
})
export class FavoritesModule {}
