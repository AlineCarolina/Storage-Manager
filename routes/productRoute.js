const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getByIdProducts);

router.post('/', productController.validateProduct, productController.createProducts);

router.put('/:id', productController.validateProduct, productController.updateProducts);

router.delete('/:id', productController.deleteProduct);

module.exports = router;