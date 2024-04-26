import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver("auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(@Args("data") { username, password }: AuthLoginDto) {
    return this.authService.login(username, password);
  }
}
