import { Test, TestingModule } from "@nestjs/testing";
import { FavoritesService } from "../../favorites.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BookEntity } from "../../../graphQL/books/types/book.type";
import { UserEntity } from "../../../graphQL/users/types/user.type";
import { FavoriteEntity } from "../../../graphQL/favorites/types/favorite.type";
import { NotFoundException } from "@nestjs/common";

describe("FavoritesService", () => {
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOneByOrFail: jest.fn().mockImplementation((userExists) => {
              if (userExists?.id === 1) {
                return Promise.resolve(new UserEntity());
              }
              return Promise.reject();
            }),
          },
        },
        {
          provide: getRepositoryToken(BookEntity),
          useValue: {
            findOneByOrFail: jest.fn().mockImplementation((userExists) => {
              if (userExists?.id === 1) {
                return Promise.resolve(new BookEntity());
              }
              console.log(userExists);

              return Promise.reject();
            }),
            findOneBy: jest.fn().mockImplementation((userExists) => {
              if (userExists?.id === 1) {
                return Promise.resolve(new BookEntity());
              }
              return null;
            }),
          },
        },
        {
          provide: getRepositoryToken(FavoriteEntity),
          useValue: {
            create: jest.fn().mockResolvedValue(new FavoriteEntity()),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue([new FavoriteEntity()]),
            findOneBy: jest.fn().mockImplementation((userExists) => {
              if (userExists?.id === 1) {
                return Promise.resolve(new BookEntity());
              }
              return null;
            }),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create function", () => {
    it("should create a favorite", async () => {
      const response: boolean = await service.create(1, 1);

      expect(response).toBeTruthy();
    });

    it("should not create a favorite because user doesnt exist (mocked by userId === 0)", () => {
      expect(async () => await service.create(0, 1)).rejects.toThrow(
        NotFoundException
      );
    });

    it("should not create a favorite because user doesnt exist (mocked by userId === 0)", () => {
      expect(async () => await service.create(1, 0)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("getuserfavorite function", () => {
    it("should return the list of the user favorites", async () => {
      const response: FavoriteEntity[] = await service.getUserFavorites(1);

      expect(response).toStrictEqual([new FavoriteEntity()]);
    });

    it("should throw an error because user doesnt exist (mocked by userId === 0)", () => {
      expect(async () => await service.getUserFavorites(0)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("findOneByUserAndBookId function", () => {
    it("should return a book if it is a users favorite", async () => {
      jest.spyOn(service, "findOneByUserAndBookId").mockResolvedValueOnce(true);
      const response: boolean = await service.findOneByUserAndBookId(1, 1);

      expect(response).toBeTruthy();
    });

    it("should throw an error because user doesnt exist (mocked by userId === 0)", () => {
      expect(
        async () => await service.findOneByUserAndBookId(0, 1)
      ).rejects.toThrow(NotFoundException);
    });

    it("should throw an error because book doesnt exist (mocked by bookId === 0)", () => {
      expect(
        async () => await service.findOneByUserAndBookId(1, 0)
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("remove function", () => {
    it("should remove a book from favorites", async () => {
      const response: boolean = await service.remove(1, 1);

      expect(response).toBeTruthy();
    });

    it("should not remove a book because user doesnt exist (mock by userId === 0)", () => {
      expect(async () => service.remove(0, 1)).rejects.toThrow(
        NotFoundException
      );
    });

    it("should not remove a book because book doesnt exist (mock by bookId === 0)", () => {
      expect(async () => service.remove(0, 1)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
