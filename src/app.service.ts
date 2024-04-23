import { Resolver, Query } from "@nestjs/graphql";

@Resolver()
export class AppService {
  @Query(() => String)
  sayHello(): string {
    return "Hello World!";
  }
}
