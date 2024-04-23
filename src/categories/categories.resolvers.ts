import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CategoryEntity } from "./entities/category.entity";
import { AuthGuard } from "src/auth/auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver("categories")
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => CategoryEntity)
  createCategory(@Args("data") createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Query(() => [CategoryEntity])
  findAllCategories(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAll();
  }
}
