const db = require('../db');
const UserModel = require('./user');
const PostModel = require('./posts');
const CommentModel = require('./comments')

//! Associations
UserModel.hasMany(PostModel, {
    foreignKey: "owner"
});
UserModel.hasMany(CommentModel, {
    foreignKey: "owner"
});

PostModel.belongsTo(UserModel);
PostModel.hasMany(CommentModel, {
    foreignKey: "postId"
});

CommentModel.belongsTo(PostModel)

module.exports = {
        UserModel,
        PostModel,
        CommentModel
    }