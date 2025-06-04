const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MicroAPI Productos',
      version: '1.0.0',
      description: 'API de productos protegida con JWT y documentación Swagger',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: "Agrega aquí tu token JWT obtenido desde el microservicio Auth. Ejemplo: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI..."
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
            ImageUrl: { type: 'string', example: 'https://servidor.com/imagenes/1.jpg' },
            ImageLocalPath: { type: 'string', example: '/ProductImages/img_1.jpg' }
          },
          required: ['Name', 'Price']
        }
      }
    },
    security: [
      { BearerAuth: [] }
    ],
    servers: [
      { url: 'http://localhost:4000' }
    ]
  },
  apis: ['./routes/*.js'], // Asegúrate que apunte a donde están tus rutas con JSDoc
};

module.exports = swaggerJSDoc(options);
