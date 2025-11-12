const itemService = require("../services/item.service");
const { validateCreateItem, validateUpdateItem } = require("../dto/item.dto");

class ItemController {
  constructor() {}

  async createItem(req, res, next) {
    try {
      const validatedData = validateCreateItem(req.body);
      const item = await itemService.createItem(validatedData);

      res.status(201).json({
        success: true,
        message: "Item created successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllItems(req, res, next) {
    try {
      const searchQuery = req.query.search || null;
      const items = await itemService.getAllItems(searchQuery);

      res.status(200).json({
        success: true,
        message: "Items retrieved successfully",
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  async getItemById(req, res, next) {
    try {
      const { id } = req.params;
      const item = await itemService.getItemById(id);

      res.status(200).json({
        success: true,
        message: "Item retrieved successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req, res, next) {
    try {
      const { id } = req.params;
      const validatedData = validateUpdateItem(req.body);
      const item = await itemService.updateItem(id, validatedData);

      res.status(200).json({
        success: true,
        message: "Item updated successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteItem(req, res, next) {
    try {
      const { id } = req.params;
      await itemService.deleteItem(id);

      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ItemController();
