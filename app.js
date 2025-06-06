const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const sequelize = require('./models/index');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Logs HTTP
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Static: imágenes
app.use('/ProductImages', express.static(path.join(__dirname, 'ProductImages')));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión a SQL Server exitosa'))
  .catch(err => console.error('Error al conectar a SQL Server:', err));

// Rutas
app.use('/api/products', productRoutes);

// Middleware de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
