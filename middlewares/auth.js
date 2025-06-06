// middlewares/auth.js

const jwt = require('jsonwebtoken');

// Lee la clave secreta y configuración del .env
const secret = process.env.JWT_SECRET;
const issuer = process.env.JWT_ISSUER;
const audience = process.env.JWT_AUDIENCE;

// Middleware para validar y decodificar el token JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o formato inválido' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, secret, { issuer, audience }, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    // Aseguramos que el token contenga userId
    if (!decoded.userId) {
      return res.status(400).json({ message: 'Token inválido: falta userId' });
    }

    // Seteamos el userId y roles al request para usarlo en controladores
    req.userId = decoded.userId;
    req.roles = decoded.roles || [];

    next();
  });
}

// Middleware para proteger rutas por rol
function requireRole(requiredRole) {
  return (req, res, next) => {
    if (!req.roles || !req.roles.includes(requiredRole)) {
      return res.status(403).json({ message: 'Acceso denegado. Rol insuficiente.' });
    }
    next();
  };
}

module.exports = {
  verifyToken,
  requireRole,
};
