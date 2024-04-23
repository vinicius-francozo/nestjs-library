import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from "@nestjs/common";
import { RentsService } from "./rents.service";
import { CreateRentDto } from "./dto/create-rent.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("rents")
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  // @UseGuards(AuthGuard)
  // @Post(":bookId")
  // create(
  //   @Body() createRentDto: CreateRentDto,
  //   @Param("bookId") bookId: string,
  //   @Req() req
  // ) {
  //   return this.rentsService.create(+req.user.id, +bookId, createRentDto);
  // }

  // @UseGuards(AuthGuard)
  // @Get("/checkout")
  // listCheckout(@Req() req) {
  //   return this.rentsService.listCheckout(+req.user.id);
  // }

  // @UseGuards(AuthGuard)
  // @Get("/checkout/:bookId")
  // getOneCheckoutOrRented(@Param("bookId") bookId: string, @Req() req) {
  //   return this.rentsService.getOneCheckoutOrRented(+req.user.id, +bookId);
  // }

  // @UseGuards(AuthGuard)
  // @Get()
  // listRents(@Req() req) {
  //   return this.rentsService.listRents(+req.user.id);
  // }

  // @UseGuards(AuthGuard)
  // @Put()
  // confirmPurchase(@Req() req) {
  //   return this.rentsService.confirmPurchase(+req.user.id);
  // }

  // @UseGuards(AuthGuard)
  // @Patch(":rentId")
  // returnBook(@Param("rentId") rentId: string, @Req() req) {
  //   return this.rentsService.returnBook(+req.user.id, +rentId);
  // }

  // @UseGuards(AuthGuard)
  // @Delete(":rentId")
  // remove(@Param("rentId") rentId: string, @Req() req) {
  //   return this.rentsService.remove(+req.user.id, +rentId);
  // }
}
