/* Como usar o 'joi': digitalocean.com/community/tutorials/how-to-use-joi-for-node-api-schema-validation */

const Joi = require('@hapi/joi');

module.exports = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long',
  }),
  quantity: Joi.number().min(1).required().messages({
    'number.min': '"quantity" must be a number larger than or equal to 1',
    'number.base': '"quantity" must be a number larger than or equal to 1',
  }),
});