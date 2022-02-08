const connection = require('./connection');

const getByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name = ?;';
  const [[product]] = await connection.execute(query, [name]);
  return product;
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?;';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const getAll = async () => {
  const query = 'SELECT * FROM products;';
  const [products] = await connection.execute(query);
  return products;
};

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?,?);';
  const [product] = await connection.execute(query, [name, quantity]);
  return product;
};

const update = async (id, name, quantity) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?;';
  await connection.execute(query, [name, quantity, id]);
};

const remove = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?;';
  await connection.execute(query, [id]);
};

const increment = async (id, quantity) => {
  const query = 'UPDATE products SET quantity = quantity + ? WHERE id = ?;';
  await connection.execute(query, [quantity, id]);
};

const decrement = async (id, quantity) => {
  const query = 'UPDATE products SET quantity = quantity - ? WHERE id = ?;';
  await connection.execute(query, [quantity, id]);
};

module.exports = {
  getByName,
  getById,
  getAll,
  create,
  update,
  remove,
  increment,
  decrement,
};