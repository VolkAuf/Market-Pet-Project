import { Router } from "express";
import { getRandomImage } from "@/controllers/imageController";

const router = Router();

/**
 * @openapi
 * /images/random:
 *   get:
 *     summary: Получить случайную картинку по ключевому слову
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Поисковый запрос (например, "shoes")
 *     responses:
 *       200:
 *         description: Успешно получена ссылка на изображение
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   example: "https://source.unsplash.com/320x240/?laptop"
 */
router.get("/random", getRandomImage);

export default router;
