import { ArgsType, Field } from "@nestjs/graphql";
import { AuthLoginInput } from "../inputs/auth-login.input";
import { Allow } from "class-validator";

@ArgsType()
export class AuthLoginArgs {
  @Field()
  @Allow()
  data: AuthLoginInput;
}
