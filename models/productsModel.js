const connection = require('./connection');

const getAll = async () => {
    const [response] = await connection
        .execute('SELECT * FROM products;');
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
    const [[nameRow]] = await connection
        .execute('SELECT * FROM products WHERE name = ?;', [name]);
        return nameRow;
};

const getById = async (id) => {
    const [[idRow]] = await connection
        .execute('SELECT * FROM products WHERE id = ?;', [id]);
        return idRow;
};

const productUpdate = async (id, name, quantity) => {
    await connection.execute(
        'UPDATE products SET name=?, quantity=? WHERE id=?;', [name, quantity, id],
        );
    const product = getById(id);
    return product;
};

const deleteProducts = async (id) => {
    const [product] = await connection
        .execute('DELETE FROM products WHERE id=?;', [id]);
        return { update: product.affectedRows };
};

module.exports = {
    getAll,
    create,
    getByName,
    getById,
    productUpdate,
    deleteProducts,
};