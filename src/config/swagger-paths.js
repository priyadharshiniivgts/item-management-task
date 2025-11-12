const swaggerPaths = {
  "/health": {
    get: {
      summary: "Health check endpoint",
      description:
        "Returns application status, database connection status, and uptime",
      tags: ["Health"],
      responses: {
        200: {
          description: "Server is running",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/HealthCheckResponse",
              },
              example: {
                status: "UP",
                dbStatus: "Connected",
                uptime: "120s",
              },
            },
          },
        },
        503: {
          description: "Server is down",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/HealthCheckResponse",
              },
            },
          },
        },
      },
    },
  },
  "/api/items": {
    post: {
      summary: "Create a new item",
      description: "Create a new item with name, description, and price",
      tags: ["Items"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateItemRequest",
            },
            example: {
              name: "Laptop",
              description: "High-performance laptop with 16GB RAM",
              price: 999.99,
            },
          },
        },
      },
      responses: {
        201: {
          description: "Item created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Item created successfully",
                  },
                  data: {
                    $ref: "#/components/schemas/Item",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        409: {
          description: "Item name already exists",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Get all items",
      description: "Retrieve all items with optional search by name",
      tags: ["Items"],
      parameters: [
        {
          in: "query",
          name: "search",
          schema: {
            type: "string",
          },
          description: "Search items by name (case-insensitive, partial match)",
          example: "laptop",
        },
      ],
      responses: {
        200: {
          description: "Items retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Items retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Item",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/items/{id}": {
    get: {
      summary: "Get item by ID",
      description: "Retrieve a single item by its ID",
      tags: ["Items"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "Item ID (MongoDB ObjectId)",
          example: "507f1f77bcf86cd799439011",
        },
      ],
      responses: {
        200: {
          description: "Item retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Item retrieved successfully",
                  },
                  data: {
                    $ref: "#/components/schemas/Item",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid ID format",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: {
          description: "Item not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
    put: {
      summary: "Update an item",
      description:
        "Update an item by ID. All fields are optional, but at least one must be provided.",
      tags: ["Items"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "Item ID (MongoDB ObjectId)",
          example: "507f1f77bcf86cd799439011",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateItemRequest",
            },
            example: {
              name: "Updated Laptop",
              price: 1099.99,
            },
          },
        },
      },
      responses: {
        200: {
          description: "Item updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Item updated successfully",
                  },
                  data: {
                    $ref: "#/components/schemas/Item",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error or invalid ID",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: {
          description: "Item not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        409: {
          description: "Item name already exists",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
    delete: {
      summary: "Delete an item",
      description: "Delete an item by ID",
      tags: ["Items"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "Item ID (MongoDB ObjectId)",
          example: "507f1f77bcf86cd799439011",
        },
      ],
      responses: {
        200: {
          description: "Item deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Item deleted successfully",
                  },
                  data: {
                    type: "null",
                    example: null,
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid ID format",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        404: {
          description: "Item not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerPaths;
