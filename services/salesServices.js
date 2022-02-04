const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const create = async (sales) => {
    const allProducts = await Promise.all(
      sales.map(({ product_id }) => productsModel.getById(product_id)),
    );
  
    if (allProducts.length !== sales.length) return false;
  
    const id = await salesModel.create(sales);
  
    return id;
  };

const getAll = async () => {
    const sales = await salesModel.getAll();

    if (!sales) {
        return { status: 404 };
      }

    return sales;
};

const getById = async (id) => {
    const catchedId = await salesModel.getById(id);

    if (!catchedId || catchedId.length === 0) return { status: 404 };

    return catchedId;
};

const saleUpdate = async (id, arrSales) => {
  const allProducts = await Promise.all(
    arrSales.map(({ product_id }) => productsModel
    .getById(product_id)),
  );

  if (allProducts.length !== arrSales.length) return false;

  const response = await salesModel.saleUpdate(id, arrSales);

  return response;
};

module.exports = {
    create,
    getAll,
    getById,
    saleUpdate,
};