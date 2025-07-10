import express from "express";
import productRouter from "@/routes/productRouter";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import "reflect-metadata";
import { swaggerSpec } from "@/swagger";
import { AppDataSource } from "@/data-source";
import imageRouter from "@/routes/imageRouter";
import reviewRouter from "@/routes/reviewRouter";

dotenv.config();
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;
const allowedOrigins = [CLIENT_URL];
const PORT = process.env.PORT || 3001;
const HOST_URL = process.env.HOST_URL || "http://localhost";
const DOCS_ROUTE = "/api-docs";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked CORS request from:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(DOCS_ROUTE, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/products", productRouter);
app.use("/images", imageRouter);
app.use("/reviews", reviewRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to DB");
    /**
     * @openapi
     * components:
     *   schemas:
     *     Item:
     *       type: object
     *       properties:
     *         id:
     *           type: integer
     *         name:
     *           type: string
     */
    app.listen(PORT, () => {
      console.log(`Server running at ${HOST_URL}:${PORT}`);
      console.log(`Docs available at ${HOST_URL}:${PORT}${DOCS_ROUTE}`);
    });
  })
  .catch((err) => console.error("DB init error", err));
