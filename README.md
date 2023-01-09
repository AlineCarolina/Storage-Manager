# Project Store Manager!

This project is my first CRUD API using the MSC architecture. The API is a sales management system, where it will be possible to create, view, delete and update products and sales.

---

## About the project

Esse projeto foi desenvolvido com foco em aprender a construir APIs usando a arquitetura MSC (Models, Services e Controllers). Atraves da aplicação é possivel realizar um CRUD de todos os dados contidos no banco de dados (MySQL).

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