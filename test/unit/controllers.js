const sinon = require("sinon");
const { expect } = require("chai");

const productService = require("../../services/productService");
const productController = require("../../controllers/productController");
const saleService = require("../../services/saleService");
const saleController = require("../../controllers/saleController");
const { products, product, ID } = require("./mocks");

// Products

describe("Testing productController", () => {
  describe("getAllProducts", () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, "getAllProducts").resolves(products);
    });

    after(() => {
      sinon.restore();
    });

    it("should return all products", async () => {
      await productController.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
  });

  describe("getByIdProducts", () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: ID };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, "getProductById").resolves(product);
    });

    after(() => {
      sinon.restore();
    });

    it("should return a product by id", async () => {
      await productController.getByIdProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe("createProducts", () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = { name: "Abacaxi", quantity: 11 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, "createProduct").resolves(product);
    });

    after(() => {
      sinon.restore();
    });

    it("should return a new product", async () => {
      await productController.createProducts(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
});

// Sales

describe("Testing saleController", () => {
  describe("getAllSales", () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(saleService, "getAllSales").resolves(products);
    });

    after(() => {
      sinon.restore();
    });

    it("should return all sales", async () => {
      await saleController.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe("returnSalesById", () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: ID };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(saleService, "getSaleById").resolves(products);
    });

    after(() => {
      sinon.restore();
    });

    it("should return a sale by id", async () => {
      await saleController.getByIdSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});