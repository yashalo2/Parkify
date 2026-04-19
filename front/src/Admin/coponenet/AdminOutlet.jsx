import { useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import style from "../styles/AdminOutLet.module.css";
function AdminOutlet() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const isAuthenticated = !!sessionStorage.getItem("user");
  const [role, setRole] = useState("");
  const user = sessionStorage.getItem("user");
  useEffect(() => {
    if (user) {
      const userRole = JSON.parse(user);
      setRole(userRole.role);
    }
  }, {});

  return isAuthenticated ? (
    role == "Admin" ? (
      <div className={style.container}>
        <div className={style.topBar}>
          <div className={style.logoContainer}>
            <img src={logo} alt="" />
          </div>
          <div className={style.name}>
            <strong style={{ marginBottom: "0px" }}>Parkify</strong>{" "}
            <p style={{ marginTop: "0px" }}>smart parking</p>
          </div>
          <div className={style.profile} onClick={() => setShowMenu(!showMenu)}>
            <MdPerson className={style.icon} size={40} />
          </div>
        </div>
        <div className={style.decor}>
          <div className={style.one}></div>
          <div className={style.two}></div>
        </div>
        <div className={style.leftPanel}>
          <button onClick={() => navigate("dashboard")}>Dashboard</button>
          <button onClick={() => navigate("newParkingLots")}>
            Add Parking Area
          </button>
          <button onClick={() => navigate("manageParking")}>
            Manage Parking Area
          </button>
          <button onClick={() => navigate("manageUser")}>Manage Users</button>
          <button onClick={() => navigate("support")}>Support</button>
          <div className={style.decor}>
            <div className={style.one}></div>
            <div className={style.two}></div>
          </div>
        </div>
        <main className={style.content}>
          <Outlet />
        </main>
        {showMenu && <div className={style.menu}></div>}
      </div>
    ) : (
      navigate("/login")
    )
  ) : (
    navigate("/login")
  );
}

export default AdminOutlet;
