import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesService } from "../../categories.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CategoryEntity } from "../../entities/category.entity";

describe("CategoriesService", () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            create: jest.fn().mockResolvedValue(new CategoryEntity()),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue([new CategoryEntity()]),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create function", () => {
    it("should create a category", async () => {
      const response = await service.create({ name: "test" });

      expect(response).toBeInstanceOf(CategoryEntity);
    });
  });

  describe("findall function", () => {
    it("should return all the categories", async () => {
      const response = await service.findAll();

      expect(response).toStrictEqual([new CategoryEntity()]);
    });
  });
});
