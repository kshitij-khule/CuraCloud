const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
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

pool.connect()
  .then(() => console.log("PostgreSQL Connected ✅"))
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