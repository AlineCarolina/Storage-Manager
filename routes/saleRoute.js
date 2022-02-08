const express = require('express');
const saleController = require('../controllers/saleController');
const { validateSales, validateQuantity } = require('../middlewares/validateSales');

const router = express.Router();

router.get('/', saleController.getAllSales);

router.get('/:id', saleController.getByIdSales);

router.post('/', validateSales, validateQuantity, saleController.createSales);

router.put('/:id', validateSales, validateQuantity, saleController.updateProducts);

router.delete('/:id', saleController.deleteProduct);

module.exports = router;