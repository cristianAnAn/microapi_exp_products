// utils/productValidator.js
const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'El nombre es obligatorio',
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no debe exceder los 100 caracteres',
    }),

  description: Joi.string()
    .max(500)
    .allow(null, '')
    .messages({
      'string.max': 'La descripción no debe exceder los 500 caracteres',
    }),

  price: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      'number.base': 'El precio debe ser un número',
      'number.positive': 'El precio debe ser positivo',
      'any.required': 'El precio es obligatorio',
    }),

  stock: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'El stock debe ser un número entero',
      'number.min': 'El stock no puede ser negativo',
      'any.required': 'El stock es obligatorio',
    }),

  category: Joi.string()
    .valid('Electrónica', 'Ropa', 'Libros', 'Otros')
    .optional()
    .messages({
      'any.only': 'La categoría debe ser válida',
    }),

  // Campos opcionales relacionados con la imagen
  ImageLocalPath: Joi.string().optional(),
  ImageUrl: Joi.string().uri().optional(),
});

module.exports = productSchema;
