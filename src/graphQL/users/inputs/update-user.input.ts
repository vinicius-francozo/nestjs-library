import { IsString, IsEmail, IsOptional, IsNumber } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { FileUpload } from "graphql-upload-ts";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  username?: string;

  @IsString()
  @IsEmail()
  @Field({ nullable: true })
  @IsOptional()
  email?: string;

  @IsString()
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @IsString()
  @Field({ nullable: true })
  @IsOptional()
  surname?: string;

  @IsNumber()
  @Field({ nullable: true })
  @IsOptional()
  age?: number;

  @IsString()
  @Field({ nullable: true })
  @IsOptional()
  phone?: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  street?: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  neighbourhood?: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  number?: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  city?: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  country?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  @IsOptional()
  image?: Promise<FileUpload>;
}
