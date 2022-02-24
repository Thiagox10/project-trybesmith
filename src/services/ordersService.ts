import ordersModel from '../models/ordersModel';

const create = async () => {
  const result = await ordersModel.create();
  return result;
};

export default {
  create,
};