import { Request, Response } from "express";
import * as process from "node:process";
import { createApi } from "unsplash-js";

const unsplash = createApi({ accessKey: process.env.IMAGE_API_ACCESS_KEY! });

export const getRandomImage = async (req: Request, res: Response) => {
  const query = typeof req.query.query === "string" ? req.query.query : "product";
  unsplash.photos
    .getRandom({
      query: query,
      count: 1,
      orientation: "squarish",
    })
    .then((result) => {
      if (result.errors) {
        throw result.errors[0];
      } else {
        const imgResponse = result.response;
        const photo = Array.isArray(imgResponse) ? imgResponse[0] : imgResponse;
        const url = photo.urls.small;
        res.json({ isSuccess: true, data: url });
      }
    })
    .catch((err) => {
      console.error("Image fetch error:", err);
      return res.status(500).json({ isSuccess: false, error: "Internal Server Error" });
    });
};
