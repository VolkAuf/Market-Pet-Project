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
          },
        },
        ProductInput: {
          type: "object",
          required: ["article", "name", "price", "quantity"],
          properties: {
            article: { type: "string" },
            name: { type: "string" },
            price: { type: "number" },
            quantity: { type: "integer" },
          },
        },
        Review: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            text: { type: "string", example: "<p>Отличный сервис!</p>" },
          },
        },
      },
    },
  },
  apis: ["./src/index.ts", "./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
