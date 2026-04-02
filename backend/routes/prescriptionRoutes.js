const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createPrescription,
  getPrescriptions
} = require("../controllers/prescriptionController");

// ONLY DOCTOR CAN ADD PRESCRIPTION
router.post("/", auth, role("doctor"), createPrescription);

// PATIENT CAN VIEW THEIR PRESCRIPTIONS
router.get("/:patient_id", auth, getPrescriptions);

module.exports = router;