const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createAppointment,
  getDoctorAppointments
} = require("../controllers/appointmentController");

// ✅ ONLY PATIENT CAN BOOK
router.post("/", auth, role("patient"), createAppointment);

// ✅ ONLY DOCTOR CAN VIEW
router.get("/doctor/:id", auth, role("doctor"), getDoctorAppointments);

module.exports = router;