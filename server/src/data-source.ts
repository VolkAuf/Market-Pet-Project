import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "@/entity/Product";
import { Review } from "@/entity/Review";
import { Order } from "@/entity/Order";
import { OrderItem } from "@/entity/OrderItem";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Product, Review, Order, OrderItem],
  synchronize: true,
  ssl: { rejectUnauthorized: false },
});
