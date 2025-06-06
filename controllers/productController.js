const Product = require('../models/product');
const productSchema = require('../utils/productValidator');
const response = require('../utils/responseDto');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

// GET: Obtener todos los productos con paginación
exports.getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
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
    const product = await Product.findOne({ where: { ProductId: id } });

    if (!product) {
      throw { status: 404, message: 'Producto no encontrado' };
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
    const { Name } = req.body;

    const exists = await Product.findOne({ where: { Name } });
    if (exists) {
      throw { status: 400, message: 'Ya existe un producto con ese nombre' };
    }

    let data = { ...req.body };

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
    const { Name } = req.body;

    const product = await Product.findOne({ where: { ProductId: id } });
    if (!product) {
      throw { status: 404, message: 'Producto no encontrado' };
    }

    const duplicate = await Product.findOne({
      where: {
        Name,
        ProductId: { [Op.ne]: id }
      }
    });
    if (duplicate) {
      throw { status: 400, message: 'Ya existe otro producto con ese nombre' };
    }

    let data = req.body;

    if (req.file) {
      // Eliminar imagen anterior si existe
      if (product.ImageLocalPath) {
        const oldImagePath = path.join(__dirname, '..', 'public', product.ImageLocalPath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

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
    const product = await Product.findOne({ where: { ProductId: id } });

    if (!product) {
      throw { status: 404, message: 'Producto no encontrado' };
    }

    // Eliminar imagen asociada si existe
    if (product.ImageLocalPath) {
      const imagePath = path.join(__dirname, '..', 'public', product.ImageLocalPath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await product.destroy();
    res.json(response(true, 'Producto eliminado correctamente'));
  } catch (err) {
    next(err);
  }
};
