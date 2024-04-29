import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewEntity } from "../graphQL/reviews/types/review.type";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { ReviewsResolver } from "../graphQL/reviews/resolver/reviews.resolvers";
import { BookEntity } from "../graphQL/books/types/book.type";
import { UserEntity } from "../graphQL/users/types/user.type";

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity, UserEntity, BookEntity]),
    AuthModule,
  ],
  providers: [ReviewsService, ReviewsResolver],
})
export class ReviewsModule {}
