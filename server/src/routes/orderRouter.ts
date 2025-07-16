import { Router } from "express";
import { createOrder } from "@/controllers/orderController";

const router = Router();

/**
 * @openapi
 * /order:
 *   post:
 *     summary: Создать заказ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderRequest'
 *     responses:
 *       200:
 *         description: Успешное создание заказа
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Неверные данные в запросе
 *       500:
 *         description: Ошибка сервера
 */
router.post("/", createOrder);

export default router;
