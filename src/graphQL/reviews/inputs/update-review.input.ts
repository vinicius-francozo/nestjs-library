import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString, IsOptional } from "class-validator";

@InputType()
export class UpdateReviewInput {
  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  rate: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  text: string;
}
