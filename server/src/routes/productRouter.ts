import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "@/controllers/productController";

const router = Router();

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Получить список товаров
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Количество на страницу
 *     responses:
 *       200:
 *         description: Успешный ответ
 */
router.get("/", getProducts);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Получить товар по id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       404:
 *         description: Не найден
 */
router.get("/:id", getProductById);

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Создать товар
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Товар создан
 *       400:
 *         description: Ошибка валидации
 */
router.post("/", createProduct);

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Обновить товар
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Успешно обновлено
 *       400:
 *         description: Ошибка валидации
 *       404:
 *         description: Не найден
 */
router.put("/:id", updateProduct);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Удалить товар
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Успешно удалено
 *       404:
 *         description: Не найден
 */
router.delete("/:id", deleteProduct);

export default router;
