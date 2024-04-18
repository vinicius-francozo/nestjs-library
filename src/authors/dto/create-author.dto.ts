import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  picture: string;

  @IsString()
  @IsNotEmpty()
  birth_date: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
