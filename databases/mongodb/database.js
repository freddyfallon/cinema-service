const mongoose = require('mongoose');

const Database = {
  getAll: async (model) => {
    const Model = mongoose.model(model);
    return Model.find({});
  },

  create: async (model, data) => {
    const Model = mongoose.model(model);
    const createdModel = new Model(data);
    await createdModel.save();
    return createdModel;
  },

  find: async (model, id) => {
    const Model = mongoose.model(model);
    const foundItem = await Model.findById(id);
    return foundItem;
  },

  update: async (model, id, body) => {
    const Model = mongoose.model(model);
    const foundItem = await Model.findById(id);
    await Model.update({ _id: foundItem.id }, { $set: body }, () => {
    });
    return foundItem;
  },

  delete: async (model, id) => {
    const Model = mongoose.model(model);
    const foundItem = await Model.findById(id);
    await Model.remove({ _id: foundItem.id }, () => {
    });
    return foundItem;
  }
};

module.exports = Database;

