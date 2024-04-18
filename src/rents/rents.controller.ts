import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { RentsService } from "./rents.service";
import { CreateRentDto } from "./dto/create-rent.dto";

@Controller("rents")
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @Post(":bookId")
  create(@Body() createRentDto: CreateRentDto) {
    return this.rentsService.create(createRentDto);
  }

  @Get("/checkout")
  listCheckout(@Param("userIDButTheUserIdComesInTheToken") userId: string) {
    return this.rentsService.listCheckout(+userId);
  }

  @Get("/checkout/:bookId")
  getOneCheckoutOrRented(@Param() ids: { userId: string; bookId: string }) {
    return this.rentsService.getOneCheckoutOrRented(+ids.userId, +ids.bookId);
  }

  @Get()
  listRents(@Param("userIDButTheUserIdComesInTheToken") userId: string) {
    return this.rentsService.listRents(+userId);
  }

  @Put()
  confirmPurchase(@Param("userIDButTheUserIdComesInTheToken") userId: string) {
    return this.rentsService.confirmPurchase(+userId);
  }

  @Patch(":id")
  returnBook(@Param() ids: { rentId: string; userId: string }) {
    return this.rentsService.returnBook(+ids.rentId, +ids.userId);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rentsService.remove(+id);
  }
}
