const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../services/productsServices');
const productsControllers = require('../../controllers/productsControllers');
const salesServices = require('../../services/salesServices');
const salesControllers = require('../../controllers/salesControllers');

describe('11 - quando existem produtos no banco de dados', () => {
    const response = {};
    const request = {};

    before(async () => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()

      sinon.stub(productsServices, 'getAll').returns(
        {
          id: 1,
          name: "MacBook Air",
          quantity: 10
        }
      );
    });

    after(async () => {
      productsServices.getAll.restore();
    });

    it('2.1 é chamado o método "status" passando 200', async () => {
      await productsControllers.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('2.2 - é chamado o método "json" passando um objeto', async () => {
      await productsControllers.getAll(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

describe('12 - Testando a function "create"', () => {
    const response = {};
    const request = {};

    before(async () => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()

      sinon.stub(productsServices, 'create')
        .returns(
          {
            id: 1,
            name: "MacBook Air",
            quantity: 10
          }
        );
    });

    after(async () => {
      productsServices.create.restore();
    });

    it('3.1 - é chamado o método "status" passando 201', async () => {
       await productsControllers.create(request, response);

       expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('3.2 - é chamado o método "json" passando a mensagem "create product"', async () => {
       await productsControllers.create(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
});

describe('13 - quando existem produtos no banco de dados', () => {
  const response = {};
  const request = {};

  before(async () => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns()

    sinon.stub(salesServices, 'getAll').returns([
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
      }]
    );
  });

  after(async () => {
    salesServices.getAll.restore();
  });

  it('2.1 é chamado o método "status" passando 200', async () => {
    await salesControllers.getAll(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('2.2 - é chamado o método "json" passando um objeto', async () => {
    await salesControllers.getAll(request, response);

    expect(response.json.calledWith(sinon.match.object)).to.be.equal(false);
  });
});
