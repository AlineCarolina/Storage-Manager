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

const productUpdate = async (id, name, quantity) => {
  const existingProduct = await productsModel.getById(id);
  if (!existingProduct) {
    return {
      error: {
        code: 404,
        message: 'Product not found',
      },
    };
  }

  const updatedProduct = await productsModel.productUpdate(id, name, quantity);
  return updatedProduct;
};

const deleteProducts = async (id) => {
  const res = await productsModel.getById(id);

  const product = await productsModel.deleteProducts(id);

  if (!product.update) {
    return { status: 404 };
  }
  return res;
};

module.exports = {
    getAll,
    create,
    getById,
    productUpdate,
    deleteProducts,
};
