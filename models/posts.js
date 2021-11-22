const { DataTypes } = require("sequelize");
const db = require("../db");

const posts = db.define("post", {

    body: {
        type: DataTypes.TEXT,
        allowNull: false,
        required: true
    },

    likes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

})

module.exports = posts;