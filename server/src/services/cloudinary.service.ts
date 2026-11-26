import { cloudinary } from "../config/cloudinary.js";
import { Readable } from "node:stream";

export function uploadArtworkImage(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "artcase/artworks",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result?.secure_url) {
          return reject(new Error("Cloudinary upload failed."));
        }

        resolve(result.secure_url);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}