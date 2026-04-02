const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createAppointment,
  getDoctorAppointments,
  getPatientAppointments
} = require("../controllers/appointmentController");

router.get("/patient/:id", auth, role("patient"), getPatientAppointments);
// ✅ ONLY PATIENT CAN BOOK
router.post("/", auth, role("patient"), createAppointment);

// ✅ ONLY DOCTOR CAN VIEW
router.get("/doctor/:id", auth, role("doctor"), getDoctorAppointments);

module.exports = router;