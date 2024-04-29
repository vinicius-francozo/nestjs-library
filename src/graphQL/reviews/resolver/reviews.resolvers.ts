import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { ReviewsService } from "../../../reviews/reviews.service";
import { ReviewEntity } from "../types/review.type";
import { CreateReviewDto } from "../inputs/create-review.input";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UpdateReviewDto } from "../inputs/update-review.input";
import { UserEntity } from "../../users/types/user.type";

@Resolver("reviews")
export class ReviewsResolver {
  constructor(private reviewsService: ReviewsService) {}

  @Mutation(() => ReviewEntity)
  @UseGuards(AuthGuard)
  createReview(
    @Context("user") user: UserEntity,
    @Args("bookId") bookId: string,
    @Args("data") createReviewDto: CreateReviewDto
  ) {
    return this.reviewsService.create(+user.id, +bookId, createReviewDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  updateReview(
    @Context("user") user: UserEntity,
    @Args("id") id: string,
    @Args("data") updateReviewDto: UpdateReviewDto
  ): Promise<boolean> {
    return this.reviewsService.update(+user.id, +id, updateReviewDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  deleteReview(
    @Context("user") user: UserEntity,
    @Args("id") id: string
  ): Promise<boolean> {
    return this.reviewsService.remove(+user.id, +id);
  }

  @Query(() => [ReviewEntity])
  @UseGuards(AuthGuard)
  getUserReviews(@Context("user") user: UserEntity) {
    return this.reviewsService.getUserReviews(+user.id);
  }
}
