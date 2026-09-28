require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const swaggerSpec = require('./docs/swagger');
const AppError = require('./utils/AppError');

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Security & Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // maksimal 100 request per IP
  message: 'Terlalu banyak request, coba lagi nanti',
});
app.use('/api', limiter);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Todo API Level Advanced is running!',
    documentation: 'http://localhost:3000/api-docs',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Handle route yang tidak ada
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} tidak ditemukan`, 404));
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});