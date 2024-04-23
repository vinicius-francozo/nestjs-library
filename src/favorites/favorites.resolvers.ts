import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FavoritesService } from "./favorites.service";
import { FavoriteEntity } from "./entities/favorite.entity";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UserEntity } from "src/users/entities/user.entity";

@Resolver("favorites")
export class FavoritesResolver {
  constructor(private favoritesService: FavoritesService) {}

  @Mutation(() => FavoriteEntity)
  @UseGuards(AuthGuard)
  createFavorite(
    @Context("user") user: UserEntity,
    @Args("bookId") bookId: string
  ) {
    return this.favoritesService.create(+user.id, +bookId);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  removeFavorite(
    @Context("user") user: UserEntity,
    @Args("bookId") bookId: string
  ) {
    return this.favoritesService.remove(+user.id, +bookId);
  }

  @Query(() => [FavoriteEntity])
  @UseGuards(AuthGuard)
  getUserFavorites(@Context("user") user: UserEntity) {
    return this.favoritesService.getUserFavorites(+user.id);
  }

  @Query(() => FavoriteEntity)
  @UseGuards(AuthGuard)
  getFavoriteByUserAndBookId(
    @Context("user") user: UserEntity,
    @Args("bookId") bookId: string
  ) {
    return this.favoritesService.findOneByUserAndBookId(+user.id, +bookId);
  }
}
