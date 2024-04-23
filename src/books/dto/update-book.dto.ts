import { PartialType } from "@nestjs/mapped-types";
import { CreateBookDto } from "./create-book.dto";
import { Field, InputType } from "@nestjs/graphql";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { FileUpload } from "graphql-upload-ts";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
@InputType()
export class UpdateBookDto {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  title: string;

  @IsString()
  @Field({ nullable: true })
  @IsOptional()
  publisher: string;

  @IsString()
  @Field({ nullable: true })
  @IsOptional()
  sinopsis: string;

  @IsString()
  @Field({ nullable: true })
  @IsOptional()
  edition: string;

  @Field(() => GraphQLUpload, { nullable: true })
  @IsOptional()
  cover?: Promise<FileUpload>;

  @IsNumber()
  @Field({ nullable: true })
  @IsOptional()
  pages: number;

  @IsString()
  @Field({ nullable: true })
  @IsOptional()
  release_date: string;

  @IsNumber()
  @Field({ nullable: true })
  @IsOptional()
  author_id: number;

  @IsNumber()
  @Field({ nullable: true })
  @IsOptional()
  category_id: number;
}
