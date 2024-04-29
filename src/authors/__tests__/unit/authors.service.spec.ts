import { Test, TestingModule } from "@nestjs/testing";
import { AuthorsService } from "../../authors.service";
import { CloudinaryService } from "../../../cloudinary/cloudinary.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../../../graphQL/users/types/user.type";
import { AuthorEntity } from "../../../graphQL/authors/types/author.type";
import { AuthorDataBuilder } from "../../testing/helpers/author-data-builder";
import { UploadApiResponse } from "cloudinary";
import { ConflictException, NotFoundException } from "@nestjs/common";

describe("AuthorsService", () => {
  let service: AuthorsService;
  let cloudService: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
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
          provide: getRepositoryToken(AuthorEntity),
          useValue: {
            existsBy: jest.fn().mockImplementation((author) => {
              if (author.name == author.surname) {
                return Promise.resolve(true);
              }
              return Promise.resolve(false);
            }),
            create: jest.fn().mockResolvedValue(new AuthorEntity()),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue([new AuthorEntity()]),
            findOne: jest.fn().mockImplementation((userExists) => {
              if (userExists?.where?.id === 1) {
                return Promise.resolve(new AuthorEntity());
              }
              return null;
            }),
            findOneBy: jest.fn().mockImplementation((userExists) => {
              if (userExists?.id === 1) {
                return Promise.resolve(new AuthorEntity());
              }
              return null;
            }),
            update: jest.fn().mockResolvedValue(new AuthorEntity()),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    cloudService = module.get<CloudinaryService>(CloudinaryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create function", () => {
    it("should create an author", async () => {
      jest
        .spyOn(cloudService, "uploadImage")
        .mockResolvedValue({} as UploadApiResponse);
      const response = await service.create(1, AuthorDataBuilder({}));

      expect(response).toBeTruthy();
    });

    it("should raise an error because an author with that name already exists", async () => {
      expect(
        async () =>
          await service.create(
            1,
            AuthorDataBuilder({ name: "a", surname: "a" })
          )
      ).rejects.toThrow(ConflictException);
    });

    it("should raise an error because the user doesnt exist (mock by userId === 0)", async () => {
      expect(
        async () => await service.create(0, AuthorDataBuilder({}))
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("searchpaginated function", () => {
    it("should return a list of books", async () => {
      const response = await service.searchPaginated(5, 1);

      expect(response).toStrictEqual([new AuthorEntity()]);
    });
  });

  describe("findall function", () => {
    it("should return a list of books", async () => {
      const response = await service.findAll();

      expect(response).toStrictEqual([new AuthorEntity()]);
    });
  });

  describe("findeOne function", () => {
    it("should return a book", async () => {
      const response = await service.findOne(1);

      expect(response).toBeInstanceOf(AuthorEntity);
    });

    it("should not return a book because the book doesnt exist (mock by bookId === 0)", async () => {
      const response = await service.findOne(0);

      expect(response).toBeNull();
    });
  });

  describe("update function", () => {
    it("should update a books", async () => {
      const response = await service.update(1, {
        ...AuthorDataBuilder({ picture: "" }),
      });

      expect(response).toBeInstanceOf(AuthorEntity);
    });

    it("should not update a books because the book doesnt exist (mock bookId === 0)", async () => {
      expect(
        async () =>
          await service.update(0, {
            ...AuthorDataBuilder({ picture: "" }),
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
