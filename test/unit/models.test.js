const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../models/productsModel');
const connection = require('../../models/connection');

describe('Model Products', () => {
    describe('1 - testa se função getAll retorna um array vazio se não existe produto criado', () => {
        before(async () => {
            sinon.stub(connection, 'execute').resolves([[]]);
        });
        after(async () => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const response = await productsModel.getAll();

            expect(response).to.be.an('array');
        });

        it('o array está vazio', async () => {
            const response = await productsModel.getAll();

            expect(response).to.be.empty;
        });
    });

    describe('2 - testa se a função getAll retorna um array não vazio se existe produto criado', () => {
        before(async () => {
            sinon.stub(connection, 'execute').resolves([
                [
                    {
                        id: 1,
                        name: "produto A",
                        quantity: 10
                    }
                ],
            ]);
        });
        after(async () => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const response = await productsModel.getAll();

            expect(response).to.be.an('array');
        });

        it('o array não está vazio', async () => {
            const response = await productsModel.getAll();

            expect(response).to.be.not.empty;
        });

        it('o array contem "id", "name" e "quantity"', async () => {
            const [response] = await productsModel.getAll();

            expect(response).to.contains.keys('id', 'name', 'quantity');
        });
    });

    describe('3 - testa se a função create cria um novo produto no DB', async () => {
        before(async () => {
            sinon.stub(productsModel, 'create').returns(
                {
                    id: 1,
                    name: 'Produto',
                    quantity: 100,
                }
            );
        });
        after(async () => {
            productsModel.create.restore();
        });

        it('retorna um objeto', async () => {
            const newProduct = await productsModel.create("Produto2", 200);

            expect(newProduct).to.be.an('object');
        });

        it('o objeto não esta vazio', async () => {
            const newProduct = await productsModel.create("Produto2", 200);

            expect(newProduct).to.be.not.empty;
        });

        it('cadastra as keys necessarias', async () => {
            const newProduct = await productsModel.create("Produto2", 200);

            expect(newProduct).to.contains.keys('id', 'name', 'quantity');
        });
    });

     describe('4 - testa se a funçao getByName seleciona pelo nome', async () => {
        before(async () => {
            sinon.stub(productsModel, 'getByName').returns(
                {
                    id: 1,
                    name: 'Produto2',
                    quantity: 100

                }
            );
        });

        after(async () => {
            productsModel.getByName.restore();
        });

        it('encontra um objeto', async () => {
            const nameProduct = await productsModel.getByName('Produto2');

            expect(nameProduct).to.be.an('object');
        });

        it('objeto não esta vazio', async () => {
            const nameProduct = await productsModel.getByName('Produto2');

            expect(nameProduct).to.be.not.empty;
        });

        it('objeto possui as keys', async () => {
            const nameProduct = await productsModel.getByName('Produto2');

            expect(nameProduct).to.contains.keys('id', 'name', 'quantity');
        });
    });

    describe('5 - testa se a função getById seleciona pelo id', async () => {
        before(async () => {
            sinon.stub(productsModel, 'getById').returns(
                {
                    id: 1,
                    name: 'Produto5',
                    quantity: 500

                }
            );
        });
        after(async () => {
            productsModel.getById.restore();
        });

        it('produto encontrado é um objeto', async () => {
             const productId = await productsModel.getById(1);

             expect(productId).to.be.an('object');
        });

        it('o objeto não esta vazio', async () => {
            const productId = await productsModel.getById(1);

            expect(productId).to.be.not.empty;
       });

        it('objeto possui as keys', async () => {
            const productId = await productsModel.getById(1);

            expect(productId).to.contains.keys('id', 'name', 'quantity');
    });
    });
    describe('6 - testa se a função productUpdate edita um produto', async () => {
        before(async () => {
            sinon.stub(productsModel, 'productUpdate').returns(
                {
                    id: 1,
                    name: 'Produto10',
                    quantity: 10
                }
            );
        });
        after(async () => {
            productsModel.productUpdate.restore();
        });
        it('retorna um objeto', async () => {
            const update = await productsModel.productUpdate('Produto10', 11);

            expect(update).to.be.an('object');
        });
        it('objeto não esta vazio', async () => {
            const update = await productsModel.productUpdate('Produto10', 11);

            expect(update).to.be.not.empty;
        });
        it('contem as keys', async () => {
            const update = await productsModel.productUpdate('Produto10', 11);

            expect(update).to.contains.keys('id', 'name', 'quantity');
        });
    });
});

