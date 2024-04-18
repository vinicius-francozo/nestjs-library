import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  sinopsis: string;

  @IsString()
  @IsNotEmpty()
  edition: string;

  @IsString()
  @IsNotEmpty()
  cover: string;

  @IsNumber()
  @IsNotEmpty()
  pages: number;

  @IsString()
  @IsNotEmpty()
  release_date: string;

  @IsNumber()
  @IsNotEmpty()
  author_id: number;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
