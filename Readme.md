# User Management API
User Managment API shows the use of REST api for performing CRUD operations for a user
## Description
User Managment API shows the use of REST api for performing CRUD operations for a user

## Tech Stack
ExpressJS, jsonwebtoken, tsc, nodemon, bcrypt
## Features
It allows to create user update their values dlete and fetch details all the while protecting routes using JWT and protected routes using a middleware and also catching all error while prevent SQL injection by using prepared statement
## Getting Started
run npm install to install the packages then to run the typescript server npm run dev:ts while for jaavscript version we use npm run express:dev
### Prerequisites
You need to run npm install 
### Installation

### Environment Variables
JWT_SECRET_KEY ="****"
### Running the Server
run npm install to install the packages then to run the typescript server npm run dev:ts while for jaavscript version we use npm run express:dev

## API Endpoints
/users and /auth
### Auth Routes
/auth/login ------------ to login using email and password 
/auth/register  ------------ to register using email, password, age, and name

### User Routes (Protected — requires Bearer token)
/users{GET} ------------------ to get all user in the app 
/users{POST} ------------------- to create a new user 
/users/:id{DELETE}-------------------- to delete a user with id 
/users/:id{GET}-------------------- to get a user with an id 
/users/:id{PATCH}-------------------- to update details of a user with id 
## Security
using JWT to control access to some route with 1hr expiry doen by the middleware and password masking then also checks being done before a request 