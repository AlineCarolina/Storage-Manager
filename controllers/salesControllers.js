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

module.exports = {
    create,
};