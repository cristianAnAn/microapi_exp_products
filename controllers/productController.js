// controllers/productController.js

const Product = require('../models/product');
const productSchema = require('../utils/productValidator');
const response = require('../utils/responseDto');

// GET: Obtener todos los productos (con paginación y header de total)
exports.getAll = async (req, res, next) => {
  try {
    const userId = req.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
      where: { userId },
      offset,
      limit,
      order: [['ProductId', 'ASC']],
    });

    res.set('cantidad-total-registros', count.toString());
    res.json(response(true, 'Productos obtenidos correctamente', rows));
  } catch (err) {
    next(err);
  }
};

// GET: Obtener producto por ID
exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.userId;

    const product = await Product.findOne({ where: { ProductId: id, userId } });
    if (!product) {
      throw { status: 404, message: 'Producto no encontrado o sin permisos' };
    }

    res.json(response(true, 'Producto obtenido correctamente', product));
  } catch (err) {
    next(err);
  }
};

// POST: Crear producto
exports.create = async (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return next({ status: 400, message: error.details[0].message });
  }

  try {
    let data = req.body;
    data.userId = req.userId;

    if (req.file) {
      data.ImageLocalPath = `/ProductImages/${req.file.filename}`;
      data.ImageUrl = `${req.protocol}://${req.get('host')}/ProductImages/${req.file.filename}`;
    }

    const newProduct = await Product.create(data);
    res.status(201).json(response(true, 'Producto creado exitosamente', newProduct));
  } catch (err) {
    next(err);
  }
};

// PUT: Actualizar producto
exports.update = async (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return next({ status: 400, message: error.details[0].message });
  }

  try {
    const id = req.params.id;
    const userId = req.userId;

    const product = await Product.findOne({ where: { ProductId: id, userId } });
    if (!product) {
      throw { status: 403, message: 'No tienes permiso para modificar este producto' };
    }

    let data = req.body;
    if (req.file) {
      data.ImageLocalPath = `/ProductImages/${req.file.filename}`;
      data.ImageUrl = `${req.protocol}://${req.get('host')}/ProductImages/${req.file.filename}`;
    }

    await product.update(data);
    res.json(response(true, 'Producto actualizado correctamente', product));
  } catch (err) {
    next(err);
  }
};

// DELETE: Eliminar producto
exports.remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.userId;

    const product = await Product.findOne({ where: { ProductId: id, userId } });
    if (!product) {
      throw { status: 403, message: 'No tienes permiso para eliminar este producto' };
    }

    await product.destroy();
    res.json(response(true, 'Producto eliminado correctamente'));
  } catch (err) {
    next(err);
  }
};
