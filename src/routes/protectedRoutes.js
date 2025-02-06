const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.route("/admin").get(authMiddleware, roleMiddleware(["Admin"]), (req, res) => {
    res.json({ message: "Admin Access Granted" });
});

router.route("/shipper").get(authMiddleware, roleMiddleware(["Admin", "Shipper"]), (req, res) => {
    res.json({ message: "Shipper Access Granted" });
});

router.route("/carrier").get(authMiddleware, roleMiddleware(["Admin", "Carrier"]), (req, res) => {
    res.json({ message: "Carrier Access Granted" });
});

module.exports = router;
