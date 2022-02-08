const sinon = require("sinon");
const { expect } = require("chai");

const productModel = require("../../models/productModel");
const saleModel = require("../../models/saleModel");
const connection = require("../../models/connection");
const { products, product, getAll } = require("./mocks");

// Products

describe("Testing productModel", () => {
  describe("getAll", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([products]);
    });

    after(() => {
      sinon.restore();
    });

    it("should return all products", async () => {
      const products = await productModel.getAll();
      expect(products).to.be.eql(products);
    });
  });

  describe("getById", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([[products[0]]]);
    });

    after(() => {
      sinon.restore();
    });

    it("should return a product by id", async () => {
      const product = await productModel.getById(1);
      expect(product).to.be.eql(products[0]);
    });
  });

  describe("create", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([product]);
    });

    after(() => {
      sinon.restore();
    });

    it("should create a product", async () => {
      const product = await productModel.create("Banana", 3);
      expect(product).to.be.eql(product);
    });
  });

  describe("getByName", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([[products[0]]]);
    });

    after(() => {
      sinon.restore();
    });

    it("should return a product by name", async () => {
      const product = await productModel.getByName("Banana");
      expect(product).to.be.eql(products[0]);
    });
  });

  describe("update", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves();
    });

    after(() => {
      sinon.restore();
    });

    it("should update a product", async () => {
      await productModel.update(1, "Banana", 3);
      expect(connection.execute.calledOnce).to.be.true;
    });
  });

  describe("remove", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves();
    });

    after(() => {
      sinon.restore();
    });

    it("should remove a product", async () => {
      await productModel.remove(1);
      expect(connection.execute.calledOnce).to.be.true;
    });
  });

  describe("increment", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves();
    });

    after(() => {
      sinon.restore();
    });

    it("should increment a product", async () => {
      await productModel.increment(1, 3);
      expect(connection.execute.calledOnce).to.be.true;
    });
  });

  describe("decrement", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves();
    });

    after(() => {
      sinon.restore();
    });

    it("should decrement a product", async () => {
      await productModel.decrement(1, 3);
      expect(connection.execute.calledOnce).to.be.true;
    });
  });
});

// Sales

describe("Testing saleModel", () => {
  describe("getAll", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(getAll);
    });

    after(() => {
      connection.execute.restore();
    });

    it("should return an object", async () => {
      const response = await saleModel.getAll();
      expect(response).to.be.a("object");
    });
  });

  describe("getById", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(getAll);
    });

    after(() => {
      connection.execute.restore();
    });

    it("should return an object", async () => {
      const response = await saleModel.getById(1);
      expect(response).to.be.a("object");
    });
  });
});