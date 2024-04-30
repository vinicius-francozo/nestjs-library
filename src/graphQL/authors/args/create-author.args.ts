import { ArgsType, Field } from "@nestjs/graphql";
import { CreateAuthorInput } from "../inputs/create-author.input";
import { Allow } from "class-validator";

@ArgsType()
export class CreateAuthorArgs {
  @Field()
  @Allow()
  data: CreateAuthorInput;
}
