const productsServices = require('../services/productsServices');

const getAll = async (_req, res, next) => {
  try { 
    const products = await productsServices.getAll();

    if (products.status) {
      return res.status(products.status)
        .send(products.message);
    }
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const product = await productsServices.create({ name, quantity });

    if (product.status) {
      return res.status(product.status).json({ message: 'Product already exists' });
    }

    return res.status(201).json({ id: product.id, name, quantity });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = await productsServices.getById(id);

    if (productId.status) {
      return res.status(productId.status).json({ message: 'Product not found' });
    }
    return res.status(200).json(productId);
  } catch (err) {
    next(err);
  }
};

const productUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const update = await productsServices.productUpdate({ id, name, quantity });

    if (update.status) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json({ name, quantity });
  } catch (err) {
    next(err);
  }
};

const deleteProducts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const remove = await productsServices.deleteProducts(id);

    if (remove.status) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json(remove);
  } catch (err) {
    next(err);
  }
};

module.exports = {
    getAll,
    create,
    getById,
    productUpdate,
    deleteProducts,
};
