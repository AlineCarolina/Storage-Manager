/* const verifyName = (req, res, next) => {
    const { name } = req.body;
  
    if (!name || name === '') {
      return res.status(400).json({ message: '"name" is required' });
    }
    if (name.length < 5) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
  
    next();
  };
  
  const verifyQuantity = (req, res, next) => {
    const { quantity } = req.body;
    if (quantity === undefined) {
      return res.status(400)
      .json({ message: '"quantity" is required' });
    }
  
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(422)
      .json({ message: '"quantity" must be a number larger than or equal to 1' });
    }
  
    next();
  };

  const verifySales = (req, res, next) => {
    const response = req.body;
 
    if (response.some(({ product_id: productId }) => !productId)) {
      return res.status(400)
        .json({ message: '"product_id" is required' });
    }
  
    if (response.some(({ quantity }) => quantity === undefined)) {
      return res.status(400)
      .json({ message: '"quantity" is required' });
    }
  
    if (response.some(({ quantity }) => typeof quantity !== 'number' || quantity <= 0)) {
      return res.status(422)
        .json({ message: '"quantity" must be a number larger than or equal to 1' });
    }
  
    next();
  };

  const validateQuantity = (quantity) => {
    if (quantity === undefined) return { code: 400, message: '"quantity" is required' };
    if (quantity < 1 || typeof quantity !== typeof 1) { 
      return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
    }
    return null;
  }; */
  
  const validateProductId = (productId) => {
    if (!productId) return { code: 400, message: '"product_id" is required' };
    return null;
  };

  const validateName = (name) => {
    if (!name) return { code: 400, message: '"name" is required' };
    if (name.length < 5) { 
      return { code: 422, message: '"name" length must be at least 5 characters long' };
    }
    return null;
  };
  
  const validateQuantity = (quantity) => {
    if (quantity === undefined) return { code: 400, message: '"quantity" is required' };
    if (quantity < 1 || typeof quantity !== typeof 1) { 
      return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
    }
    return null;
  };

module.exports = {
    /* verifyName,
    verifyQuantity,
    verifySales, */
    validateQuantity,
    validateProductId,
    validateName,
};