import { ArgsType, Field } from "@nestjs/graphql";
import { CreateCategoryInput } from "../inputs/create-category.input";
import { Allow } from "class-validator";

@ArgsType()
export class CreateCategoryArgs {
  @Field()
  @Allow()
  data: CreateCategoryInput;
}
