import express from 'express';
import Cinema from './Cinema'

export default interface Database {
  getAll: (model: string) => Cinema[]
  create: (model: string, data: express.Request) => Cinema
  find: (model: string, id: string) => Cinema
  update: (model: string, id: string, body: string) => Cinema
  delete: (model: string, id: string) => Cinema
}