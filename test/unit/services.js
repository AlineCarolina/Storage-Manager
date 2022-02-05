const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsServices = require('../../services/productsServices');

describe('7 - [SERVICES] testa se a função getAll retorna um array vazio se não existe produto criado', () => {
    before(async () => {
        sinon.stub(productsModel, 'getAll').returns([]);
    });
    after(async () => {
        productsModel.getAll.restore();
    });
    it('retorna um array', async () => {
        const response = await productsServices.getAll();

        expect(response).an('array');
    });
    it('o array esta vazio', async () => {
        const response = await productsServices.getAll();

        expect(response).to.be.empty;
    });
});