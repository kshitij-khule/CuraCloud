const router = require("express").Router();

// ✅ CORRECT IMPORT
const authController = require("../controllers/authController");

// DEBUG (IMPORTANT)
console.log("AuthController:", authController);

// ROUTES
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;