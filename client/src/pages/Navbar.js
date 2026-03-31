function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <h3>Healthcare App</h3>

      <div>
        👤 {user?.name}
        <button onClick={logout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;