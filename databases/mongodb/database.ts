const mongoose = require('mongoose');

const Database = {
  getAll: async (model: any) => {
    const Model = mongoose.model(model);
    return Model.find({});
  },

  create: async (model: any, data: any) => {
    const Model = mongoose.model(model);
    const createdModel = new Model(data);
    await createdModel.save();
    return createdModel;
  },

  find: async (model: any, id: any) => {
    const Model = mongoose.model(model);
    const foundItem = await Model.findById(id);
    return foundItem;
  },

  update: async (model: any, id: any, body: any) => {
    const Model = mongoose.model(model);
    const foundItem = await Model.findById(id);
    await Model.update({ _id: foundItem.id }, { $set: body }, () => {
    });
    return foundItem;
  },

  delete: async (model: any, id: any) => {
    const Model = mongoose.model(model);
    const foundItem = await Model.findById(id);
    await Model.remove({ _id: foundItem.id }, () => {
    });
    return foundItem;
  }
};

module.exports = Database;

