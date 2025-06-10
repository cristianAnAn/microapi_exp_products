const Joi = require('joi');

const productSchema = Joi.object({
  Name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'El nombre es obligatorio',
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no debe exceder los 100 caracteres',
    }),

  Description: Joi.string()
    .max(500)
    .allow(null, '')
    .messages({
      'string.max': 'La descripción no debe exceder los 500 caracteres',
    }),

  Price: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      'number.base': 'El precio debe ser un número',
      'number.positive': 'El precio debe ser positivo',
      'any.required': 'El precio es obligatorio',
    }),

CategoryName: Joi.string()
  .max(100) // o el límite que desees
  .allow(null, '')
  .optional()
  .messages({
    'string.max': 'La categoría no debe exceder los 100 caracteres',
  }),


  ImageLocalPath: Joi.string().optional(),
  ImageUrl: Joi.string().uri().optional(),
});

module.exports = productSchema;
