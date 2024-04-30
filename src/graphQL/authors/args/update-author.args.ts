import { ArgsType, Field } from "@nestjs/graphql";
import { UpdateAuthorInput } from "../inputs/update-author.input";
import { Allow } from "class-validator";

@ArgsType()
export class UpdateAuthorArgs {
  @Field()
  @Allow()
  data: UpdateAuthorInput;
}
