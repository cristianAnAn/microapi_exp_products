// middlewares/errorHandler.js

const response = require('../utils/responseDto');
const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  // Registrar error
  logger.error(`[${req.method}] ${req.originalUrl} → ${message}`);

  res.status(status).json(response(false, message));
}

module.exports = errorHandler;
