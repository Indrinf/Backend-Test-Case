import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import bookRoutes from './book.routes';
import memberRoutes from './member.routes';

const app = express();
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library System API',
            version: '1.0.0',
        },
    },
    apis: ['./src/application/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);

export default app;
