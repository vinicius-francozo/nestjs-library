import { ArgsType, Field } from "@nestjs/graphql";
import { UpdateBookInput } from "../inputs/update-book.input";
import { Allow } from "class-validator";

@ArgsType()
export class UpdateBookArgs {
  @Field()
  @Allow()
  data: UpdateBookInput;
}
