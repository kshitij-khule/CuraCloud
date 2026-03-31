const pool = require("../config/db");

// Add medicine
exports.addMedicine = async (req, res) => {
  try {
    const { pharmacy_id, name, stock } = req.body;

    const result = await pool.query(
      "INSERT INTO medicines (pharmacy_id, name, stock) VALUES ($1,$2,$3) RETURNING *",
      [pharmacy_id, name, stock]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Search medicine
exports.searchMedicine = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM medicines WHERE name ILIKE $1",
      [`%${req.query.name}%`]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};