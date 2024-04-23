import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { CategoryEntity } from "./entities/category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { UsersResolver } from "src/users/users.resolvers";
import { CategoriesResolver } from "./categories.resolvers";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesResolver],
})
export class CategoriesModule {}
