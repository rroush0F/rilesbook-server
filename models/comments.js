const { DataTypes } = require("sequelize");
const db = require("../db");

const Comments = db.define("comments", {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },

    body: {
        type: DataTypes.TEXT,
        allowNull: false,
        required: true
    },

    createdDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    createdTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    likesCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = Comments;