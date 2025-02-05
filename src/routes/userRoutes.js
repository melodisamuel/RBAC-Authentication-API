const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", authMiddleware.signup);

module.exports = router;
