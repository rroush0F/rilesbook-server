const Express = require('express');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const {UserModel } = require("../models/")
const jwt = require("jsonwebtoken")
const router = Express.Router();
const bcrypt = require("bcryptjs");
 const validateJWT = require("../middleware/validate-jwt")
const AccessControl = require("accesscontrol");

router.get('/practice', (req,res) => {
    res.send('Hey! This is a practice route!')
});

module.exports = router;