import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsNotEmpty, IsString, IsOptional } from "class-validator";

@InputType()
export class UpdateReviewDto {
  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  rate: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  text: string;
}
