// controllers/productController.js

const Product = require('../models/product');
const productSchema = require('../utils/productValidator');

// GET: Obtener todos los productos (con paginación y header de total)
exports.getAll = async (req, res) => {
  try {
    // Parámetros de paginación (opcional)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Consulta productos con paginación
    const { count, rows } = await Product.findAndCountAll({
      offset,
      limit,
      order: [['ProductId', 'ASC']],
    });

    // Header personalizado (total de registros)
    res.set('cantidad-total-registros', count.toString());
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos', error: err.message });
  }
};

// GET: Obtener producto por ID
exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el producto', error: err.message });
  }
};

// POST: Crear producto
exports.create = async (req, res) => {
  // Validación
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let data = req.body;
    // Si se subió imagen, guardar ruta local y URL pública
    if (req.file) {
      data.ImageLocalPath = `/ProductImages/${req.file.filename}`;
      data.ImageUrl = `${req.protocol}://${req.get('host')}/ProductImages/${req.file.filename}`;
    }
    const newProduct = await Product.create(data);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear producto', error: err.message });
  }
};

// PUT: Actualizar producto
exports.update = async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    let data = req.body;
    if (req.file) {
      data.ImageLocalPath = `/ProductImages/${req.file.filename}`;
      data.ImageUrl = `${req.protocol}://${req.get('host')}/ProductImages/${req.file.filename}`;
    }
    await product.update(data);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar producto', error: err.message });
  }
};

// DELETE: Eliminar producto
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    await product.destroy();
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar producto', error: err.message });
  }
};
