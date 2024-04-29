import { InputType, Field } from "@nestjs/graphql";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";

@InputType()
export class CreateUserDto {
  @IsString()
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsNotEmpty()
  confirmPassword: string;

  @Field()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
