import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class UpdateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsString()
  @IsNotEmpty()
  text: string;
}
