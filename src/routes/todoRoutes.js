const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');
const { validateTodo, handleValidation } = require('../middleware/validate');

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Success
 */
router.use(protect);

router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', validateTodo, handleValidation, todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;