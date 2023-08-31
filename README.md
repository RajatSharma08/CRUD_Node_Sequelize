# CRUD_Node_Sequelize

 ```
# User Management System

This is a user management system built with Express, Sequelize, and Pug. It allows users to create, read, update, and delete users from a MySQL database.

## Installation

1. Clone the repository.
2. Install the dependencies.
3. Create a `.env` file and add your database credentials.
4. Run the server.

```
git clone https://github.com/user-management-system/user-management-system.git
cd user-management-system
npm install
cp .env.example .env
DATABASE_URL=mysql://root:password@localhost:3306/user_management
npm start
```

## Usage

To create a new user, send a POST request to the `/create` endpoint with the following JSON body:

```
{
  "userName": "John Doe",
  "userDOB": "1990-01-01",
  "email": "johndoe@example.com",
  "contact": "1234567890",
  "country": "USA"
}
```

To get all users, send a GET request to the `/users` endpoint.

To update a user, send a PUT request to the `/update/:id` endpoint with the following JSON body:

```
{
  "userName": "John Doe",
  "userDOB": "1990-01-01",
  "email": "johndoe@example.com",
  "contact": "1234567890",
  "country": "USA"
}
```

To delete a user, send a DELETE request to the `/delete/:id` endpoint.

## Code Explanation

The code is divided into three main files:

* `index.js`: The main server file.
* `models/users.js`: The user model.
* `routes/users.js`: The user routes.

