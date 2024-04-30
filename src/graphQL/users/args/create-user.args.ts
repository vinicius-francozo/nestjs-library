import { ArgsType, Field } from "@nestjs/graphql";
import { CreateUserInput } from "../inputs/create-user.input";
import { Allow } from "class-validator";

@ArgsType()
export class CreateUserArgs {
  @Field()
  @Allow()
  data: CreateUserInput;
}
