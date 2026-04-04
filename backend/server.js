const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));
app.use("/api/records", require("./routes/recordRoutes"));
app.use("/api/pharmacy", require("./routes/pharmacyRoutes"));
console.log("SOS ROUTE LOADED");
app.use("/api/sos", require("./routes/sosRoutes"));

// DB Connection
const pool = require("./config/db");

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS appointments (
      id SERIAL PRIMARY KEY,
      doctor_id INTEGER REFERENCES users(id),
      patient_id INTEGER REFERENCES users(id),
      date VARCHAR(100)
    );
    CREATE TABLE IF NOT EXISTS prescriptions (
      id SERIAL PRIMARY KEY,
      doctor_id INTEGER REFERENCES users(id),
      patient_id INTEGER REFERENCES users(id),
      medicines TEXT,
      notes TEXT
    );
    CREATE TABLE IF NOT EXISTS medicines (
      id SERIAL PRIMARY KEY,
      pharmacy_id INTEGER REFERENCES users(id),
      name VARCHAR(100),
      stock INTEGER,
      price DECIMAL(10,2) DEFAULT 0
    );
  `);
  console.log("Database tables ready ✅");
};

pool.connect()
  .then(() => {
    console.log("PostgreSQL Connected ✅");
    initDB();
  })
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});
app.post("/api/pharmacy", (req, res) => {
  res.send("Pharmacy route HIT");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});