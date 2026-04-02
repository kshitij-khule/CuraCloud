import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../pages/sidebar";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";
import PharmacyDashboard from "./PharmacyDashboard";
import Appointments from "./Appointment";
import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      window.location.href = "/";
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <Routes>
            {/* HOME */}
            <Route
              path="/"
              element={
                <>
                  <h1>Dashboard</h1>
                  <h3>Welcome {user.name}</h3>
                  <div className="dashboard-grid">
                    <div className="card">
                      <h3>Role</h3>
                      <p>{user.role}</p>
                    </div>
                    <div className="card">
                      <h3>User ID</h3>
                      <p>{user.id}</p>
                    </div>
                    <div className="card">
                      <h3>Status</h3>
                      <p>Active</p>
                    </div>
                  </div>
                </>
              }
            />

            {/* PATIENT ROUTES */}
            {user.role === "patient" && (
              <>
                <Route path="appointments" element={<Appointments />} />
                <Route path="prescriptions" element={<PatientDashboard />} />
              </>
            )}

            {/* DOCTOR ROUTES */}
            {user.role === "doctor" && (
              <>
                <Route path="appointments" element={<Appointments />} />
                <Route path="add-prescription" element={<DoctorDashboard />} />
              </>
            )}

            {/* PHARMACY ROUTES */}
            {user.role === "pharmacy" && (
              <>
                <Route path="medicines" element={<PharmacyDashboard />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;