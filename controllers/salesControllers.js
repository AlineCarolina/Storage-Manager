const salesServices = require('../services/salesServices');

const create = async (req, res, next) => {
    try {
      const salesArray = req.body;
      const newSale = await salesServices.create(salesArray);

      if (!newSale) {
          return res.status(400).json({ message: '"product_id" is required' });
        }
        return res.status(201).json({ id: newSale, itemsSold: salesArray });
    } catch (err) {
        next(err);
    }
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

module.exports = {
    create,
    getAll,
    getById,
    saleUpdate,
};