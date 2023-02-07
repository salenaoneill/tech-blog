// import important parts of sequelize library
const {Model, DataTypes} = require('sequelize');

// import our database connection from config.js
const sequelize = require('../config/connection');

//require bcrypt for password hashing
const bcrypt = require('bcrypt');

// Initialize Comment model (table) by extending off Sequelize's Model class
class User extends Model {
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}


//set up fields and rules for Comment model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    },
    {
        hooks: {
           async beforeCreate(userData) {
            userData.password = await bcrypt.hash(userData.password, 10);
            return userData;
           },
           async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData, 10);
            return updatedUserData;
           }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
)