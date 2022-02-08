const salesServices = require('../services/salesServices');
const { validateProductId, validateQuantity } = require('./validations');

const validateSale = (saleData) => {
    const errors = saleData.map(({ product_id, quantity }) => {
      if (!(validateProductId(product_id) || validateQuantity(quantity))) return {};
      return validateProductId(product_id) || validateQuantity(quantity);
    });
    return errors.find((error) => error !== {});
  };
  
  const serializeSale = (saleData) => (
    saleData.map((product) => ({
      productId: product.product_id,
      quantity: product.quantity,
    }))
  );
  
  const create = async (req, res) => {
    const saleData = req.body;
    const error = validateSale(saleData);
    if (error.code) {
      const { code, message } = error;
      return res.status(code).json({ message });
    }
  
    const sale = await salesServices.create(serializeSale(saleData));
    if (sale.error) {
      const { code, message } = sale.error;
      return res.status(code).json({ message });
    }
    return res.status(201).json({ ...sale, itemsSold: saleData });
  };

const getAll = async (_req, res, next) => {
    try {
        const sales = await salesServices.getAll();

        if (sales.status) {
            return res.status(sales.status).json({ message: 'Sale not found' });
        }
        return res.status(200).json(sales);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const saleId = await salesServices.getById(+id);
        if (saleId.status) {
            return res.status(saleId.status).json({ message: 'Sale not found' });
          }
          return res.status(200).json(saleId);
         } catch (err) {
        next(err);
    }
};

const saleUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const response = await salesServices.saleUpdate(+id, update);

    if (!response) {
      return res.status(400).json({ message: '"product_id" is required' });
    }
    return res.status(200).json({ saleId: +id, itemUpdated: update });
    } catch (err) {
        next(err);
    }
};

const saleDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await salesServices.saleDelete(id);

    if (!response || response.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    saleUpdate,
    saleDelete,
};