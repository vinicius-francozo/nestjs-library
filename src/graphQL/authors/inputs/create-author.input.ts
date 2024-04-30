import { Field, InputType } from "@nestjs/graphql";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
} from "class-validator";
import { FileUpload } from "graphql-upload-ts";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
@InputType()
export class CreateAuthorInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  surname: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  country: string;

  @Field(() => GraphQLUpload)
  @IsOptional()
  picture?: Promise<FileUpload>;

  @IsString()
  @IsNotEmpty()
  @Field()
  birth_date: string;
}
