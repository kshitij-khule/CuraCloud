import { useEffect, useState } from "react";
import API from "../services/api";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    patient_id: "",
    medicines: "",
    notes: ""
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get(`/appointments/doctor/${user.id}`);
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addPrescription = async () => {
    try {
      await API.post("/prescriptions", {
        doctor_id: user.id,
        patient_id: form.patient_id,
        medicines: form.medicines,
        notes: form.notes
      });

      alert("Prescription added ✅");

      // Clear form
      setForm({
        patient_id: "",
        medicines: "",
        notes: ""
      });

    } catch (err) {
      alert("Error adding prescription");
    }
  };

  return (
    <div>
      <h2>Doctor Panel</h2>

      {/* APPOINTMENTS */}
      <h3>Your Appointments</h3>

      {appointments.length === 0 ? (
        <p>No appointments</p>
      ) : (
        <ul>
          {appointments.map((a) => (
            <li key={a.id}>
              Patient: {a.patient_name} | Date: {a.date}
            </li>
          ))}
        </ul>
      )}

      {/* PRESCRIPTION FORM */}
      <h3>Add Prescription</h3>

      <input
        placeholder="Patient ID"
        value={form.patient_id}
        onChange={(e) =>
          setForm({ ...form, patient_id: e.target.value })
        }
      />

      <br /><br />

      <input
        placeholder="Medicines"
        value={form.medicines}
        onChange={(e) =>
          setForm({ ...form, medicines: e.target.value })
        }
      />

      <br /><br />

      <input
        placeholder="Notes"
        value={form.notes}
        onChange={(e) =>
          setForm({ ...form, notes: e.target.value })
        }
      />

      <br /><br />

      <button onClick={addPrescription}>
        Add Prescription
      </button>
    </div>
  );
}

export default DoctorDashboard;