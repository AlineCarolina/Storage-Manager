const errorByCode = {
    'string.min': 422,
    'number.min': 422,
    'number.base': 422,
    'any.required': 400,
  };
  
  const errorHandler = (error, _request, response, _next) => {
  /* Sobre o 'isJoi': https://github.com/sideway/joi/issues/1228 */
    if (error.isJoi) {
      const status = errorByCode[error.details[0].type];
      return response.status(status).json({ message: error.details[0].message });
    }
    response.status(error.status).json({ message: error.message });
  };
  
  module.exports = errorHandler;