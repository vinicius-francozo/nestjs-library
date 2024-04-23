import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { AuthorEntity } from "./entities/author.entity";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { AuthorsService } from "./authors.service";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UserEntity } from "src/users/entities/user.entity";

@Resolver("authors")
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => AuthorEntity)
  createAuthor(
    @Context("user") user: UserEntity,
    @Args("data") createAuthorDto: CreateAuthorDto
  ): Promise<AuthorEntity> {
    return this.authorsService.create(+user.id, createAuthorDto);
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
    @Args("data") updateAuthorDto: UpdateAuthorDto
  ): Promise<AuthorEntity> {
    return this.authorsService.update(+id, updateAuthorDto);
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
