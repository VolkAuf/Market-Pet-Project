import { Request, Response } from "express";
import { Product } from "@/entity/Product";
import { AppDataSource } from "@/data-source";

const productRepo = () => AppDataSource.getRepository(Product);

export const getProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const skip = (page - 1) * limit;

  const [data, total] = await productRepo().findAndCount({
    order: { id: "ASC" },
    skip,
    take: limit,
  });

  return res.json({ data, total });
};

export const createProduct = async (req: Request, res: Response) => {
  const { article, name, price, quantity, imageUrl } = req.body;

  if (!article || !name || price <= 0 || quantity < 0) {
    return res.status(400).json({ error: "Validation failed" });
  }

  const exists = await productRepo().findOneBy({ article });
  if (exists) {
    return res.status(400).json({ error: "Article must be unique" });
  }

  const product = productRepo().create({ article, name, price, quantity, imageUrl });
  await productRepo().save(product);
  return res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, article, price, quantity } = req.body;

  const product = await productRepo().findOneBy({ id });
  if (!product) return res.status(404).json({ error: "Not found" });

  if (!name || price <= 0 || quantity < 0) {
    return res.status(400).json({ error: "Validation failed" });
  }

  // Проверка уникальности article, если он изменился
  if (product.article !== article) {
    const existing = await productRepo().findOneBy({ article });
    if (existing) return res.status(400).json({ error: "Article must be unique" });
    product.article = article;
  }

  product.name = name;
  product.price = price;
  product.quantity = quantity;

  await productRepo().save(product);
  return res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await productRepo().delete(id);
  if (!result.affected) {
    return res.status(404).json({ error: "Not found" });
  }
  return res.status(204).send();
};
