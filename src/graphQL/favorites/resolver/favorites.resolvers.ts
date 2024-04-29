import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FavoritesService } from "../../../favorites/favorites.service";
import { FavoriteEntity } from "../types/favorite.type";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UserEntity } from "../../users/types/user.type";

@Resolver("favorites")
export class FavoritesResolver {
  constructor(private favoritesService: FavoritesService) {}

  @Mutation(() => Boolean)
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

  @Query(() => Boolean)
  @UseGuards(AuthGuard)
  getFavoriteByUserAndBookId(
    @Context("user") user: UserEntity,
    @Args("bookId") bookId: string
  ) {
    return this.favoritesService.findOneByUserAndBookId(+user.id, +bookId);
  }
}
