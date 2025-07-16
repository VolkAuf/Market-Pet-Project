import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Inventory API",
      version: "1.0.0",
      description: "API для управления товарами",
    },
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "integer" },
            article: { type: "string" },
            name: { type: "string" },
            price: { type: "number" },
            quantity: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            description: { type: "string" },
            imageUrl: { type: "string" },
          },
        },
        ProductInput: {
          type: "object",
          required: ["article", "name", "price", "quantity", "description", "imageUrl"],
          properties: {
            article: { type: "string" },
            name: { type: "string" },
            price: { type: "number" },
            quantity: { type: "integer" },
            description: { type: "string" },
            imageUrl: { type: "string" },
          },
        },
        Review: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            text: { type: "string", example: "<p>Отличный сервис!</p>" },
          },
        },
        OrderItem: {
          type: "object",
          properties: {
            id: { type: "integer", description: "ID товара" },
            quantity: { type: "integer", description: "Количество" },
          },
          required: ["id", "quantity"],
        },
        OrderRequest: {
          type: "object",
          required: ["phone", "cart"],
          properties: {
            phone: { type: "string", description: "Телефон заказчика" },
            cart: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItem" },
            },
          },
        },
        OrderResponse: {
          type: "object",
          properties: {
            success: { type: "integer", description: "Статус операции, 1 — успех, 0 — ошибка" },
            error: { type: "string", nullable: true, description: "Сообщение об ошибке, если есть" },
          },
        },
      },
    },
  },
  apis: ["./src/index.ts", "./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
