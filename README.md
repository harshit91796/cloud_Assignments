# NestJS User Authentication API

## Description

This project is a NestJS-based API that provides user authentication functionality, including user registration, login, profile management, and a random joke feature. It uses MongoDB for data storage and JWT for authentication.

## Features

- User registration
- User login
- User profile retrieval  (protected route)
- Token-based authentication
- Random joke retrieval (protected route)
- Logout functionality

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   JWT_EXPIRATION=<jwt-expiration-time>
   ```

## Running the app


##The Test assignment is in test.ts file.
