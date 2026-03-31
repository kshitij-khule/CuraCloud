const auth = require("../middleware/authMiddleware")
const router = require("express").Router();

const {
  addRecord,
  getRecords
} = require("../controllers/recordController");

router.post("/", addRecord);
router.get("/:patient_id", getRecords);

module.exports = router;