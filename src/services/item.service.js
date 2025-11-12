const Item = require("../models/item");
const { validateItemId } = require("../dto/item.dto");

class ItemService {
  async createItem(itemData) {
    const existing = await Item.findOne({ name: itemData.name });

    if (existing) {
      const error = new Error("Item name already exists.");
      error.statusCode = 409;
      throw error;
    }

    const item = new Item(itemData);
    return await item.save();
  }

  async getAllItems(searchQuery = null) {
    const query = {};

    if (searchQuery && searchQuery.trim()) {
      query.name = { $regex: searchQuery.trim(), $options: "i" };
    }

    return await Item.find(query).sort({ createdAt: -1 });
  }

  async getItemById(id) {
    validateItemId(id);
    const item = await Item.findById(id);
    if (!item) {
      const error = new Error("Item not found");
      error.statusCode = 404;
      throw error;
    }
    return item;
  }

  async updateItem(id, updateData) {
    validateItemId(id);

    const existingItem = await Item.findById(id);
    if (!existingItem) {
      const error = new Error("Item not found");
      error.statusCode = 404;
      throw error;
    }

    if (updateData.name && updateData.name !== existingItem.name) {
      const duplicateItem = await Item.findOne({ name: updateData.name });
      if (duplicateItem) {
        const error = new Error("Item name already exists");
        error.statusCode = 409;
        throw error;
      }
    }

    const item = await Item.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return item;
  }

  async deleteItem(id) {
    validateItemId(id);
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      const error = new Error("Item not found");
      error.statusCode = 404;
      throw error;
    }
    return item;
  }
}

module.exports = new ItemService();
