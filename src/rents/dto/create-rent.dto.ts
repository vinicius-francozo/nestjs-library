import { IsNotEmpty, IsNumber, isBoolean } from "class-validator";

export class CreateRentDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  bookId: number;
}
