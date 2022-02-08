const saleService = require('../services/saleService');
const { mapSales } = require('../middlewares/validateSales');

const createSales = async (request, response) => {
  const sales = mapSales(request.body);
  const { id } = await saleService.createNewSale(sales);
  return response.status(201).json({ id, itemsSold: request.body });
};

const getAllSales = async (_request, response) => {
  const sales = await saleService.getAllSales();
  return response.status(200).json(sales);
};

const getByIdSales = async (request, response) => {
  const { id } = request.params;
  const sale = await saleService.getSaleById(id);
  if (!sale || sale.length === 0) {
    return response.status(404).json({ message: 'Sale not found' });
  }
  return response.status(200).json(sale);
};

const updateProducts = async (request, response) => {
  const { id } = request.params;
  const sales = mapSales(request.body);
  await saleService.updateSales({ id, sales });
  return response.status(200).json({ saleId: id, itemUpdated: request.body });
};

const deleteProduct = async (request, response) => {
  const { id } = request.params;
  const sale = await saleService.removeSales(id);

  if (!sale || sale.length === 0) {
    return response.status(404).json({ message: 'Sale not found' });
  }

  return response.status(200).json(sale);
};

module.exports = {
  createSales,
  getAllSales,
  getByIdSales,
  updateProducts,
  deleteProduct,
};