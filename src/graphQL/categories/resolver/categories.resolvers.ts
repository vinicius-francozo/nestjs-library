import { CategoriesService } from "../../../categories/categories.service";
import { CreateCategoryDto } from "../inputs/create-category.input";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CategoryEntity } from "../types/category.type";
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
