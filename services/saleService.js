const saleModel = require('../models/saleModel');
const productModel = require('../models/productModel');
const { mapSales } = require('../middlewares/validateSales');

const incrementQuantity = async (sales) => {
  const arraySale = (mapSales(sales));
  Promise.all(arraySale.map(({ productId, quantity }) => (
    productModel.increment(productId, quantity)
    )));
};

const decrementQuantity = async (sales) => {
  Promise.all(sales.map(({ productId, quantity }) => (
    productModel.decrement(productId, quantity)
    )));
};

const createNewSale = async (sales) => {
  const { id } = await saleModel.createSale();
  await decrementQuantity(sales);
  const result = sales.map(async ({ productId, quantity }) => {
    await saleModel.createSaleProduct(id, productId, quantity);
  });

  await Promise.all(result);
  return { id };
};

const getAllSales = async () => {
  const sales = await saleModel.getAll();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await saleModel.getById(id);
  return sale;
};

const updateSales = async ({ id, sales }) => {
  const response = await sales.map(async ({ productId, quantity }) => {
    await saleModel.update({ id, productId, quantity });
  });

  await Promise.all(response);
  return response;
};

const removeSales = async (id) => {
  const response = await saleModel.getById(id);
  await saleModel.remove(id);
  await incrementQuantity(response);
  return response;
};

module.exports = {
  createNewSale,
  getAllSales,
  getSaleById,
  updateSales,
  removeSales,
};