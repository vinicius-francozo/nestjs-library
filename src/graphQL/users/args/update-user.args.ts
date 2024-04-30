import { ArgsType, Field } from "@nestjs/graphql";
import { UpdateUserInput } from "../inputs/update-user.input";
import { Allow } from "class-validator";

@ArgsType()
export class UpdateUserArgs {
  @Field()
  @Allow()
  data: UpdateUserInput;
}
