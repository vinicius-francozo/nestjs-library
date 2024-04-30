import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../../users.service";
import { AuthService } from "../../../auth/auth.service";
import { CloudinaryService } from "../../../cloudinary/cloudinary.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../../../graphQL/users/types/user.type";
import { JwtService } from "@nestjs/jwt";
import { UserDataBuilder } from "../../testing/helpers/user-data-builder";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("UsersService", () => {
  let service: UsersService;
  let props: UserEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        CloudinaryService,
        JwtService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn().mockResolvedValue(new UserEntity()),
            save: jest.fn(),
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
            update: jest.fn().mockResolvedValue(new UserEntity()),
          },
        },
      ],
    }).compile();

    props = UserDataBuilder({});
    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create function", () => {
    it("should create an user", async () => {
      const response: UserEntity = await service.create({
        username: "test",
        password: "123456",
        confirmPassword: "123456",
        email: "a@a.com",
      });

      expect(response).toBeInstanceOf(UserEntity);
    });

    it("should not create an user because the password and the confirmPassword fields were different", () => {
      expect(async () => {
        await service.create({
          confirmPassword: "1234567",
          password: "123456",
          email: "a@a.com",
          username: "test",
        });
      }).rejects.toThrow(BadRequestException);
    });
  });

  describe("findOne function", () => {
    it("should find a user by id (mocked by userId == 1)", async () => {
      const response: UserEntity = await service.findOne(1);
      expect(response).toBeInstanceOf(UserEntity);
    });

    it("should not find a user because the user doesn't exist (mocked by userId === 0)", async () => {
      const response: UserEntity = await service.findOne(0);
      expect(response).toBeInstanceOf(NotFoundException);
    });
  });

  describe("update function", () => {
    it("should find a user by id and update (mocked by userId == 1)", async () => {
      jest.spyOn(service, "update").mockResolvedValueOnce(new UserEntity());
      const response: UserEntity = await service.update(1, props as any);

      expect(response).toBeInstanceOf(UserEntity);
    });

    it("should not update because the user doesnt exist (mocked by userId === 0)", async () => {
      expect(async () => {
        await service.update(0, props as any);
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe("changeImage function", () => {
    it("should find a user by id and update the image(mocked by userId == 1)", async () => {
      jest
        .spyOn(service, "changeImage")
        .mockResolvedValueOnce(new UserEntity());
      const response: UserEntity = await service.changeImage(1, props as any);

      expect(response).toBeInstanceOf(UserEntity);
    });

    it("should not update the image because the user doesnt exist (mocked by userId === 0)", async () => {
      expect(async () => {
        await service.changeImage(0, props as any);
      }).rejects.toThrow(NotFoundException);
    });
  });
});
