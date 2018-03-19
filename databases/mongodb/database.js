const mongoose = require('mongoose');

module.exports = class Database {
  static async getAll(model) {
    const Model = mongoose.model(model);
    return Model.find({});
  }

  static async create(model, data) {
    const Model = mongoose.model(model);
    const createdModel = new Model(data);
    await createdModel.save();
    return createdModel;
  }

  static async find(model, id) {
    const Model = mongoose.model(model);
    const foundItem = await Model.findById(id);
    return foundItem;
  }

  static async update(model, id, body) {
    const Model = mongoose.model(model);
    const foundItem = await Model.findById(id);
    await Model.update({ _id: foundItem.id }, { $set: body }, () => {
    });
    return foundItem;
  }

  static async delete(model, id) {
    const Model = mongoose.model(model);
    const foundItem = await Model.findById(id);
    await Model.remove({ _id: foundItem.id }, () => {
    });
    return foundItem;
  }
};

