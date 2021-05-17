const Sequelize = require('sequelize')
const db = require('../config/db')


const User = db.define(
    "user",
    {
      username: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING }
    },
    {
      freezeTableName: true
    }
  );

module.exports = User
// var express = require('express');
// var app = express.Router();
// var db=require('../config/db');
// // another routes also appear here
// // this script to fetch data from MySQL databse table
// app.get('/user', function(req, res, next) {
//     var sql="SELECT * FROM user";
//     db.query(sql, function (err, data, fields) {
//     if (err) throw err;
//     res.render('./read', { title: 'User List', userData: data});
//   });
// });
// module.exports = app;