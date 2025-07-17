import { Request, Response } from "express";
import { Product } from "@/entity/Product";
import { AppDataSource } from "@/data-source";

const productRepo = () => AppDataSource.getRepository(Product);

export const getProductById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const product = await productRepo().findOneBy({ id });
  if (!product) {
    return res.status(404).json({ isSuccess: false, error: "Not found" });
  }

  return res.status(200).json({ isSuccess: true, data: product });
};

export const getProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 9;
  const skip = (page - 1) * limit;

  const [data, total] = await productRepo().findAndCount({
    order: { id: "ASC" },
    skip,
    take: limit,
  });

  return res.status(200).json({ isSuccess: true, data: { data, total } });
};

export const createProduct = async (req: Request, res: Response) => {
  const reqProduct: Product = req.body;
  const { article, name, price, quantity } = reqProduct;

  if (!article || !name || price <= 0 || quantity < 0) {
    return res.status(400).json({ isSuccess: false, error: "Validation failed" });
  }

  const exists = await productRepo().findOneBy({ article });
  if (exists) {
    return res.status(400).json({ isSuccess: false, error: "Article must be unique" });
  }

  const product = productRepo().create(reqProduct);
  await productRepo().save(product);
  return res.status(201).json({ isSuccess: true, data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const reqProduct: Product = req.body;
  const { article, name, price, quantity } = reqProduct;

  const product = await productRepo().findOneBy({ id });
  if (!product) return res.status(404).json({ isSuccess: false, error: "Not found" });

  if (!name || price <= 0 || quantity < 0) {
    return res.status(400).json({ isSuccess: false, error: "Validation failed" });
  }

  if (product.article !== article) {
    const existing = await productRepo().findOneBy({ article });
    if (existing) return res.status(400).json({ isSuccess: false, error: "Article must be unique" });
    product.article = article;
  }

  product.name = name;
  product.price = price;
  product.quantity = quantity;
  product.imageUrl = reqProduct.imageUrl;
  product.description = reqProduct.description;

  await productRepo().save(product);
  return res.status(200).json({ isSuccess: true, data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await productRepo().delete(id);
  if (!result.affected) {
    return res.status(404).json({ isSuccess: false, error: "Not found" });
  }
  return res.status(200).json({ isSuccess: true });
};
