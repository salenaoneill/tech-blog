require("dotenv").config(); //import variables from .env

const Sequelize = require("sequelize");

// process.env.DB_NAME,
// process.env.DB_USER,
// process.env.DB_PASSWORD,
//  DB_SESSION_SECRET='been_unravelling_since_2014',
//JAWSDB_URL=''

const sequelize = new Sequelize(
  'tech_blog_db',
  'root',
  'vegetable',
  {
    //sets up connection to database using sequelize
    host: "localhost",
    dialect: "mysql",
    port: 3306
  }
);


module.exports = sequelize;

// //dependencies
// const Sequelize = require('sequelize');
// require('dotenv').config();

// let sequelize;

// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   sequelize = new Sequelize(tech_blog_db, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
//   });
// }




// //creates connection to database
// const sequelize = process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306
//     });

// module.exports = sequelize;