import { AuthLoginDto } from "../inputs/auth-login.input";
import { AuthService } from "../../../auth/auth.service";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver("auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(@Args("data") { username, password }: AuthLoginDto) {
    return this.authService.login(username, password);
  }
}
