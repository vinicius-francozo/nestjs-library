import { IsNotEmpty } from "class-validator";

export class ChangeImageUserDto {
  @IsNotEmpty()
  image: string;
}
