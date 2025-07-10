import { Request, Response } from "express";
import { Review } from "@/entity/Review";
import { AppDataSource } from "@/data-source";

const reviewRepo = () => AppDataSource.getRepository(Review);

export const getReviews = async (_req: Request, res: Response) => {
  const reviews = await reviewRepo().find();
  res.status(201).json(reviews);
};
