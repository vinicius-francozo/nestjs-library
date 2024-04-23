import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { ReviewEntity } from "./entities/review.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { UserEntity } from "src/users/entities/user.entity";
import { BookEntity } from "src/books/entities/book.entity";
import { ReviewsResolver } from "./reviews.resolvers";

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity, UserEntity, BookEntity]),
    AuthModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsResolver],
})
export class ReviewsModule {}
