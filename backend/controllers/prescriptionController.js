const pool = require("../config/db");

// Create prescription
exports.createPrescription = async (req, res) => {
  try {
    const { doctor_id, patient_id, medicines, notes } = req.body;

    const result = await pool.query(
      "INSERT INTO prescriptions (doctor_id, patient_id, medicines, notes) VALUES ($1,$2,$3,$4) RETURNING *",
      [doctor_id, patient_id, medicines, notes]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Get patient prescriptions
exports.getPrescriptions = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM prescriptions WHERE patient_id=$1",
      [req.params.patient_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};