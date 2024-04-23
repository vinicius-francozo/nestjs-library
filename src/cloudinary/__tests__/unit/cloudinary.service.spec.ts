import { Test, TestingModule } from "@nestjs/testing";
import { CloudinaryService } from "../../cloudinary.service";
import { UploadApiResponse } from "cloudinary";

describe("CloudinaryService", () => {
  let service: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudinaryService],
    }).compile();

    service = module.get<CloudinaryService>(CloudinaryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should upload an image and return uploadapiresponse", async () => {
    jest
      .spyOn(service, "uploadImage")
      .mockResolvedValueOnce({} as UploadApiResponse);
    const response = await service.uploadImage("someimage");

    expect(response).toMatchObject<UploadApiResponse>;
  });
});
