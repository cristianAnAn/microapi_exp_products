const response = require('../utils/responseDto');
const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  // Soporte para errores lanzados por multer
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json(response(false, 'El archivo es demasiado grande. Máximo permitido: 5MB'));
  }

  const message = err.message || 'Error interno del servidor';

  // Registrar error con más detalle
  logger.error(`[${req.method}] ${req.originalUrl} → ${status} ${message}`);
  if (err.stack) logger.error(err.stack);

  res.status(status).json(response(false, message));
}

module.exports = errorHandler;
