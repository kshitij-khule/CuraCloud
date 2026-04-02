import { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      // Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful ✅");

      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data || "Login failed ❌");
    }
  };

  return (
  <div className="login-wrapper">
    <div className="login-box">
      <h2>Welcome Back</h2>
      <p className="login-subtitle">Sign in to your CuraCloud account</p>
      <input
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} style={{width: '100%', marginTop: '16px'}}>
        Sign In
      </button>
    </div>
  </div>
);
}

export default Login;