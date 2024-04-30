import { Injectable } from "@nestjs/common";
import { CreateCategoryInput } from "../graphQL/categories/inputs/create-category.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryEntity } from "../graphQL/categories/types/category.type";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    const category: CategoryEntity =
      this.categoryRepository.create(createCategoryInput);
    await this.categoryRepository.save([category]);
    return category;
  }

  async findAll() {
    const categories: CategoryEntity[] = await this.categoryRepository.find();
    return categories;
  }
}
