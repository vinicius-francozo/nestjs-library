import { ArgsType, Field } from "@nestjs/graphql";
import { CreateReviewInput } from "../inputs/create-review.input";
import { Allow } from "class-validator";

@ArgsType()
export class CreateReviewArgs {
  @Field()
  @Allow()
  data: CreateReviewInput;
}
