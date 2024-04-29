import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewDto } from "../graphQL/reviews/inputs/create-review.input";
import { UpdateReviewDto } from "../graphQL/reviews/inputs/update-review.input";
import { ReviewEntity } from "../graphQL/reviews/types/review.type";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { BookEntity } from "../graphQL/books/types/book.type";
import { UserEntity } from "../graphQL/users/types/user.type";

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
    createReviewDto: CreateReviewDto
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
    const review = this.reviewRepository.create({
      ...createReviewDto,
      user,
      book,
    });
    await this.reviewRepository.save([review]);
    return review;
  }

  async getUserReviews(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const reviews = await this.reviewRepository.find({
      where: { user },
    });
    return reviews;
  }

  async update(
    userId: number,
    id: number,
    updateReviewDto: UpdateReviewDto
  ): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const isUpdated = await this.reviewRepository.update(
      { id, user },
      updateReviewDto
    );
    return isUpdated.affected > 0;
  }

  async remove(userId: number, id: number) {
    let isDeleted: DeleteResult;
    const user = await this.userRepository.findOneBy({ id: userId });
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
