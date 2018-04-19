import mongoose from 'mongoose';
import express from 'express';

const Database = {
  getAll: async (model: string) => {
    const Model = mongoose.model(model);
    return Model.find({});
  },

  create: async (model: string, data: express.Request) => {
    const Model = mongoose.model(model);
    const createdModel = new Model(data);
    await createdModel.save();
    return createdModel;
  },

  find: async (model: string, id: string) => {
    const Model = mongoose.model(model);
    return await Model.findById(id);
  },

  update: async (model: string, id: string, body: any) => {
    const Model = mongoose.model(model);
    return await Model.update({ _id: await Model.findById(id) }, { $set: body }, () => {
    });
  },

  delete: async (model: string, id: string) => {
    const Model = mongoose.model(model);
    return await Model.remove({ _id: await Model.findById(id) }, () => {
    });
  }
};

module.exports = Database;

