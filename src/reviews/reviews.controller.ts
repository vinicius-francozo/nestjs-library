import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard)
  @Post(":bookId")
  create(
    @Param("bookId") bookId: string,
    @Body() createReviewDto: CreateReviewDto,
    @Req() req
  ) {
    return this.reviewsService.create(+req.user.id, +bookId, createReviewDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  getUserReviews(@Req() req) {
    return this.reviewsService.getUserReviews(+req.user.id);
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
