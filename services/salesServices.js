const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const updateProductStock = async (saleData, action) => {
  const [error] = await Promise.all(saleData.map(async ({ productId, quantity }) => {
    const product = await productsModel.getById(productId);
    const { id, name } = product;
    let newQuantity = 0;
    switch (action) {
      case 'remove':
        newQuantity = product.quantity - quantity;
        break;
      case 'add':
        newQuantity = product.quantity + quantity;
        break;
      default:
        break;
    }
    if (newQuantity < 0) return 'error';
    await productsModel.productUpdate(id, name, newQuantity);
  }));
  if (error === 'error') return 'error';
};

const create = async (saleData) => {
  const sale = await salesModel.create(saleData);
  const { itemsSold } = sale;
  const error = await updateProductStock(itemsSold, 'remove');
  if (error === 'error') {
    return {
      error: {
        code: 422,
        message: 'Such amount is not permitted to sell',
      },
    };
  }
  return sale;
};

const getAll = async () => {
    const sales = await salesModel.getAll();

    if (!sales) {
        return { status: 404 };
      }

    return sales;
};

const getById = async (id) => {
    const catchedId = await salesModel.getById(id);

    if (!catchedId || catchedId.length === 0) return { status: 404 };

    return catchedId;
};

const saleUpdate = async (id, arrSales) => {
  const allProducts = await Promise.all(
    arrSales.map(({ product_id }) => productsModel
    .getById(product_id)),
  );

  if (allProducts.length !== arrSales.length) return false;

  const response = await salesModel.saleUpdate(id, arrSales);

  return response;
};

const saleDelete = async (id) => {
  const result = await salesModel.getById(id);

  if (!result) return false;

  await salesModel.saleDelete(id);

  /* const remove = await Promise.all(
    result.map(({ product_id, quantity }) => salesModel
    .infoDel(product_id, quantity)),
    );
    return remove;
    */
  return result;
  };

/*   }
  const response = await salesModel.saleUpdate(id, arrSales);

  return response;
 */

module.exports = {
    create,
    getAll,
    getById,
    saleUpdate,
    saleDelete,
};