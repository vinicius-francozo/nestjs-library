import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Put,
} from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("authors")
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto, @Req() req) {
    return this.authorsService.create(+req.user.id, createAuthorDto);
  }

  @Get("/perPage")
  search(@Query() { perPage, page }) {
    return this.authorsService.searchPaginated(+perPage, +page);
  }

  @Get()
  listAll() {
    return this.authorsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authorsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put(":id")
  update(@Param("id") id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authorsService.remove(+id);
  }
}
