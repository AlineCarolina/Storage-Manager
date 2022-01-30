const productsServices = require('../services/productsServices');

const getAll = async (req, res, next) => {
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

module.exports = {
    getAll,
    create,
};
