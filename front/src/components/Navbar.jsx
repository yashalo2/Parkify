import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        background: "#1976d2",
        color: "#fff",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Smart Parking
        </Link>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/user" style={{ color: "#fff", textDecoration: "none" }}>
          User Portal
        </Link>
        <Link to="/admin" style={{ color: "#fff", textDecoration: "none" }}>
          Admin
        </Link>
        <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>
          About
        </Link>
        <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
