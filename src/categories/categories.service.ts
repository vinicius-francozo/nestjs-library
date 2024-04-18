import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    return "This action adds a new category";
  }

  findAll() {
    return `This action returns all categories`;
  }
}
