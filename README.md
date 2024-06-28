# Blog Application

## Overview

This is a blog application built with Node.js, Express, and MongoDB. It supports user registration, login, post CRUD operations, comments, likes, notifications, and profile management. There are also admin functionalities to manage users and their roles.

## Features

- User Registration and Login
- Password Reset Functionality
- CRUD Operations for Posts
- Commenting on Posts
- Liking Posts and Comments
- Notification System
- Profile Management
- Admin Panel for User Management
- Rate Limiting
- Input Validation
- Secure Endpoints with JWT

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Nodemailer
- Crypto

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/blog-app.git
    cd blog-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following variables:
    ```
    MONGO_URL=your_mongodb_uri
    JSECRET_CODE=your_jwt_secret
    GMAIL_PWD=your_gmail_password
    ```

4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### Auth Routes

- **POST** `/api/users/register`: Register a new user
- **POST** `/api/users/login`: Login a user

### Password Reset Routes

- **POST** `/api/password/request-reset`: Request password reset
- **POST** `/api/password/reset/:token`: Reset password

### Post Routes

- **POST** `/api/posts`: Create a new post
- **GET** `/api/posts`: Get all posts
- **GET** `/api/posts/:postId`: Get a specific post
- **PUT** `/api/posts/:postId`: Update a post
- **DELETE** `/api/posts/:postId`: Delete a post

### Comment Routes

- **POST** `/api/posts/:postId/comments`: Add a comment to a post
- **GET** `/api/posts/:postId/comments`: Get all comments for a post
- **PUT** `/api/comments/:commentId`: Update a comment
- **DELETE** `/api/comments/:commentId`: Delete a comment

### Like Routes

- **POST** `/api/posts/:postId/like`: Like a post
- **POST** `/api/comments/:commentId/like`: Like a comment
- **GET** `/api/users/:userId/likes/posts`: Get all liked posts for a user
- **GET** `/api/users/:userId/likes/comments`: Get all liked comments for a user

### Notification Routes

- **GET** `/api/notifications`: Get all notifications for the logged-in user

### Profile Routes

- **GET** `/api/users/profile`: Get the logged-in user's profile
- **PUT** `/api/users/profile`: Update the logged-in user's profile

### Admin Routes

- **GET** `/api/admin/users`: Get all users (admin only)
- **PUT** `/api/admin/users/:id`: Update a user's role (admin only)
- **DELETE** `/api/admin/users/:id`: Delete a user (admin only)

## Testing

You can use ThunderClient or Postman to test the API endpoints. Here are some example requests:

### Register a User

- **Method**: POST
- **URL**: `http://localhost:5000/api/users/register`
- **Body**:
    ```json
    {
      "username": "testuser",
      "email": "testuser@example.com",
      "password": "password123"
    }
    ```

### Login a User

- **Method**: POST
- **URL**: `http://localhost:5000/api/users/login`
- **Body**:
    ```json
    {
      "email": "testuser@example.com",
      "password": "password123"
    }
    ```

### Create a Post

- **Method**: POST
- **URL**: `http://localhost:5000/api/posts`
- **Headers**:
    ```json
    {
      "Authorization": "Bearer your_jwt_token"
    }
    ```
- **Body**:
    ```json
    {
      "title": "My First Post",
      "content": "This is the content of my first post."
    }
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Special thanks to all the libraries and frameworks used in this project.
- Thanks to the contributors and the open-source community.
