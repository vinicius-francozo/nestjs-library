import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class ChangeImageUserDto {
  @IsString()
  @IsNotEmpty()
  image: string;
}
