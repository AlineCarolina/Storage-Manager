const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');
const connection = require('../../models/connection');

describe('[PRODUCTS MODEL] 1 - testa se função getAll retorna um array vazio se não existe produto criado', () => {
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

describe('3 - testa se a função create cria um novo produto no DB', () => {
    before(async () => {
        sinon.stub(connection, 'execute').returns([
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
        sinon.restore();
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

describe('4 - testa se a funçao getByName seleciona pelo nome', () => {
    before(async () => {
        sinon.stub(connection, 'execute').returns([
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

describe('5 - testa se a função getById seleciona pelo id', () => {
    before(async () => {
        sinon.stub(connection, 'execute').returns([
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

describe('6 - testa se a função productUpdate edita um produto', () => {
    before(async () => {
        sinon.stub(connection, 'execute').returns([
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

    it('retorna um objeto', async () => {
        const update = await productsModel.productUpdate("Produto2", 200);

        expect(update).to.be.an('object');
    });

    it('objeto não esta vazio', async () => {
        const update = await productsModel.productUpdate("Produto2", 200);

        expect(update).to.be.not.empty;
    });

    it('contem as keys', async () => {
        const update = await productsModel.productUpdate("Produto2", 200);

        expect(update).to.contains.keys('update');
    });
});

describe('7 - testa a função delete', () => {
    before(async () => {
        sinon.stub(connection, 'execute').returns([
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

    it('retorna um objeto', async () => {
        const update = await productsModel.deleteProducts(1);

        expect(update).to.be.an('object');
    });

    it('objeto não esta vazio', async () => {
        const update = await productsModel.deleteProducts(1);

        expect(update).to.be.not.empty;
    });

    it('contem as keys', async () => {
        const update = await productsModel.deleteProducts(1);

        expect(update).to.contains.keys('update');
    });
});

/* describe('8 [SALES MODEL] - Testa a Função create sales', () => {
    before(async () => {
      sinon.stub(connection, 'execute').returns([
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
    })

    it('retorna um object', async () => {
      const response = await salesModel.create(1);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await salesModel.create(1);

      expect(response).to.be.not.empty;
    });

    it(' oobjeto possui as propriedades: "id", "itemsSold"', async () => {
      const item = await salesModel.create(1);

      expect(item).to.include.all.keys('id');
    });
  }); */


describe('8 - testa a função getAll de sales', () => {
    before(async () => {
        sinon.stub(connection, 'execute').returns([[]]);
    });

    after(async () => {
        connection.execute.restore();
    });

    it('retorna um array', async () => {
        const response = await salesModel.getAll();
  
        expect(response).an('array');
    });
  
    it('retorna um array vazio', async () => {
        const response = await salesModel.getAll();
  
        expect(response).to.be.empty;
      }); 
});

describe('9 - testa a função getById de sales', () =>{
    before(async () => {
        sinon.stub(connection, 'execute').returns([
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

    it('retona um object', async () => {
        const [response] = await salesModel.getById(1);

        expect(response).to.be.an('object');
    });
    it('o objeto não esta vazio', async () => {
        const [response] = await salesModel.getById(1);

        expect(response).to.be.not.empty;
    });
    it('o objeto possui id e itemSold', async () => {
        const [response] = await salesModel.getById(1);

        expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
});

/* describe('10 - testa funçaõ q edita sale', () => {
    before(async () => {
        sinon.stub(connection, 'execute').returns([
            {
                "id": 1,
              "itemsSold": [
                {
                  "product_id": 1,
                  "quantity": 3
                }
              ]
            }]
        );
    });
    after(async () => {
        connection.execute.restore();
    });
    it('retorna um object', async () =>{
        const [response] = await salesModel.saleUpdate(1, [1]);

        expect(response).to.be.an('object');
    });
    it('objeto não está vazio', async () => {
        const [response] = await salesModel.saleUpdate([
            {
              1,
              [{  }]
            }
          ]);

        expect(response).to.be.not.empty;
      });
      it('o objeto possui as propriedades: "id", "itemsSold"', async () => {
        const [response] = await salesModel.saleUpdate([
            {
              "product_id": "id_change",
              "quantity": "new_quantity"
            }
          ]);

        expect(response).to.include.all.keys('id', 'itemsSold');
      });
});
 */

