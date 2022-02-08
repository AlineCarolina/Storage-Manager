const mapSales = (sales) => sales.map((sale) => ({
  productId: sale.product_id,
  quantity: sale.quantity,
}));

const validateSales = (request, response, next) => {
  const sales = mapSales(request.body);
  const errorId = sales.some(({ productId }) => !productId);
  if (errorId) {
    return response.status(400).json({ message: '"product_id" is required' });
  }

  next();
};

const validateQuantity = (request, response, next) => {
  const errorQuantity = request.body.some(({ quantity }) => quantity === undefined);

  if (errorQuantity) {
    return response.status(400).json({ message: '"quantity" is required' });
  }

  const errorQuantityValue = request.body
  .some(({ quantity }) => typeof quantity !== 'number' || quantity <= 0);

  if (errorQuantityValue) {
    return response.status(422)
    .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

module.exports = {
  mapSales,
  validateSales,
  validateQuantity,
};