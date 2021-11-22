const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { PostModel } = require("../models")

//! Create Post Endpoint (WORKING EP #4)

router.post('/create', validateJWT, async (req, res) => {
    console.log("REQUEST USER", req.user)
    const {body, likes} = req.body.post;
    const {id} = req.user;
    const postEntry = {
        body,
        likes,
        owner: id,
    }
    try {
        const newPost = await PostModel.create(postEntry);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json({error: err})
    }
});

//! Edit Post Endpoint (WORKING! EP #5)

router.put("/update/:id", validateJWT, async (req, res) => {
    const {body, likes} = req.body.post
    const postId = req.params.id;
    const ownerId = req.user.id;

    const query = {
        where: {
            id: postId,
            owner: ownerId
        }
    };

    const updatedPost = {
        body: body,
        likes: likes
    };

    try {
        const update = await PostModel.update(updatedPost, query);
        res.status(200).json({update, updatedPost});
    } catch (err) {
        res.status(500).json({error: err});
    }
});

//! Get All Posts (WORKING! EP #6)
router.get("/timeline", validateJWT, async (req, res) => {
    try {
        const allPosts = await PostModel.findAll();
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(500).json({error: err});
    }
})

//! Get My Posts (WORKING! EP #7)
router.get("/myposts", validateJWT, async (req, res) => {
    let {id} = req.user;
    try {
        const myPosts = await PostModel.findAll({
            where: {
                owner: id
            }
        });
            res.status(200).json(myPosts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

// //! Get Posts By User's Name (Stretch Goal)
// router.get("/posts/:id", validateJWT, async (req, res) => {
//     const { firstName, lastName } = req.params;
//     try {
//         const results = await PostModel.findAll({
//             where: { firstName: firstName,
//                      lastName: lastName
//             }
//         });
//         res.status(200).json(results);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

//! Delete Posts by Id (WORKING! EP #8)
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const postId = req.params.id;
    try {
        const query = {
            where: {
                id: postId,
                owner: ownerId
            }
        };
        await PostModel.destroy(query);
        res.status(200).json({ message: "Post Deleted."});
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

module.exports = router;