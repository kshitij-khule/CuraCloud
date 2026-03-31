import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="sidebar">
      <h2>🏥 HealthApp</h2>

      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>

        {user?.role === "patient" && (
          <>
            <li><Link to="/dashboard/appointments">Appointments</Link></li>
            <li><Link to="/dashboard/prescriptions">Prescriptions</Link></li>
          </>
        )}

        {user?.role === "doctor" && (
          <>
            <li><Link to="/dashboard/appointments">Appointments</Link></li>
            <li><Link to="/dashboard/add-prescription">Add Prescription</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;