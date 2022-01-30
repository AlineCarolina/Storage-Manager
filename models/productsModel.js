const connection = require('./connection');

const getAll = async () => {
    const [response] = await connection.execute('SELECT * FROM products;');
    return response;
};

const create = async ({ name, quantity }) => {
    const [{ insertId }] = await connection
        .execute('INSERT INTO products (name, quantity) VALUES (?, ?);', [name, quantity]);
        return {
            id: insertId,
            name,
            quantity,
          };
};

const getByName = async (name) => {
    const [[nameRow]] = await connection.execute('SELECT * FROM products WHERE name = ?;', [name]);
    return nameRow;
  };

module.exports = {
    getAll,
    create,
    getByName,
};