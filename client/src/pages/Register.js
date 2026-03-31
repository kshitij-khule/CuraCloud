import { useState } from "react";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient"
  });

  const handleRegister = async () => {
    try {
      // Register user
      await API.post("/auth/register", form);

      // Auto login after register
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      // Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Registered & Logged in ✅");

      // Redirect
      window.location.href = "/dashboard";

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data || "Registration failed ❌");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <select
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        <option value="pharmacy">Pharmacy</option>
      </select>

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;