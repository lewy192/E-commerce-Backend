// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
    {
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stock: { type: DataTypes.NUMBER, allowNull: false, defaultValue: 10 },
        catergoryId: {
            type: DataTypes.NUMBER,
            allowNull: false,
            references: { model: "category", key: "id" },
        },
        // define columns
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "product",
    }
);

module.exports = Product;
