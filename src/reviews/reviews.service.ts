import { Injectable, NotFoundException } from "@nestjs/common";

import { ReviewEntity } from "../graphQL/reviews/types/review.type";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { BookEntity } from "../graphQL/books/types/book.type";
import { UserEntity } from "../graphQL/users/types/user.type";
import { CreateReviewInput } from "../graphQL/reviews/inputs/create-review.input";
import { UpdateReviewInput } from "../graphQL/reviews/inputs/update-review.input";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>
  ) {}

  async create(
    userId: number,
    bookId: number,
    createReviewInput: CreateReviewInput
  ) {
    let user: UserEntity;
    let book: BookEntity;

    try {
      user = await this.userRepository.findOneByOrFail({ id: userId });
      book = await this.bookRepository.findOneByOrFail({ id: bookId });
    } catch {
      throw new NotFoundException(
        "Um desses campos não foram encontrados no banco de dados: [Usuário, Livro]"
      );
    }
    const review: ReviewEntity = this.reviewRepository.create({
      ...createReviewInput,
      user,
      book,
    });
    await this.reviewRepository.save([review]);
    return review;
  }

  async getUserReviews(userId: number) {
    const user: UserEntity = await this.userRepository.findOneBy({
      id: userId,
    });
    const reviews: ReviewEntity[] = await this.reviewRepository.find({
      where: { user },
    });
    return reviews;
  }

  async update(
    userId: number,
    id: number,
    updateReviewInput: UpdateReviewInput
  ): Promise<boolean> {
    const user: UserEntity = await this.userRepository.findOneBy({
      id: userId,
    });
    const isUpdated: UpdateResult = await this.reviewRepository.update(
      { id, user },
      updateReviewInput
    );
    return isUpdated.affected > 0;
  }

  async remove(userId: number, id: number) {
    let isDeleted: DeleteResult;
    const user: UserEntity = await this.userRepository.findOneBy({
      id: userId,
    });
    if (user.isAdmin) {
      isDeleted = await this.reviewRepository.delete({ id });
    } else {
      isDeleted = await this.reviewRepository.delete({ id, user });
    }
    if (isDeleted.affected > 0) {
      return true;
    }
    return false;
  }
}
