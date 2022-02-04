const salesModels = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const create = async (sales) => {
    const allProducts = await Promise.all(
      sales.map(({ product_id }) => productsModel.getById(product_id)),
    );
  
    if (allProducts.length !== sales.length) return false;
  
    const id = await salesModels.create(sales);
  
    return id;
  };

const getAll = async () => {
    const sales = await salesModels.getAll();

    if (!sales) {
        return { status: 404 };
      }

    return sales;
};

const getById = async (id) => {
    const catchedId = await salesModels.getById(id);

    if (!catchedId) {
        return { status: 404 };
    }
    return catchedId;
};

module.exports = {
    create,
    getAll,
    getById,
};