import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoryEntity } from "../graphQL/categories/types/category.type";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CategoriesResolver } from "../graphQL/categories/resolver/categories.resolvers";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), AuthModule],
  providers: [CategoriesService, CategoriesResolver],
})
export class CategoriesModule {}
