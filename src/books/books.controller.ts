import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  Req,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto, @Req() req) {
    return this.booksService.create(+req.user.id, createBookDto);
  }

  @Get("/perPage")
  search(@Query() { perPage, page }) {
    return this.booksService.searchPaginated(+perPage, +page);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get("/find/:name")
  getByName(@Param("name") name: string) {
    return this.booksService.listByName(name);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.booksService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put(":id")
  update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.booksService.remove(+id);
  }
}
