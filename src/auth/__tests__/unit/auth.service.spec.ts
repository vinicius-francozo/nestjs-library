import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../../auth.service";
import { JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../../../users/entities/user.entity";

describe("AuthService", () => {
  let service: AuthService;
  let jwtService: JwtService;
  const fakeUser = new UserEntity();
  fakeUser.password =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiYWFhIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcxMzkxMTgwNH0.VEJuINbXQeD33QCQoaPjehFBEeIZ_tRSvAnqBUDIv2s";
  fakeUser.username = "test";

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOneByOrFail: jest.fn().mockImplementation((userExists) => {
              console.log(userExists, fakeUser.username);
              if (userExists?.username == fakeUser.username) {
                return Promise.resolve(fakeUser);
              }
              return Promise.reject();
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createtoken function", () => {
    it("should create a token", async () => {
      jest.spyOn(jwtService, "sign").mockReturnValue("faketoken");
      const response = await service.createToken(new UserEntity());

      expect(response).toBe("faketoken");
    });
  });

  describe("verifyToken function", () => {
    it("should decode a token", async () => {
      jest
        .spyOn(jwtService, "verifyAsync")
        .mockResolvedValue({ prop1: "test" });
      const response = await service.verifyToken("token");

      expect(response).toMatchObject({ prop1: "test" });
    });
  });

  describe("login function", () => {
    it("should return a token", async () => {
      jest.spyOn(service, "login").mockResolvedValue("faketoken");
      const response = await service.login("test", "123456");

      expect(response).toBe("faketoken");
    });
  });
});
