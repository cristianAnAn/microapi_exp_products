require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./models/index'); // para asegurar conexión
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');



const app = express();
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
