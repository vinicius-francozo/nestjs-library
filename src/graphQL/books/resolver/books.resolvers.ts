import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { BooksService } from "../../../books/books.service";
import { BookEntity } from "../types/book.type";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UserEntity } from "../../users/types/user.type";
import { CreateBookArgs } from "../args/create-book.args";
import { UpdateBookArgs } from "../args/update-book.args";

@Resolver("books")
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Mutation(() => BookEntity)
  @UseGuards(AuthGuard)
  createBook(
    @Context("user") user: UserEntity,
    @Args() { data }: CreateBookArgs
  ) {
    return this.booksService.create(+user.id, data);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  deleteBook(@Args("id") id: string) {
    return this.booksService.remove(+id);
  }

  @Mutation(() => BookEntity)
  @UseGuards(AuthGuard)
  updateBook(@Args("id") id: string, @Args() { data }: UpdateBookArgs) {
    return this.booksService.update(+id, data);
  }

  @Query(() => [BookEntity])
  findAllBooks() {
    return this.booksService.findAll();
  }

  @Query(() => [BookEntity])
  bookPerPage(@Args("perPage") perPage: string, @Args("page") page: string) {
    return this.booksService.searchPaginated(+perPage, +page);
  }

  @Query(() => [BookEntity])
  bookByName(@Args("name") name: string) {
    return this.booksService.listByName(name);
  }

  @Query(() => BookEntity)
  findOneBook(@Args("id") id: string) {
    return this.booksService.findOne(+id);
  }
}
