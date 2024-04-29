import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "../graphQL/categories/inputs/create-category.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryEntity } from "../graphQL/categories/types/category.type";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save([category]);
    return category;
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }
}
