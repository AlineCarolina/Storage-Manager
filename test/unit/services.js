const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');

const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');
const productsServices = require('../../services/productsServices');
const salesServices = require('../../services/salesServices');

describe('[PRODUCTS MODEL] 1 - testa se função getAll retorna um array vazio se não existe produto criado', () => {
    before(async () => {
            sinon.stub(productsModel, 'getAll').resolves([[]]);
        });

    after(async () => {
          productsModel.getAll.restore();
        });

    it('retorna um array', async () => {
            const response = await productsServices.getAll();

            expect(response).to.be.an('array');
        });

    it('o array está vazio', async () => {
            const [response] = await productsServices.getAll();

            expect(response).to.be.empty;
        });
    });

describe('2 - testa se a função getAll retorna um array não vazio se existe produto criado', () => {
    before(async () => {
        sinon.stub(productsModel, 'getAll').resolves([
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
      productsModel.getAll.restore();
    });

    it('retorna um array', async () => {
        const response = await productsServices.getAll();

        expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
        const response = await productsServices.getAll();

        expect(response).to.be.not.empty;
    });

    it('o array contem "id", "name" e "quantity"', async () => {
        const [[response]] = await productsServices.getAll();

        expect(response).to.contains.keys('id', 'name', 'quantity');
    });
});

/* describe('3 - testa se a função create cria um novo produto no DB', () => {
    before(async () => {
        sinon.stub(productsModel, 'create').returns([
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
      productsModel.create.restore();
    });

    it('retorna um objeto', async () => {
        const [newProduct] = await productsServices.create("Produto2", 200);

        expect(newProduct).to.be.an('object');
    });

    it('o objeto não esta vazio', async () => {
        const newProduct = await productsServices.create("Produto2", 200);

        expect(newProduct).to.be.not.empty;
    });

    it('cadastra as keys necessarias', async () => {
        const newProduct = await productsServices.create("Produto2", 200);

        expect(newProduct).to.contains.keys('id', 'name', 'quantity');
    });
}); */

describe('5 - testa se a função getById seleciona pelo id', () => {
    before(async () => {
        sinon.stub(productsModel, 'getById').returns([
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
        productsModel.getById.restore();
    });

    it('produto encontrado é um objeto', async () => {
            const [[productId]] = await productsServices.getById(1);

            expect(productId).to.be.an('object');
    });

    it('o objeto não esta vazio', async () => {
        const [[productId]] = await productsServices.getById(1);

        expect(productId).to.be.not.empty;
    });

    it('objeto possui as keys', async () => {
        const [[productId]] = await productsServices.getById(1);

        expect(productId).to.contains.keys('id', 'name', 'quantity');
    });
});

/*  describe('6 - testa se a função productUpdate edita um produto', () => {
    before(async () => {
        sinon.stub(productsModel, 'productUpdate').returns([
            [
                {   update:
                    {
                        id: 1,
                        name: "produto A",
                        quantity: 10
                    }
                }
            ],
        ]);
    });

    after(async () => {
        productsModel.productUpdate.restore();
    });

    it('retorna um objeto', async () => {
        const update = await productsServices.productUpdate(1, "produto A", 12);
        console.log(update);
        expect(update).to.be.an('object');
    });

    it('objeto não esta vazio', async () => {
        const [[update]] = await productsServices.productUpdate(1, "Produto A", 12);

        expect(update).to.be.not.empty;
    });

    it('contem as keys', async () => {
        const [update] = await productsServices.productUpdate(1, "Produto A", 12);

        expect(update).to.contains.keys('id', 'name', 'quantity');
    });
});

describe('7 [SALES SERVICES] - Testa a Função create sales', () => {
    before(async () => {
      sinon.stub(salesModel, 'create').returns([
            {
                id: 1,
                name: "produto A",
                quantity: 10
            }
    ]);
    });

    after(async () => {
        salesModel.create.restore();
    })

    it('retorna um object', async () => {
      const [response] = await salesServices.create(1);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await salesServices.create(1);
        console.log(response);
      expect(response).to.be.not.empty;
    });

    it(' oobjeto possui as propriedades: "id", "name" e quantity"', async () => {
      const item = await salesServices.create(1);

      expect(item).to.include.all.keys('id', 'name', 'quantity');
    });
  }); */

describe('8 - testa a função getAll de sales', () => {
    before(async () => {
        sinon.stub(salesModel, 'getAll').returns([[]]);
    });

    after(async () => {
      salesModel.getAll.restore();
    });

    it('retorna um array', async () => {
        const response = await salesServices.getAll();
  
        expect(response).an('array');
    });
  
    it('retorna um array vazio', async () => {
        const [response] = await salesServices.getAll();
  
        expect(response).to.be.empty;
      }); 
});

describe('9 - testa a função getById de sales', () =>{
    before(async () => {
        sinon.stub(salesModel, 'getById').returns([
                {
                    id: 1,
                    name: "produto A",
                    quantity: 10
                }
        ]);
    });
    after(async () => {
      salesModel.getById.restore();
    });

    it('retona um object', async () => {
        const [response] = await salesServices.getById(1);

        expect(response).to.be.an('object');
    });

    it('o objeto não esta vazio', async () => {
        const [response] = await salesServices.getById(1);

        expect(response).to.be.not.empty;
    });

    it('o objeto possui id e itemSold', async () => {
        const [response] = await salesServices.getById(1);

        expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
}); 
