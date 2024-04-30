import { ArgsType, Field } from "@nestjs/graphql";
import { CreateBookInput } from "../inputs/create-book.input";
import { Allow } from "class-validator";

@ArgsType()
export class CreateBookArgs {
  @Field()
  @Allow()
  data: CreateBookInput;
}
