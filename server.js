import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware для генерации числовых ID
app.use((req, res, next) => {
  if (req.method === 'POST') {
    const timestamp = Date.now();
    req.body.id = timestamp.toString();
  }
  next();
});

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tactics Shop API',
      version: '1.0.0',
      description: 'API документация для магазина тактиков',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/api/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Создаем json-server
const jsonServerMiddleware = jsonServer.defaults();
const router = jsonServer.router('public/data.json');

// Используем middleware json-server
app.use(jsonServerMiddleware);

// Добавляем маршруты json-server
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
  console.log(`API endpoints available at http://localhost:${port}/products`);
}); 