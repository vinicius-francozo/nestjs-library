import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

@InputType()
export class CreateReviewInput {
  @IsNumber()
  @IsNotEmpty()
  @Field()
  @Min(0)
  @Max(5)
  @Field()
  rate: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  @Field()
  text: string;
}
