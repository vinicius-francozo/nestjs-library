import { CategoriesService } from "../../../categories/categories.service";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CategoryEntity } from "../types/category.type";
import { AuthGuard } from "src/auth/auth.guard";
import { UseGuards } from "@nestjs/common";
import { CreateCategoryArgs } from "../args/create-category.args";
import { CreateCategoryInput } from "../inputs/create-category.input";

@Resolver("categories")
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => CategoryEntity)
  createCategory(@Args() { data }: CreateCategoryArgs) {
    return this.categoriesService.create(data);
  }

  @Query(() => [CategoryEntity])
  findAllCategories(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAll();
  }
}
