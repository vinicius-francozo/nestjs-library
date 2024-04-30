import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { AuthorEntity } from "../types/author.type";
import { AuthorsService } from "../../../authors/authors.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UserEntity } from "../../users/types/user.type";
import { CreateAuthorArgs } from "../args/create-author.args";
import { UpdateAuthorArgs } from "../args/update-author.args";

@Resolver("authors")
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => AuthorEntity)
  createAuthor(
    @Context("user") user: UserEntity,
    @Args() { data }: CreateAuthorArgs
  ): Promise<AuthorEntity> {
    return this.authorsService.create(+user.id, data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  deleteAuthor(@Args("id") id: string): Promise<boolean> {
    return this.authorsService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => AuthorEntity)
  updateAuthor(
    @Args("id") id: string,
    @Args() { data }: UpdateAuthorArgs
  ): Promise<AuthorEntity> {
    return this.authorsService.update(+id, data);
  }

  @Query(() => [AuthorEntity])
  authorPerPage(@Args("perPage") perPage: string, @Args("page") page: string) {
    return this.authorsService.searchPaginated(+perPage, +page);
  }

  @Query(() => AuthorEntity)
  findOneAuthor(@Args("id") id: string) {
    return this.authorsService.findOne(+id);
  }

  @Query(() => [AuthorEntity])
  findAllAuthors(): Promise<AuthorEntity[]> {
    return this.authorsService.findAll();
  }
}
