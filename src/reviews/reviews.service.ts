import { Injectable } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Injectable()
export class ReviewsService {
  create(bookId: number, createReviewDto: CreateReviewDto) {
    return "This action adds a new review";
  }

  getUserReviews() {
    return `This action returns all reviews from a user`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
