import { v2 } from "cloudinary";
require("dotenv").config();

export const CloudinaryProvider = {
  provide: "Cloudinary",
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUDNAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
