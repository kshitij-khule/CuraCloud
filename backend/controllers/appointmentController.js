const pool = require("../config/db");

// Create appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctor_id, patient_id, date } = req.body;

    const result = await pool.query(
      "INSERT INTO appointments (doctor_id, patient_id, date) VALUES ($1,$2,$3) RETURNING *",
      [doctor_id, patient_id, date]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Get doctor appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, u.name as patient_name 
       FROM appointments a
       JOIN users u ON a.patient_id = u.id
       WHERE doctor_id=$1`,
      [req.params.id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};