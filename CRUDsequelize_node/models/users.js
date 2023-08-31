// const { DataTypes, Model } = require('sequelize');
// const dbConf = require('../dbConf'); 
// const sequelize = require("sequelize");
// const user = require('../user');

// class User extends Model {}

// User.init(
//   {
//     userID: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     userName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     userDOB: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     contact: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     country: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: 'User', // Set the model name
//     tableName: 'users', // Set the table name
//   } 
// );

// module.exports = User;
