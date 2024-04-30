import { PartialType } from "@nestjs/mapped-types";
import { CreateAuthorInput } from "./create-author.input";
import { IsOptional, IsString, Validate } from "class-validator";
import { FileUpload } from "graphql-upload-ts";
import { Field, InputType } from "@nestjs/graphql";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput) {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  surname?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  country?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  @IsOptional()
  picture?: Promise<FileUpload>;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  birth_date?: string;
}
