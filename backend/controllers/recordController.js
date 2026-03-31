const pool = require("../config/db");

// Add record
exports.addRecord = async (req, res) => {
  try {
    const { patient_id, history, allergies } = req.body;

    const result = await pool.query(
      "INSERT INTO records (patient_id, history, allergies) VALUES ($1,$2,$3) RETURNING *",
      [patient_id, history, allergies]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Get records
exports.getRecords = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM records WHERE patient_id=$1",
      [req.params.patient_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};