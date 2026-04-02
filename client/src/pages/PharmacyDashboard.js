import { useState, useEffect } from "react";
import API from "../services/api";

function PharmacyDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [medicines, setMedicines] = useState([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMedicines = async () => {
    try {
      const res = await API.get("/pharmacy/search?name=");
      setMedicines(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleAdd = async () => {
    if (!name || !stock) {
      setMessage("Please fill all fields!");
      return;
    }
    setLoading(true);
    try {
      await API.post("/pharmacy", {
        pharmacy_id: user.id,
        name,
        stock: parseInt(stock),
        price: parseFloat(price) || 0,
      });
      setMessage("Medicine added successfully! ✅");
      setName("");
      setStock("");
      setPrice("");
      fetchMedicines();
    } catch (err) {
      setMessage(err.response?.data || "Failed to add medicine ❌");
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    try {
      const res = await API.get(`/pharmacy/search?name=${search}`);
      setMedicines(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Pharmacy Dashboard</h2>

      {/* ADD MEDICINE - only for pharmacy role */}
      {user?.role === "pharmacy" && (
        <div style={styles.card}>
          <h3 style={styles.subheading}>Add Medicine</h3>
          <div style={styles.formGroup}>
            <label style={styles.label}>Medicine Name</label>
            <input
              style={styles.input}
              placeholder="e.g. Paracetamol"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={styles.row}>
            <div style={{ ...styles.formGroup, flex: 1, marginRight: "1rem" }}>
              <label style={styles.label}>Stock (units)</label>
              <input
                style={styles.input}
                type="number"
                placeholder="e.g. 100"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Price (₹)</label>
              <input
                style={styles.input}
                type="number"
                placeholder="e.g. 50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          {message && (
            <p style={message.includes("✅") ? styles.success : styles.error}>
              {message}
            </p>
          )}
          <button style={styles.button} onClick={handleAdd} disabled={loading}>
            {loading ? "Adding..." : "Add Medicine"}
          </button>
        </div>
      )}

      {/* SEARCH */}
      <div style={styles.card}>
        <h3 style={styles.subheading}>Medicine Inventory</h3>
        <div style={styles.searchRow}>
          <input
            style={{ ...styles.input, flex: 1, marginRight: "1rem" }}
            placeholder="Search medicine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button style={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div>

        {medicines.length === 0 ? (
          <p style={styles.empty}>No medicines found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Medicine Name</th>
                <th style={styles.th}>Stock</th>
                <th style={styles.th}>Price</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) => (
                <tr key={med.id} style={styles.tr}>
                  <td style={styles.td}>{med.name}</td>
                  <td style={styles.td}>
                    <span style={med.stock < 10 ? styles.lowStock : styles.badge}>
                      {med.stock} units
                    </span>
                  </td>
                  <td style={styles.td}>₹{med.price}</td>
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
  row: { display: "flex" },
  searchRow: { display: "flex", marginBottom: "1.5rem" },
  label: { display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#333" },
  input: { width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem", outline: "none", boxSizing: "border-box" },
  button: { marginTop: "1rem", padding: "0.75rem 2rem", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "600", cursor: "pointer" },
  searchButton: { padding: "0.75rem 1.5rem", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer" },
  success: { color: "green", fontWeight: "500" },
  error: { color: "red", fontWeight: "500" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "0.75rem", background: "#f3f4f6", fontWeight: "600", color: "#333" },
  tr: { borderBottom: "1px solid #eee" },
  td: { padding: "0.75rem", color: "#555" },
  badge: { background: "#d1fae5", color: "#059669", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem" },
  lowStock: { background: "#fee2e2", color: "#dc2626", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem" },
  empty: { color: "#888", textAlign: "center", padding: "2rem" },
};

export default PharmacyDashboard;