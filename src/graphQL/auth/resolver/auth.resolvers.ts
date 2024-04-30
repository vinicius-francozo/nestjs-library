import { AuthService } from "../../../auth/auth.service";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthLoginArgs } from "../args/auth-login.args";

@Resolver("auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(@Args() { data }: AuthLoginArgs) {
    return this.authService.login(data.username, data.password);
  }
}
