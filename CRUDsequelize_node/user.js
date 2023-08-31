const { Sequelize } = require('sequelize');
const dbConf = require('./dbConf'); 

const { DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize("test_rjt",'root','Rootunlock@22',dbConf);

    const User = sequelize.define('User', 
    {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          userName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          userDOB: {
            type: DataTypes.DATE,
            allowNull: false,
           
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          contact: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          country: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          createdAt: {
            type: DataTypes.NOW,
            allowNull: true,
          },
          updatedAt: {
            type: DataTypes.NOW,
            allowNull: false,
          },
          
    })

module.exports = User;

