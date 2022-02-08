const sinon = require("sinon");
const { expect } = require("chai");

const productModel = require("../../models/productModel");
const productService = require("../../services/productService");
const saleModel = require("../../models/saleModel");
const saleService = require("../../services/saleService");
const { products, product, getAll } = require("./mocks");

// Products

describe("Testing productService", () => {
  describe("getAllProducts", () => {
    before(() => {
      sinon.stub(productModel, "getAll").resolves(products);
    });

    after(() => {
      sinon.restore();
    });

    it("should return all products", async () => {
      const products = await productService.getAllProducts();
      expect(products).to.be.eql(products);
      expect(products).to.be.an("array");
    });
  });

  describe("getProductById", () => {
    before(() => {
      sinon.stub(productModel, "getById").resolves(product);
    });

    after(() => {
      sinon.restore();
    });

    it("should return a product by id", async () => {
      const product = await productService.getProductById(1);
      expect(product).to.be.eql(product);
    });
  });
});

// Sales

describe("Testing saleService", () => {
  describe("GetAllSales", () => {
    before(() => {
      sinon.stub(saleModel, "getAll").resolves(getAll[0]);
    });

    after(() => {
      sinon.restore();
    });

    it("should return all sales", async () => {
      const response = await saleService.getAllSales();
      expect(response).to.be.a("object");
    });
  });

  describe("GetSaleById", () => {
    before(() => {
      sinon.stub(saleModel, "getById").resolves(getAll[0]);
    });

    after(() => {
      sinon.restore();
    });

    it("should return a sale by id", async () => {
      const response = await saleService.getSaleById(1);
      expect(response).to.be.a("object");
    });
  });
});