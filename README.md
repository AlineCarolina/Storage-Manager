# Project Store Manager!

This project is my first CRUD API using the MSC architecture. The API is a sales management system, where it will be possible to create, view, delete and update products and sales.

---

## About the project

This project was developed with a focus on learning how to build APIs using the MSC (Models, Services and Controllers) architecture. Through the application it is possible to carry out a CRUD of all the data contained in the database (MySQL).

---

## Technologies used

* JavaScript
* Node.js
* Express
* MySQL

---

## How to run the project

To run the project locally:
1. Clone the repository
```
$ git clone git@github.com:AlineCarolina/Storage-Manager.git
```
2. Install dependencies
```
$ npm install
```
3. Create an .env file with the necessary environment variables, for example:
```
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3000
```
4. Restore the database contained in the file ./StoreManager.sql
5. To start the server in development mode just run the command
```
$ npm start
```

---
