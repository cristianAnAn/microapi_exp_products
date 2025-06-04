const multer = require('multer');
const path = require('path');

// Directorio donde guardarás las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/ProductImages');
  },
  filename: function (req, file, cb) {
    // Guarda la imagen con un nombre único
    const ext = path.extname(file.originalname);
    cb(null, 'img_' + Date.now() + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Máx 5MB (ajusta según necesidad)
  fileFilter: (req, file, cb) => {
    // Solo acepta imágenes (jpeg, png, jpg)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'), false);
    }
  }
});

module.exports = upload;
