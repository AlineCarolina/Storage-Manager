const salesModels = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const create = async (sales) => {
    const allProducts = await Promise.all(
      sales.map(({ product_id }) => productsModel.getById(product_id)),
    );
  
    if (allProducts.length !== sales.length) return false;
  
    const id = await salesModels.create(sales);
  
    return id;
  };

module.exports = {
    create,
};