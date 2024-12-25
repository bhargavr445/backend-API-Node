const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'University API',
            version: '1.0.0',
            description: 'API for managing universities',
        },
        servers: [
            {
                url: 'http://localhost:3010',
            },
        ],
    },
    apis: ['./src/routes/*'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};