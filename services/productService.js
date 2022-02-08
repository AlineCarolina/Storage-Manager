const productModel = require('../models/productModel');
const productSchema = require('../schemas/productSchema');

const productValidation = (name, quantity) =>
  productSchema.validate({ name, quantity });

const createProduct = async (name, quantity) => {
  const product = await productModel.getByName(name);
  if (product) return { error: { status: 409, message: 'Product already exists' } };

  const { insertId: id } = await productModel.create({ name, quantity });

  return { id, name, quantity };
};

const getProductById = async (id) => {
  const product = await productModel.getById(id);
  if (!product) return { error: { status: 404, message: 'Product not found' } };
  return product;
};

const getAllProducts = async () => {
  const products = await productModel.getAll();
  return products;
};

const updateProduct = async (id, name, quantity) => {
  const product = await productModel.getById(id);
  if (!product) return { error: { status: 404, message: 'Product not found' } };
  await productModel.update(id, name, quantity);
  return { id, name, quantity };
};

const removeProduct = async (id) => {
  const product = await productModel.getById(id);
  if (!product) return { error: { status: 404, message: 'Product not found' } };
  await productModel.remove(id);
  return product;
};

module.exports = {
  productValidation,
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  removeProduct,
};