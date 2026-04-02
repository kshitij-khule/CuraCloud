const router = require("express").Router();

const authController = require("../controllers/authController");

console.log("AuthController:", authController);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/doctors", authController.getDoctors);

module.exports = router;