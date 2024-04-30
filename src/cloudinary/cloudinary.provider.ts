import { ConfigOptions, v2 } from "cloudinary";
require("dotenv").config();

type CloudinaryProviderType = {
  provide: string;
  useFactory: () => ConfigOptions;
};

export const CloudinaryProvider: CloudinaryProviderType = {
  provide: "Cloudinary",
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUDNAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
