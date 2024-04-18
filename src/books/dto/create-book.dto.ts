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

  @IsDate()
  @IsNotEmpty()
  releaseDate: Date;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
