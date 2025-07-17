import { Request, Response } from "express";
import { AppDataSource } from "@/data-source";
import { Order } from "@/entity/Order";
import { OrderItem } from "@/entity/OrderItem";

const orderRepo = () => AppDataSource.getRepository(Order);

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { phone, cart } = req.body;

    if (!phone || !Array.isArray(cart)) {
      return res.status(400).json({ isSuccess: false, error: "Invalid input data" });
    }

    const order = new Order();
    order.phone = phone;
    order.items = cart.map((item) => {
      const orderItem = new OrderItem();
      orderItem.productId = item.id;
      orderItem.quantity = item.quantity;
      return orderItem;
    });

    await orderRepo().save(order);

    res.status(200).json({ isSuccess: true });
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    res.status(500).json({ isSuccess: false, error: "Internal Server Error" });
  }
};
