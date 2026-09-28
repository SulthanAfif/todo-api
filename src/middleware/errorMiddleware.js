const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Error dari Mongoose
  if (err.name === 'CastError') {
    err = new AppError('Resource tidak ditemukan', 404);
  }
  if (err.code === 11000) {
    err = new AppError('Data sudah ada (duplicate)', 400);
  }
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    err = new AppError(messages.join('. '), 400);
  }
  if (err.name === 'JsonWebTokenError') {
    err = new AppError('Token tidak valid', 401);
  }
  if (err.name === 'TokenExpiredError') {
    err = new AppError('Token sudah kadaluarsa', 401);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = errorHandler;