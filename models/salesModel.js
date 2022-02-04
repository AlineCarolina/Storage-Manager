const connection = require('./connection');

const create = async (salesArray) => {
    const [{ insertId }] = await connection
        .execute('INSERT INTO sales VALUES ()');
  
    await Promise.all(
      salesArray.map(
        ({ product_id: productId, quantity }) => connection
            .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ( ?, ?, ?)',
            [insertId, productId, quantity]),
        ),
      );
  
    return insertId;
  };

const getAll = async () => {
  const [sales] = await connection
    .execute('SELECT a.sale_id AS saleId, b.date, a.product_id, a.quantity FROM ' 
    + 'sales_products a JOIN sales AS b ON a.sale_id = b.id');
    return sales;
};

const getById = async (id) => {
  const [[idRow]] = await connection
    .execute('SELECT date, product_id, quantity FROM sales_products INNER JOIN sales WHERE id = ?',
      [id]);
    return idRow;
};

module.exports = {
    create,
    getAll,
    getById,
};