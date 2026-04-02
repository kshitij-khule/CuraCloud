import { useState, useEffect } from "react";
import API from "../services/api";

function Appointments() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (user?.role === "doctor") {
          const res = await API.get(`/appointments/doctor/${user.id}`);
          setAppointments(res.data);
        } else if (user?.role === "patient") {
          const res = await API.get(`/appointments/patient/${user.id}`);
          setAppointments(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAppointments();
  }, [user?.id, user?.role]);

  const handleBook = async () => {
    if (!doctorId || !date) {
      setMessage("Please fill all fields!");
      return;
    }
    setLoading(true);
    try {
      await API.post("/appointments", {
        doctor_id: doctorId,
        patient_id: user.id,
        date: date,
      });
      setMessage("Appointment booked successfully! ✅");
      setDoctorId("");
      setDate("");
      // Refresh appointments
      const res = await API.get(`/appointments/patient/${user.id}`);
      setAppointments(res.data);
    } catch (err) {
      setMessage(err.response?.data || "Booking failed ❌");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Appointments</h2>

      {/* PATIENT - Book Appointment */}
      {user?.role === "patient" && (
        <div style={styles.card}>
          <h3 style={styles.subheading}>Book an Appointment</h3>
          <div style={styles.formGroup}>
            <label style={styles.label}>Doctor ID</label>
            <input
              style={styles.input}
              type="number"
              placeholder="Enter Doctor ID"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Appointment Date & Time</label>
            <input
              style={styles.input}
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {message && (
            <p style={message.includes("✅") ? styles.success : styles.error}>
              {message}
            </p>
          )}
          <button style={styles.button} onClick={handleBook} disabled={loading}>
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      )}

      {/* ALL ROLES - View Appointments */}
      <div style={styles.card}>
        <h3 style={styles.subheading}>
          {user?.role === "doctor" ? "Patient Appointments" : "Your Appointments"}
        </h3>
        {appointments.length === 0 ? (
          <p style={styles.empty}>No appointments found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  {user?.role === "doctor" ? "Patient Name" : "Doctor Name"}
                </th>
                <th style={styles.th}>Date & Time</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt.id} style={styles.tr}>
                  <td style={styles.td}>
                    {user?.role === "doctor" ? apt.patient_name : apt.doctor_name}
                  </td>
                  <td style={styles.td}>
                    {new Date(apt.date).toLocaleString()}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{apt.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "2rem", maxWidth: "900px", margin: "0 auto" },
  heading: { fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#1a1a2e" },
  subheading: { fontSize: "1.2rem", fontWeight: "600", marginBottom: "1.5rem", color: "#16213e" },
  card: { background: "#ffffff", borderRadius: "12px", padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "1.5rem" },
  formGroup: { marginBottom: "1rem" },
  label: { display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#333" },
  input: { width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem", outline: "none", boxSizing: "border-box" },
  button: { marginTop: "1rem", padding: "0.75rem 2rem", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "600", cursor: "pointer" },
  success: { color: "green", fontWeight: "500" },
  error: { color: "red", fontWeight: "500" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "0.75rem", background: "#f3f4f6", fontWeight: "600", color: "#333" },
  tr: { borderBottom: "1px solid #eee" },
  td: { padding: "0.75rem", color: "#555" },
  badge: { background: "#e0e7ff", color: "#4f46e5", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "500" },
  empty: { color: "#888", textAlign: "center", padding: "2rem" },
};

export default Appointments;