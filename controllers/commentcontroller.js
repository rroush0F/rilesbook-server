const Express = require('express');
const router = Express.Router();
const { CommentModel } = require('../models')
let validateJWT = require("../middleware/validate-jwt");

//! FULL CRUD #2
//! New Comment (WORKING! EP #9)
router.post('/new/:postId', validateJWT, async (req, res) => {
    const { body, likes } = req.body.comment;
    const postId = req.params.postId;
    try {
        await CommentModel.create({
            body: body,
            owner: req.user.id,
            postId: postId,
            likes: likes
        })
        .then (
            comment => {
                res.status(201).json({
                    comment: comment,
                    message: 'comment created'
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to create comment: ${err}`
        })
    }
})

//! Get All Comments on a Post(WORKING EP #10)
router.get('/all/:postId', validateJWT, async (req, res) => {
    let postId = req.params.postId;
    try {
        const postComments = await CommentModel.findAll({
            where: {
                postId: postId
            }
        });
        res.status(200).json(postComments)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//! EDIT A COMMENT (WORKING! EP #11)
router.put('/edit/:id', validateJWT, async (req, res) => {
    const {body} = req.body.comment;
    const commentId = req.params.id;
    const userId = req.user.id

    const query = {
        where: {
            id: commentId,
            owner: userId
        }
    };

    const updatedComment = {
        body: body,

    };

    try{
        const update = await CommentModel.update(updatedComment, query);
        res.status(200).json({update, updatedComment});
    } catch (err) {
        res.status(500).json({error: err});
    }
});

//! DELETE A COMMENT (WORKING! EP #12)
    router.delete("/delete/:id", validateJWT, async (req, res) => {
        const ownerId = req.user.id;
        const commentId = req.params.id;
        try {
            const query = {
                where: {
                    id: commentId,
                    owner: ownerId
                }
            };
            await CommentModel.destroy(query);
            res.status(200).json({ message: "Comment Deleted."});
        } catch (err) {
            res.status(500).json({ error: err});
        }
    });
module.exports = router;