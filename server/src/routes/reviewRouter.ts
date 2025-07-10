import { Router } from "express";
import { getReviews } from "@/controllers/reviewController";

const router = Router();

/**
 * @openapi
 * /reviews:
 *   get:
 *     summary: Получить список отзывов
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get("/", getReviews);

export default router;
