import { Test, TestingModule } from "@nestjs/testing";
import { BooksService } from "../../books.service";
import { CloudinaryService } from "../../../cloudinary/cloudinary.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../../../graphQL/users/types/user.type";
import { BookEntity } from "../../../graphQL/books/types/book.type";
import { AuthorEntity } from "../../../graphQL/authors/types/author.type";
import { CategoryEntity } from "../../../graphQL/categories/types/category.type";
import { BookDataBuilder } from "../../testing/helpers/book-data-builder";
import { UploadApiResponse } from "cloudinary";
import { NotFoundException } from "@nestjs/common";

describe("BooksService", () => {
  let service: BooksService;
  let cloudinaryService: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        CloudinaryService,
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
            create: jest.fn().mockResolvedValue(new BookEntity()),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue([new BookEntity()]),
            findOne: jest.fn().mockImplementation((userExists) => {
              if (userExists?.id === 1) {
                return Promise.resolve(new BookEntity());
              }
              return null;
            }),
            findOneBy: jest.fn().mockImplementation((userExists) => {
              if (userExists?.id === 1) {
                return Promise.resolve(new BookEntity());
              }
              return null;
            }),
            update: jest.fn().mockResolvedValue(new BookEntity()),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
        {
          provide: getRepositoryToken(AuthorEntity),
          useValue: {
            findOneByOrFail: jest.fn().mockImplementation((userExists) => {
              if (userExists?.id === 1) {
                return Promise.resolve(new AuthorEntity());
              }
              console.log(userExists);

              return Promise.reject();
            }),
          },
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            findOneByOrFail: jest.fn().mockImplementation((userExists) => {
              if (userExists?.id === 1) {
                return Promise.resolve(new CategoryEntity());
              }
              console.log(userExists);

              return Promise.reject();
            }),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create function", () => {
    it("should create a book", async () => {
      jest
        .spyOn(cloudinaryService, "uploadImage")
        .mockResolvedValue({} as UploadApiResponse);
      const response = await service.create(
        1,
        BookDataBuilder({ author_id: 1, category_id: 1 })
      );

      expect(response).toBeInstanceOf(BookEntity);
    });

    it("should not create a book because the user doenst exists", async () => {
      jest
        .spyOn(cloudinaryService, "uploadImage")
        .mockResolvedValue({} as UploadApiResponse);

      expect(async () => {
        await service.create(
          0,
          BookDataBuilder({ author_id: 1, category_id: 1 })
        );
      }).rejects.toThrow(NotFoundException);
    });

    it("should not create a book because the author doenst exists", async () => {
      jest
        .spyOn(cloudinaryService, "uploadImage")
        .mockResolvedValue({} as UploadApiResponse);

      expect(async () => {
        await service.create(
          0,
          BookDataBuilder({ author_id: 0, category_id: 1 })
        );
      }).rejects.toThrow(NotFoundException);
    });

    it("should not create a book because the category doenst exists", async () => {
      jest
        .spyOn(cloudinaryService, "uploadImage")
        .mockResolvedValue({} as UploadApiResponse);

      expect(async () => {
        await service.create(
          0,
          BookDataBuilder({ author_id: 1, category_id: 0 })
        );
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe("searchpaginated function", () => {
    it("should return a list of books", async () => {
      const response = await service.searchPaginated(5, 1);

      expect(response).toStrictEqual([new BookEntity()]);
    });
  });

  describe("findall function", () => {
    it("should return a list of books", async () => {
      const response = await service.findAll();

      expect(response).toStrictEqual([new BookEntity()]);
    });
  });

  describe("findeOne function", () => {
    it("should return a book", async () => {
      const response = await service.findOne(1);

      expect(response).toBeInstanceOf(BookEntity);
    });

    it("should not return a book because the book doesnt exist (mock by bookId === 0)", async () => {
      const response = await service.findOne(0);

      expect(response).toBeNull();
    });
  });

  describe("listbyname function", () => {
    it("should return a list of books", async () => {
      const response = await service.listByName("asdd");

      expect(response).toStrictEqual([new BookEntity()]);
    });
  });

  describe("update function", () => {
    it("should update a books", async () => {
      const response = await service.update(1, {
        ...BookDataBuilder({ cover: "" }),
      });

      expect(response).toBeInstanceOf(BookEntity);
    });

    it("should not update a books because the book doesnt exist (mock bookId === 0)", async () => {
      expect(
        async () =>
          await service.update(0, {
            ...BookDataBuilder({ cover: "" }),
          })
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("remove function", () => {
    it("should remove a book", async () => {
      const response = await service.remove(1);
      expect(response).toBeTruthy();
    });
  });
});
