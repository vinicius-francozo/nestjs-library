import { Injectable } from "@nestjs/common";
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  UploadStream,
  v2,
} from "cloudinary";
import * as Upload from "graphql-upload/Upload.js";

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Upload
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload: UploadStream = v2.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      file.createReadStream().pipe(upload);
    });
  }
}
