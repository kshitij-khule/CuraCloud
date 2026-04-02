const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json("All fields required");
    }

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, hashedPassword, role]
    );

    res.json(newUser.rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json("User not found");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(400).json("Invalid password");
    }

    const token = jwt.sign(
      { id: user.rows[0].id, role: user.rows[0].role },
      "secret"
    );

    res.json({
      token,
      user: user.rows[0]
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

// GET ALL DOCTORS
const getDoctors = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE role='doctor'"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json("Server error");
  }
};

module.exports = { register, login, getDoctors };

