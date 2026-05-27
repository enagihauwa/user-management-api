# User Management API

A RESTful API built with Node.js, Express, and TypeScript featuring JWT authentication, bcrypt password hashing, and SQLite persistence.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** SQLite (better-sqlite3)
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcrypt

## Features

- Full CRUD operations for user management
- JWT-based authentication with 1 hour expiry
- Password hashing with bcrypt
- Protected routes via auth middleware
- SQL injection prevention with prepared statements
- Input validation with descriptive error messages

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/abubakarsani-raven/user-management-api.git
cd user-management-api
npm install
```

### Environment Variables

Create a `.env` file in the root directory:
JWT_SECRET_KEY=your_secret_key_here


### Running the Server

```bash
npm run dev:ts
```

Server runs on `http://localhost:3000`

## API Endpoints

### Auth Routes

| Method | Endpoint | Description | Body |
|---|---|---|---|
| POST | /auth/register | Register a new user | name, age, email, password |
| POST | /auth/login | Login and receive JWT token | email, password |

### User Routes (Protected — Bearer token required)

| Method | Endpoint | Description |
|---|---|---|
| GET | /users | Get all users |
| POST | /users | Create a new user |
| GET | /users/:id | Get user by ID |
| PATCH | /users/:id | Update user by ID |
| DELETE | /users/:id | Delete user by ID |

## Security

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens expire after 1 hour
- Protected routes via middleware verification
- SQL injection prevented with prepared statements
- Passwords excluded from all API responses