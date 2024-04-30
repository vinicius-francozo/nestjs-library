import { ArgsType, Field } from "@nestjs/graphql";
import { UpdateReviewInput } from "../inputs/update-review.input";
import { Allow } from "class-validator";

@ArgsType()
export class UpdateReviewArgs {
  @Field()
  @Allow()
  data: UpdateReviewInput;
}
