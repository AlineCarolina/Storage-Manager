const service = require('../services/productService');

const validateProduct = async (request, _response, next) => {
  const { name, quantity } = request.body;
  const validation = service.productValidation(name, quantity);
  if (validation.error) return next(validation.error);
  next();
};

const createProducts = async (request, response, next) => {
  const { name, quantity } = request.body;
  const product = await service.createProduct(name, quantity);

  if (product.error) return next(product.error);

  return response.status(201).json(product);
};

const getAllProducts = async (_request, response) => {
  const products = await service.getAllProducts();
  return response.status(200).json(products);
};

const getByIdProducts = async (request, response, next) => {
  const { id } = request.params;
  const product = await service.getProductById(id);
  if (product.error) return next(product.error);
  return response.status(200).json(product);
};

const updateProducts = async (request, response, next) => {
  const { id } = request.params;
  const { name, quantity } = request.body;
  const product = await service.updateProduct(id, name, quantity);
  if (product.error) return next(product.error);
  return response.status(200).json(product);
};

const deleteProduct = async (request, response, next) => {
  const { id } = request.params;
  const product = await service.removeProduct(id);
  if (product.error) return next(product.error);
  return response.status(200).json(product);
};

module.exports = {
  validateProduct,
  createProducts,
  getAllProducts,
  getByIdProducts,
  updateProducts,
  deleteProduct,
};