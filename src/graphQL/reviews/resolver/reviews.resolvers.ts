import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { ReviewsService } from "../../../reviews/reviews.service";
import { ReviewEntity } from "../types/review.type";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UserEntity } from "../../users/types/user.type";
import { CreateAuthorArgs } from "../../authors/args/create-author.args";
import { UpdateReviewArgs } from "../args/update-review.args";
import { CreateReviewArgs } from "../args/create-review.args";

@Resolver("reviews")
export class ReviewsResolver {
  constructor(private reviewsService: ReviewsService) {}

  @Mutation(() => ReviewEntity)
  @UseGuards(AuthGuard)
  createReview(
    @Context("user") user: UserEntity,
    @Args("bookId") bookId: string,
    @Args() { data }: CreateReviewArgs
  ) {
    return this.reviewsService.create(+user.id, +bookId, data);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  updateReview(
    @Context("user") user: UserEntity,
    @Args("id") id: string,
    @Args() { data }: UpdateReviewArgs
  ): Promise<boolean> {
    return this.reviewsService.update(+user.id, +id, data);
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
