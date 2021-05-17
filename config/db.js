const sequelize = require("sequelize");
const mysql = require('mysql')

const db = new sequelize("crudnodejs", "root", "", {
  dialect: "mysql",
});

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crudnodejs',
})
db.sync({});

module.exports = db, conn;