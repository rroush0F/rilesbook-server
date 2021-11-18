const { DataTypes } = require("sequelize");
const db = require("../db");

const Posts = db.define("posts", {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },

    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    createdDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    createdTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    commentsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    likesCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

module.exports = Posts;