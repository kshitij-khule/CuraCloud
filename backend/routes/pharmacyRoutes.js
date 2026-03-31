const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  addMedicine,
  searchMedicine
} = require("../controllers/pharmacyController");

// ✅ ONLY PHARMACY CAN ADD MEDICINE
router.post("/", auth, role("pharmacy"), addMedicine);

// ✅ SEARCH (optional public or protected)
router.get("/search", auth, searchMedicine);

module.exports = router;