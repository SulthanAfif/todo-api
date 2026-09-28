# Todo API

A complete RESTful API for managing personal Todo lists with authentication, built using Node.js and Express.

This project progressed from beginner to advanced level, featuring JWT authentication, MongoDB, validation, pagination, security best practices, and API documentation.

## Features

- User registration and login with JWT
- Password hashing with bcrypt
- Protected Todo routes (only authenticated users)
- Full CRUD operations for Todos
- Input validation
- Pagination, filtering, and sorting
- Global error handling
- Security: Helmet, CORS, Rate Limiting
- Request logging with Morgan
- Interactive API documentation with Swagger
- Clean project structure

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (jsonwebtoken) + bcryptjs
- **Validation:** express-validator
- **Security:** helmet, express-rate-limit, cors
- **Documentation:** swagger-ui-express + swagger-jsdoc
- **Logging:** morgan
- **Environment:** dotenv

## Project Structure

```
todo-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── todoController.js
│   ├── docs/
│   │   └── swagger.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validate.js
│   ├── models/
│   │   ├── Todo.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   ├── utils/
│   │   └── AppError.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```


## Installation

1. **Clone the repository**
```bash
git clone https://github.com/SulthanAfif/todo-api.git
cd todo-api
```
2. Install dependencies
```bash
npm install
```
3. Setup environment variables
```bash
cp .env.example .env
```
Example .env:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/todo-api
JWT_SECRET=your_super_secret_key_here
```
4. Run the server
Development mode:
```bash
npm run dev
```
Production mode:
```bash
npm start
```
Server will start at: http://localhost:3000

Swagger documentation: http://localhost:3000/api-docs

# API Endpoints
## Authentication
```
Method,Endpoint,Description,Access
POST,/api/auth/register,Register new user,Public
POST,/api/auth/login,Login user,Public
```
Register Body:
```JSON
{
  "name": "Budi Santoso",
  "email": "budi@email.com",
  "password": "123456"
}
```
Login Body:
```JSON
{
  "email": "budi@email.com",
  "password": "123456"
}
```

## Todos (Protected - requires Bearer Token)
```
Method,Endpoint,Description,Access
GET,/api/todos,Get all todos,Private
GET,/api/todos/:id,Get single todo,Private
POST,/api/todos,Create new todo,Private
PUT,/api/todos/:id,Update todo,Private
DELETE,/api/todos/:id,Delete todo,Private
```
Create / Update Body:
```JSON
{
  "title": "Belajar Node.js",
  "completed": false
}
```
## Query Parameters (for GET /api/todos)
```
Parameter,Example,Description
page,?page=2,Page number (default: 1)
limit,?limit=5,Items per page (default: 10)
completed,?completed=true,Filter by completion status
sort,?sort=-createdAt,Sort by field (- for descending)
```
Example:
```
GET /api/todos?page=1&limit=5&completed=false&sort=-createdAt
```

# Authentication

After login/register, you will receive a token.

Include it in the header for protected routes:
```
Authorization: Bearer your_token_here
```

# Error Handling
The API returns consistent error responses:
```JSON
{
  "status": "fail",
  "message": "Email sudah terdaftar"
}
```

# Scripts
```
Command,Description
npm start,Run in production mode
npm run dev,Run in development mode (nodemon)
```

# Future Improvements

- Refresh Token
- Email verification
- Role-based access control (Admin / User)
- Unit & Integration testing
- Docker support
- Deploy to Railway / Render


---

### Cara Pakai

1. Ganti semua `USERNAME` dengan username GitHub kamu.
2. (Opsional) Buat juga file `.env.example` dengan isi:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/todo-api
JWT_SECRET=your_super_secret_key_here