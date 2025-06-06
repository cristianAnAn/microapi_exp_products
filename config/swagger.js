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
            productId: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Camiseta' },
            price: { type: 'number', example: 150.99 },
            description: { type: 'string', example: 'Camiseta de algodón' },
            stock: { type: 'integer', example: 20 },
            category: { type: 'string', example: 'Ropa' },
            imageUrl: { type: 'string', example: 'https://servidor.com/imagenes/1.jpg' },
            imageLocalPath: { type: 'string', example: '/ProductImages/img_1.jpg' },
            userId: { type: 'integer', example: 4 } // si usas esto internamente, es bueno documentarlo
          },
          required: ['name', 'price', 'stock']
        }
      }
    },
    security: [
      { BearerAuth: [] }
    ],
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Servidor local de desarrollo'
      }
    ]
  },
  apis: ['./routes/*.js'], // Correcto si tus rutas están aquí
};

module.exports = swaggerJSDoc(options);
