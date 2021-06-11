const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                key: "id",
                modelName: "product",
            },
        },
        tagId: {
            type: DataTypes.INTEGER,
            references: {
                key: "id",
                model: "tag",
            },
        },
        // define columns
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "productTag",
    }
);

module.exports = ProductTag;
