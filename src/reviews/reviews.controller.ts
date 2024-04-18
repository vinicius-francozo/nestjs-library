import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(":bookId")
  create(
    @Param("bookId") bookId: string,
    @Body() createReviewDto: CreateReviewDto
  ) {
    return this.reviewsService.create(+bookId, createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewsService.getUserReviews();
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.reviewsService.remove(+id);
  }
}
