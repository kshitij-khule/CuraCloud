import { useState, useEffect } from "react";
import API from "../services/api";

function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  // STATES
  const [form, setForm] = useState({
    doctor_id: "",
    date: ""
  });

  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // LOAD DATA
  useEffect(() => {
    fetchPrescriptions();
    fetchAppointments();
  }, []);

  // 🔥 BOOK APPOINTMENT
  const bookAppointment = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/appointments",
        {
          doctor_id: Number(form.doctor_id),
          patient_id: user.id,
          date: form.date
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Appointment booked ✅");

      // Reset form
      setForm({
        doctor_id: "",
        date: ""
      });

      fetchAppointments(); // refresh list

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      alert(err.response?.data || "Error booking appointment");
    }
  };

  // 🔥 FETCH PRESCRIPTIONS
  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/prescriptions/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPrescriptions(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 FETCH APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/appointments/patient/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("API RESPONSE:", res.data);

      setAppointments(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="content">

      {/* BOOK APPOINTMENT */}
      <div className="card">
        <h2>Patient Panel</h2>

        <h3>Book Appointment</h3>

        <input
          placeholder="Doctor ID"
          value={form.doctor_id}
          onChange={(e) =>
            setForm({ ...form, doctor_id: e.target.value })
          }
        />

        <input
          type="datetime-local"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <button onClick={bookAppointment}>
          Book Appointment
        </button>
      </div>

      {/* APPOINTMENTS LIST */}
      <div className="card">
        <h3>Your Appointments</h3>

        {appointments.length === 0 ? (
          <p>No appointments</p>
        ) : (
          appointments.map((a) => (
            <div key={a.id}>
              <p><strong>Doctor ID:</strong> {a.doctor_id}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(a.date).toLocaleString()}
              </p>
              <p><strong>Status:</strong> {a.status}</p>
              <hr />
            </div>
          ))
        )}
      </div>

      {/* PRESCRIPTIONS */}
      <div className="card">
        <h3>Your Prescriptions</h3>

        {prescriptions.length === 0 ? (
          <p>No prescriptions</p>
        ) : (
          prescriptions.map((p) => (
            <div key={p.id}>
              <p><strong>Medicines:</strong> {p.medicines}</p>
              <p><strong>Notes:</strong> {p.notes}</p>
              <hr />
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default PatientDashboard;