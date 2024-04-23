import { Test, TestingModule } from "@nestjs/testing";
import { RentsService } from "../../rents.service";
import { NotFoundException } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../../../users/entities/user.entity";
import { RentEntity } from "../../entities/rent.entity";
import { BookEntity } from "../../../books/entities/book.entity";

describe("RentsService", () => {
  let service: RentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
          provide: getRepositoryToken(RentEntity),
          useValue: {
            findOne: jest.fn().mockImplementation((userExists) => {
              if (userExists?.id === 1) {
                return Promise.resolve(new RentEntity());
              }
              return null;
            }),
            create: jest.fn().mockResolvedValue(true),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue([new RentEntity()]),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
        RentsService,
      ],
    }).compile();

    service = module.get<RentsService>(RentsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create function", () => {
    it("should create a rent", async () => {
      const response = await service.create(1, 1);

      expect(response).toBe(true);
    });

    it("should not create a rent because user doesnt exist (mocked by userId === 0)", () => {
      expect(async () => await service.create(0, 1)).rejects.toThrow(
        NotFoundException
      );
    });

    it("should not create a rent because user doesnt exist (mocked by userId === 0)", () => {
      expect(async () => await service.create(1, 0)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("listcheckout function", () => {
    it("should return a list of rents", async () => {
      const response = await service.listCheckout(1);

      expect(response).toStrictEqual([new RentEntity()]);
    });

    it("should not return a list of rents because the user doesnt exists (mocked by userId === 0)", async () => {
      expect(async () => {
        await service.listCheckout(0);
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe("getcheckoutorrented function", () => {
    it("should return a checkout/rent from a user", async () => {
      jest
        .spyOn(service, "getOneCheckoutOrRented")
        .mockResolvedValueOnce(new RentEntity());
      const response = await service.getOneCheckoutOrRented(1, 1);

      expect(response).toBeInstanceOf(RentEntity);
    });

    it("should not return a list of rents because the user doesnt exists (mocked by userId === 0)", async () => {
      expect(async () => {
        await service.getOneCheckoutOrRented(1, 0);
      }).rejects.toThrow(NotFoundException);
    });

    it("should not return a list of rents because the book doesnt exists (mocked by bookId === 0)", async () => {
      expect(async () => {
        await service.getOneCheckoutOrRented(1, 0);
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe("confirmpurchase function", () => {
    it("should update all checkout orders", async () => {
      const response = await service.confirmPurchase(1);

      expect(response).toBeTruthy();
    });

    it("should not update because user doenst exist (mock by userId === 0)", () => {
      expect(async () => service.confirmPurchase(0)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("listrents function", () => {
    it("should return a list of rents", async () => {
      const response = await service.listRents(1);

      expect(response).toStrictEqual([new RentEntity()]);
    });

    it("should not return a list of rents because the user doesnt exists (mocked by userId === 0)", async () => {
      expect(async () => {
        await service.listRents(0);
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe("returnbook function", () => {
    it("should return a book rented", async () => {
      const response = await service.returnBook(1, 1);

      expect(response).toBeTruthy();
    });

    it("should not return a book because user doesnt exist (mock by userId === 0)", () => {
      expect(async () => service.returnBook(0, 1)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("remove function", () => {
    it("should remove a book from checkout", async () => {
      const response = await service.remove(1, 1);

      expect(response).toBeTruthy();
    });

    it("should not remove a book because user doesnt exist (mock by userId === 0)", () => {
      expect(async () => service.remove(0, 1)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
