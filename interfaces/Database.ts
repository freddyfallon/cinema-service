import Cinema from './Cinema';
export default interface Database {
  getAll: Function
  create: Function
  find: Function
  update: (model: string, id: string, body: string) => Cinema
  delete: (model: string, id: string) => Cinema
}