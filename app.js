const express = require('express');
require('dotenv').config();
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./models/index'); // para asegurar conexión
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');
const logger = require('./utils/logger');

const app = express();
// Logs HTTP en consola y archivo
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/ProductImages', express.static('public/ProductImages'));
app.use(cors());
app.use(express.json());

// Conexión base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión a SQL Server exitosa'))
  .catch(err => console.error('Error al conectar a SQL Server:', err));

// Rutas
app.use('/api/products', productRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
