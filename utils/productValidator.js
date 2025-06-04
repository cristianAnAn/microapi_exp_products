const Joi = require('joi');

const productSchema = Joi.object({
  Name: Joi.string().required(),
  Price: Joi.number().required(),
  Description: Joi.string().allow(null, ''),
  CategoryName: Joi.string().allow(null, ''),
  ImageUrl: Joi.string().allow(null, ''),
  ImageLocalPath: Joi.string().allow(null, '')
});

module.exports = productSchema;