// const express = require("express");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// router.post("/signup", authMiddleware.signup);

// module.exports = router;

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');



const router = express.Router();

router.route('/register').post(authMiddleware.signUp);
router.route('/login').post(authMiddleware.login);  


module.exports = router;