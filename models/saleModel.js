const connection = require('./connection');

const createSale = async () => {
  const query = 'INSERT INTO sales (date) VALUES (DEFAULT)';
  const [result] = await connection.execute(query);
  return { id: result.insertId };
};

const createSaleProduct = async (id, productId, quantity) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const [result] = await connection.execute(query, [id, productId, quantity]);
  return { id: result.insertId };
};

const getAll = async () => {
  const query = `SELECT sale_id AS saleId, date, product_id, quantity 
  FROM sales INNER JOIN sales_products ON sales.id = sale_id`;
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = `SELECT date, product_id, quantity 
  FROM sales INNER JOIN sales_products ON sales.id = sales_products.sale_id WHERE sales.id = ?`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

const update = async ({ id, productId, quantity }) => {
  const query = `UPDATE sales_products 
  SET quantity = ? WHERE product_id = ? AND sale_id = ?`;
  const [result] = await connection.execute(query, [quantity, productId, id]);
  return result;
};

const remove = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  createSale,
  createSaleProduct,
  getAll,
  getById,
  update,
  remove,
};