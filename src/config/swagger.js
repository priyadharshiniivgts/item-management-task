const swaggerPaths = require("./swagger-paths");

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Items Microservice API",
    version: "1.0.0",
    description:
      "A Node.js microservice built with Express.js and MongoDB that provides CRUD operations for items with clean architecture, input validation, and comprehensive error handling.",
    contact: {
      name: "API Support",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  paths: swaggerPaths,
  components: {
      schemas: {
        Item: {
          type: "object",
          required: ["name", "description", "price"],
          properties: {
            _id: {
              type: "string",
              description: "Item unique identifier",
              example: "507f1f77bcf86cd799439011",
            },
            name: {
              type: "string",
              description: "Item name",
              minLength: 1,
              maxLength: 100,
              example: "Laptop",
            },
            description: {
              type: "string",
              description: "Item description",
              minLength: 1,
              maxLength: 500,
              example: "High-performance laptop with 16GB RAM",
            },
            price: {
              type: "number",
              description: "Item price",
              minimum: 0,
              exclusiveMinimum: true,
              example: 999.99,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Item creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Item last update timestamp",
            },
          },
        },
        CreateItemRequest: {
          type: "object",
          required: ["name", "description", "price"],
          properties: {
            name: {
              type: "string",
              description: "Item name",
              minLength: 1,
              maxLength: 100,
              example: "Laptop",
            },
            description: {
              type: "string",
              description: "Item description",
              minLength: 1,
              maxLength: 500,
              example: "High-performance laptop with 16GB RAM",
            },
            price: {
              type: "number",
              description: "Item price (must be greater than 0)",
              minimum: 0,
              exclusiveMinimum: true,
              example: 999.99,
            },
          },
        },
        UpdateItemRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Item name",
              minLength: 1,
              maxLength: 100,
              example: "Updated Laptop",
            },
            description: {
              type: "string",
              description: "Item description",
              minLength: 1,
              maxLength: 500,
              example: "Updated description",
            },
            price: {
              type: "number",
              description: "Item price (must be greater than 0)",
              minimum: 0,
              exclusiveMinimum: true,
              example: 1099.99,
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation successful",
            },
            data: {
              type: "object",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message",
            },
            data: {
              type: "null",
              example: null,
            },
          },
        },
        HealthCheckResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "UP",
            },
            dbStatus: {
              type: "string",
              example: "Connected",
            },
            uptime: {
              type: "string",
              example: "120s",
            },
          },
        },
      },
    },
  tags: [
    {
      name: "Items",
      description: "Item management endpoints",
    },
    {
      name: "Health",
      description: "Health check endpoints",
    },
  ],
};

module.exports = swaggerSpec;

