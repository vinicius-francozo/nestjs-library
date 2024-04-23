import { Test, TestingModule } from "@nestjs/testing";
import { ReviewsService } from "../../reviews.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ReviewEntity } from "../../entities/review.entity";
import { UserEntity } from "../../../users/entities/user.entity";
import { BookEntity } from "../../../books/entities/book.entity";
import { NotFoundException } from "@nestjs/common";
import { ReviewDataBuilder } from "../../testing/helpers/review-data-builder";

describe("ReviewsService", () => {
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getRepositoryToken(ReviewEntity),
          useValue: {
            create: jest.fn().mockResolvedValue(new ReviewEntity()),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue([new ReviewEntity()]),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOneByOrFail: jest.fn().mockImplementation((userExists) => {
              if (userExists?.id === 1) {
                return Promise.resolve(new UserEntity());
              }
              return new NotFoundException("Usuário não encontrado");
            }),
            findOneBy: jest.fn().mockImplementation((userExists) => {
              if (userExists?.id === 1) {
                return Promise.resolve(new UserEntity());
              }
              return null;
            }),
          },
        },
        {
          provide: getRepositoryToken(BookEntity),
          useValue: {
            findOneByOrFail: jest.fn().mockImplementation((bookExists) => {
              if (bookExists?.id === 1) {
                return Promise.resolve(new BookEntity());
              }
              return new NotFoundException("Livro não encontrado");
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create function", () => {
    it("should create a review", async () => {
      const response = await service.create(1, 1, ReviewDataBuilder({}));

      expect(response).toBeInstanceOf(ReviewEntity);
    });

    it("should not create a review because the user doesnt exist (mocked by userId === 0)", async () => {
      jest
        .spyOn(service, "create")
        .mockRejectedValueOnce(new NotFoundException());

      expect(async () => {
        await service.create(0, 1, ReviewDataBuilder({}));
      }).rejects.toThrow(NotFoundException);
    });

    it("should not create a review because the book doesnt exist (mocked by bookId === 0)", async () => {
      jest
        .spyOn(service, "create")
        .mockRejectedValueOnce(new NotFoundException());

      expect(async () => {
        await service.create(1, 0, ReviewDataBuilder({}));
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe("getUserReviews function", () => {
    it("should find the user reviews", async () => {
      const response = await service.getUserReviews(1);

      expect(response).toStrictEqual([new ReviewEntity()]);
    });

    it("should should not find the reviews because the user doesnt exist (mocked by userId === 0)", async () => {
      jest.spyOn(service, "getUserReviews").mockResolvedValueOnce([]);

      const response = await service.getUserReviews(0);

      expect(response).toStrictEqual([]);
    });
  });

  describe("update function", () => {
    it("should update a review", async () => {
      jest.spyOn(service, "update").mockResolvedValueOnce(true);
      const response = await service.update(1, 1, ReviewDataBuilder({}));

      expect(response).toBe(true);
    });

    it("should not update a review because the review doesnt exist (mocked by reviewId === 0)", async () => {
      const response = await service.update(1, 0, ReviewDataBuilder({}));

      expect(response).toBe(false);
    });
  });

  describe("remove function", () => {
    it("should remove a review", async () => {
      jest.spyOn(service, "remove").mockResolvedValueOnce(true);
      const response = await service.remove(1, 1);

      expect(response).toBe(true);
    });

    it("should not remove a review because the review doesnt exist (mocked by reviewId === 0)", async () => {
      const response = await service.remove(1, 0);

      expect(response).toBe(false);
    });
  });
});
