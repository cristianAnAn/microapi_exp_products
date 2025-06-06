const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MicroAPI Productos',
      version: '1.0.0',
      description: 'API de productos protegida con JWT y documentada con Swagger',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: "Ingresa tu token JWT aquí. Ejemplo: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
      },
      schemas: {
        Product: {
          type: 'object',
properties: {
  ProductId: { type: 'integer', example: 1 },
  Name: { type: 'string', example: 'Camiseta' },
  Price: { type: 'number', example: 150.99 },
  Description: { type: 'string', example: 'Camiseta de algodón' },
  CategoryName: { type: 'string', example: 'Ropa' },
  ImageUrl: { type: 'string', example: '...' },
  ImageLocalPath: { type: 'string', example: '...' },
  userId: { type: 'integer', example: 4 }
}
,
          required: ['name', 'price']
        }
      }
    },
    security: [
      { BearerAuth: [] }
    ],
    servers: [
      {
        url: 'http://localhost:3200',
        description: 'Servidor local de desarrollo'
      }
    ]
  },
  apis: ['./routes/*.js'], // Correcto si tus rutas están aquí
};

module.exports = swaggerJSDoc(options);
