import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { FileUpload } from "graphql-upload-ts";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
@InputType()
export class CreateBookInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @Field()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @Field()
  @IsNotEmpty()
  sinopsis: string;

  @IsString()
  @Field()
  @IsNotEmpty()
  edition: string;

  @Field(() => GraphQLUpload, { nullable: true })
  @IsOptional()
  cover?: Promise<FileUpload>;

  @IsNumber()
  @Field()
  @IsNotEmpty()
  pages: number;

  @IsString()
  @Field()
  @IsNotEmpty()
  release_date: string;

  @IsNumber()
  @Field()
  @IsNotEmpty()
  author_id: number;

  @IsNumber()
  @Field()
  @IsNotEmpty()
  category_id: number;
}
