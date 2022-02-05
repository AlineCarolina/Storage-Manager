/* const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../services/productsServices');
const productsControllers = require('../../controllers/productsControllers');

describe('1 - [CONTROLLERS] testa a função getAll', () => {
    const response = {};
    const request = {};

    before(async () => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response)

      sinon.stub(productsServices, 'getAll').returns();
    });

    after(async () => {
      productsServices.getAll.restore();
    });

    it('1.1 - é chamado o método "status" passando 404', async () => {
      await productsControllers.getAll(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('1.2 - é chamado o método "send" passando a mensagem "Not Found"', async () => {
      await productsControllers.getAll(request, response);

      expect(response.status.calledWith({ message: 'Not Found'})).to.be.equal(true);
    });
  }); */