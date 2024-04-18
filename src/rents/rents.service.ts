import { Injectable } from "@nestjs/common";
import { CreateRentDto } from "./dto/create-rent.dto";

@Injectable()
export class RentsService {
  create(createRentDto: CreateRentDto) {
    return "This action adds a new rent";
  }

  listCheckout(userId: number) {
    return "this action returns all the checkout list from a user";
  }

  getOneCheckoutOrRented(userId: number, bookId: number) {
    return `This action returns if the book is either rented or in checkout`;
  }

  confirmPurchase(userId: number) {
    return `This action updates all the rents with status 0 to 1`;
  }

  listRents(userId: number) {
    return "this action returns all rents with status 1 of a user";
  }

  returnBook(rentId: number, userId: number) {
    return `this returns the book by setting the rent status to 2`;
  }

  remove(id: number) {
    return `This action removes a #${id} rent`;
  }
}
