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

module.exports = {
    create,
};