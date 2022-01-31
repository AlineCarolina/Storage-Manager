const productsModel = require('../models/productsModel');

const getAll = async () => {
    const products = await productsModel.getAll();

    if (!products) {
        return { status: 404, message: 'Not Found' };
    }

    return products;
};

const create = async ({ name, quantity }) => {
    const catchedName = await productsModel.getByName(name);
  
    if (catchedName) {
      return { status: 409 };
    }
  
    const product = await productsModel.create({ name, quantity });
  
    return { id: product.id };
};

const getById = async (id) => {
  const catchedId = await productsModel.getById(id);

  if (!catchedId) {
    return { status: 404 };
  }
  return catchedId;
};

module.exports = {
    getAll,
    create,
    getById,
};
