import { Request, Response } from "express";
import { AppDataSource } from "@/data-source";
import { Order } from "@/entity/Order";
import { OrderItem } from "@/entity/OrderItem";

const orderRepo = () => AppDataSource.getRepository(Order);

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { phone, cart } = req.body;

    if (!phone || !Array.isArray(cart)) {
      return res.status(400).json({ success: 0, error: "Неверные данные" });
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

    res.status(200).json({ success: 1 });
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    res.status(500).json({ success: 0, error: "Ошибка сервера" });
  }
};
