const pool = require("../config/db");

// Add medicine
exports.addMedicine = async (req, res) => {
  try {
    const { pharmacy_id, name, stock, price } = req.body;

    const result = await pool.query(
      "INSERT INTO medicines (pharmacy_id, name, stock, price) VALUES ($1,$2,$3,$4) RETURNING *",
      [pharmacy_id, name, stock, price || 0]
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