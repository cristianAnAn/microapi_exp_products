const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, requireRole } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints para gestión de productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene todos los productos (paginado)
 *     tags: [Productos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página (opcional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de productos por página (opcional)
 *     responses:
 *       200:
 *         description: Lista de productos
 *       401:
 *         description: Token no proporcionado o inválido
 *       500:
 *         description: Error al obtener productos
 */
router.get('/', verifyToken, productController.getAll);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Productos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: Producto no pertenece al usuario
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al obtener producto
 */
router.get('/:id', verifyToken, productController.getById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: "Zapatos"
 *               Price:
 *                 type: number
 *                 example: 299.99
 *               Description:
 *                 type: string
 *                 example: "Zapatos de cuero legítimo"
 *               CategoryName:
 *                 type: string
 *                 example: "Calzado"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No autorizado. Rol insuficiente.
 *       500:
 *         description: Error al crear producto
 */
router.post(
  '/',
  verifyToken,
  requireRole('ADMINISTRADOR'),
  upload.single('image'),
  productController.create
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: [Productos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: "Zapatos deportivos"
 *               Price:
 *                 type: number
 *                 example: 199.99
 *               Description:
 *                 type: string
 *                 example: "Nueva descripción"
 *               CategoryName:
 *                 type: string
 *                 example: "Deportes"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No autorizado o producto no te pertenece
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al actualizar producto
 */
router.put(
  '/:id',
  verifyToken,
  requireRole('ADMINISTRADOR'),
  upload.single('image'),
  productController.update
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto existente
 *     tags: [Productos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No autorizado o producto no te pertenece
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al eliminar producto
 */
router.delete(
  '/:id',
  verifyToken,
  requireRole('ADMINISTRADOR'),
  productController.remove
);

module.exports = router;
