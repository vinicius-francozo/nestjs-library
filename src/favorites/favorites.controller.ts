import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // @UseGuards(AuthGuard)
  // @Post()
  // create(
  //   @Body() createFavoriteDto: CreateFavoriteDto,
  //   @Param("bookId") bookId: string,
  //   @Req() req
  // ) {
  //   return this.favoritesService.create(
  //     +req.user.id,
  //     +bookId,
  //     createFavoriteDto
  //   );
  // }

  // @UseGuards(AuthGuard)
  // @Get()
  // findAll(@Req() req) {
  //   return this.favoritesService.getUserFavorites(+req.user.id);
  // }

  // @UseGuards(AuthGuard)
  // @Get(":id")
  // findOne(@Param("bookId") bookId: string, @Req() req) {
  //   return this.favoritesService.findOneByUserAndBookId(+req.user.id, +bookId);
  // }

  // @UseGuards(AuthGuard)
  // @Delete(":id")
  // remove(@Param("bookId") bookId: string, @Req() req) {
  //   return this.favoritesService.remove(+req.user.id, +bookId);
  // }
}
