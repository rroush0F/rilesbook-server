const { DataTypes } = require("sequelize");
const db = require("../db");

const Comments = db.define("comments", {

    body: {
        type: DataTypes.TEXT,
        allowNull: false,
        required: true
    },

    likes: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Comments;