import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;
}
