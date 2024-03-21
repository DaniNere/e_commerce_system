const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'A simple E-commerce API'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            password: {
              type: 'string'
            },
            phone: {
              type: 'string'
            },
            isAdmin: {
              type: 'boolean'
            },
            street: {
              type: 'string'
            },
            apartment: {
              type: 'string'
            },
            zip: {
              type: 'string'
            },
            city: {
              type: 'string'
            },
            country: {
              type: 'string'
            }
          },
          required: ['name', 'email', 'password', 'phone', 'isAdmin', 'street', 'apartment', 'zip', 'city', 'country']
        },
        Product: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            richDescription: {
              type: 'string'
            },
            image: {
              type: 'string'
            },
            brand: {
              type: 'string'
            },
            price: {
              type: 'number'
            },
            category: {
              type: 'string'
            },
          },
          required: ['name', 'price', 'category']
        },
        Category: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            icon: {
              type: 'string'
            },
            color: {
              type: 'string'
            }
          },
          required: ['name', 'icon', 'color']
        },
        Order: {
          type: 'object',
          properties: {
            orderItems: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            shippingAddress1: {
              type: 'string',
            },
            shippingAddress2: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            zip: {
              type: 'string',
            },
            country: {
              type: 'string',
            },
            phone: {
              type: 'string',
            },
          },
          required: ['orderItems', 'shippingAddress1', 'shippingAddress2', 'description', 'zip', 'country', 'phone']
        },
        LoginInput: {
          type: 'object',
          properties: {
            email: {
              type: 'string'
            },
            password: {
              type: 'string'
            }
          },
          required: ['email', 'password']
        },
        NewOrder: {
          type: 'object',
          properties: {
            // define las propiedades de NewOrder aquí
          },
          required: ['propiedad_requerida']
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  serveSwaggerUI: swaggerUi.serve,
  setupSwaggerUI: swaggerUi.setup(specs)
};
