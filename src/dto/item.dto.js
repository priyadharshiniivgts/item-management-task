const { z } = require("zod");

const createItemSchema = z.object({
  name: z
    .string({
      required_error: "Item name is required",
      invalid_type_error: "Item name must be a string",
    })
    .trim()
    .min(1, "Item name cannot be empty")
    .max(100, "Item name cannot exceed 100 characters"),
  description: z
    .string({
      required_error: "Item description is required",
      invalid_type_error: "Item description must be a string",
    })
    .trim()
    .min(1, "Item description cannot be empty")
    .max(500, "Item description cannot exceed 500 characters"),
  price: z
    .number({
      required_error: "Item price is required",
      invalid_type_error: "Item price must be a number",
    })
    .min(0, "Price cannot be negative")
    .positive("Price must be greater than 0"),
});

const updateItemSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Item name must be a string",
    })
    .trim()
    .min(1, "Item name cannot be empty")
    .max(100, "Item name cannot exceed 100 characters")
    .optional(),
  description: z
    .string({
      invalid_type_error: "Item description must be a string",
    })
    .trim()
    .min(1, "Item description cannot be empty")
    .max(500, "Item description cannot exceed 500 characters")
    .optional(),
  price: z
    .number({
      invalid_type_error: "Item price must be a number",
    })
    .min(0, "Price cannot be negative")
    .positive("Price must be greater than 0")
    .optional(),
});

const itemIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: "Invalid item ID format",
});

const validateCreateItem = (data) => {
  return createItemSchema.parse(data);
};

const validateUpdateItem = (data) => {
  const result = updateItemSchema.parse(data);
  if (Object.keys(result).length === 0) {
    throw new Error(
      "At least one field (name, description, or price) must be provided for update"
    );
  }
  return result;
};

const validateItemId = (id) => {
  return itemIdSchema.parse(id);
};

module.exports = {
  validateCreateItem,
  validateUpdateItem,
  validateItemId,
  createItemSchema,
  updateItemSchema,
  itemIdSchema,
};
