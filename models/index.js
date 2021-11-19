const db = require('../db');
const UserModel = require('./user');
const PostModel = require('./posts');
const CommentModel = require('./comments')

//! Associations
UserModel.hasMany(PostModel);
UserModel.hasMany(CommentModel);

PostModel.belongsTo(UserModel);
PostModel.hasMany(CommentModel);

CommentModel.belongsTo(PostModel)

module.exports = {
        UserModel,
        PostModel,
        CommentModel
    }