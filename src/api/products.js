import axios from 'axios';

// Базовый URL для API
const API_URL = 'http://localhost:3001/products';

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Получить список всех продуктов
 *     description: Возвращает массив всех доступных продуктов
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   image:
 *                     type: string
 *                   categories:
 *                     type: array
 *                     items:
 *                       type: string
 */
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Возвращаем данные товаров
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error);
    throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
  }
};

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Создать новый продукт
 *     description: Создает новый продукт в системе
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - description
 *               - image
 *               - categories
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Продукт успешно создан
 */
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении товара:', error);
    throw error;
  }
};

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Обновить существующий продукт
 *     description: Обновляет информацию о существующем продукте
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID продукта
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Продукт успешно обновлен
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении товара:', error);
    throw error;
  }
};

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Удалить продукт
 *     description: Удаляет продукт по его ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID продукта
 *     responses:
 *       200:
 *         description: Продукт успешно удален
 */
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    console.error('Ошибка при удалении товара:', error);
    throw error;
  }
};