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
  const [salesRow] = await connection
    .execute(
      `SELECT date, product_id, quantity FROM sales
          INNER JOIN sales_products
          ON sales.id = sales_products.sale_id
          WHERE sales.id = ?`,
          [id],
      );
    return salesRow;
};

module.exports = {
    create,
    getAll,
    getById,
};