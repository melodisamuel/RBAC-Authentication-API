const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin can access this
router.get("/admin", authMiddleware, roleMiddleware(["Admin"]), (req, res) => {
    res.json({ message: "Admin Access Granted" });
});

// Shipper can access this (Admin can also access)
router.get("/shipper", authMiddleware, roleMiddleware(["Shipper"]), (req, res) => {
    res.json({ message: "Shipper Access Granted" });
});

// Carrier can access this (Admin can also access)
router.get("/carrier", authMiddleware, roleMiddleware(["Carrier"]), (req, res) => {
    res.json({ message: "Carrier Access Granted" });
});

module.exports = router;
