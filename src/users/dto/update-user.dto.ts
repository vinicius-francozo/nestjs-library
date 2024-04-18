import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import {
  IsString,
  IsNotEmpty,
  IsStrongPassword,
  IsEmail,
  IsOptional,
} from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsString()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  neighbourhood: string;

  @IsOptional()
  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  country: string;
}
