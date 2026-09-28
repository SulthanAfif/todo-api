const { body, validationResult } = require('express-validator');

const validateRegister = [
  body('name').notEmpty().withMessage('Nama wajib diisi'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').notEmpty().withMessage('Password wajib diisi'),
];

const validateTodo = [
  body('title').notEmpty().withMessage('Title wajib diisi'),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateTodo,
  handleValidation
};