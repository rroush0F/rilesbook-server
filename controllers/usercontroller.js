const Express = require('express');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const { UserModel } = require("../models")
const jwt = require("jsonwebtoken")
const router = Express.Router();
const bcrypt = require("bcryptjs");
const validateJWT = require("../middleware/validate-jwt")
const AccessControl = require("accesscontrol");


//! Register Endpoint (FUNCTIONING EP#1)

router.post('/register', async (req, res) => {
    const {email, password, firstName, lastName, location, admin} = req.body.user
    try {
        let User = await UserModel.create({
            email: email,
            password: bcrypt.hashSync(password, 13),
            firstName: firstName,
            lastName: lastName,
            location: location,
            admin: admin
        });
        console.log(User)
        let token = jwt.sign({id: User.id, email: User.email}, process.env.JWT_SECRET, {expiresIn: 60 * 60 *24});
        console.log(token)
        res.status(201).json({
            message: "User successfully registered",
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use"
            });
        } else {
            res.status(500).json({
                error: err,
                message: "Failed to register user"
            })
        }
    }
});

//! Login Endpoint (FUNCTIONING EP#2)

router.post("/login", async (req, res) => {
    let { email, password } = req.body.user;
    
    try {
        let loginUser = await UserModel.findOne({
            where: {
                email: email,
            }
        });
        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if (passwordComparison) {
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect Email or Password"
                })
            }
        } else {
            res.status(401).json({
                message: "Incorrect Email or Password"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
})

//! Delete User Endpoint (FUNCTIONING EP #3)

router.delete("/delete/loggedInUser", validateJWT, async (req, res) => {
    const userId = req.user.id

    try {
        const query = {
            where: {
                id: userId
        },
    };
    
        await UserModel.destroy(query)
        res.status(200).json({
            message: "User Deleted"
        })
    } catch(err) {
        res.status(500).json({
            message: "Failed to delete User"
        })
    }
})

module.exports = router;