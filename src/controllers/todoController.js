const Todo = require('../models/Todo');

// Get all todos milik user yang login + Pagination + Filter
exports.getAllTodos = async (req, res, next) => {
  try {
    // 1. Filtering
    const queryObj = { user: req.user._id };
    if (req.query.completed) {
      queryObj.completed = req.query.completed === 'true';
    }

    // 2. Sorting
    const sortBy = req.query.sort || '-createdAt';

    // 3. Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const todos = await Todo.find(queryObj)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    const total = await Todo.countDocuments(queryObj);

    res.json({
      status: 'success',
      results: todos.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

// Get single todo
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ message: 'Todo tidak ditemukan' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create todo
exports.createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      user: req.user._id,
    });

    res.status(201).json({
      status: 'success',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ message: 'Todo tidak ditemukan' });
    }

    todo.title = req.body.title ?? todo.title;
    todo.completed = req.body.completed ?? todo.completed;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ message: 'Todo tidak ditemukan' });
    }

    res.json({ message: 'Todo berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};