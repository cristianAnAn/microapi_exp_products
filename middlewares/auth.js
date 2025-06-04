const jwt = require('jsonwebtoken');

// Lee la clave secreta y configuración del .env
const secret = process.env.JWT_SECRET;
const issuer = process.env.JWT_ISSUER;
const audience = process.env.JWT_AUDIENCE;

// Middleware para validar el JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token no proporcionado' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token inválido' });

  jwt.verify(token, secret, { issuer, audience }, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
}

// Middleware para autorizar por rol (ejemplo: ADMINISTRADOR)
function requireRole(role) {
  return (req, res, next) => {
    // Asegúrate que el token contenga 'roles' como array
    if (!req.user || !req.user.roles || !req.user.roles.includes(role)) {
      return res.status(403).json({ message: 'No autorizado. Rol insuficiente.' });
    }
    next();
  };
}

module.exports = { verifyToken, requireRole };
