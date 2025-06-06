// utils/logger.js

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // otros niveles: error, warn, debug
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // imprimir en consola
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }) // guardar errores
  ],
});

module.exports = logger;
