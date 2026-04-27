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
  const current = localStorage.getItem("adminPage") || "home";

  useEffect(() => {
    if (user) {
      const userRole = JSON.parse(user);
      setRole(userRole.role);
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated || (role && role !== "Admin")) {
      navigate("/login");
    }
  }, [isAuthenticated, role, navigate]);

  if (!isAuthenticated || role !== "Admin") {
    return null;
  }
  return (
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
        <div className={style.buttonContainer}>
          <button
            className={current == "home" ? style.current : ""}
            onClick={() => {
              (navigate("home"), localStorage.setItem("adminPage", "home"));
            }}
          >
            Dashboard
          </button>
          <button
            className={current == "new" ? style.current : ""}
            onClick={() => {
              (navigate("newParkingLots"),
                localStorage.setItem("adminPage", "new"));
            }}
          >
            Add Parking Area
          </button>
          <button
            className={current == "manageArea" ? style.current : ""}
            onClick={() => {
              (navigate("manageParking"),
                localStorage.setItem("adminPage", "manageArea"));
            }}
          >
            Manage Parking Area
          </button>
          <button
            className={current == "manageUser" ? style.current : ""}
            onClick={() => {
              (navigate("manageUser"),
                localStorage.setItem("adminPage", "manageUser"));
            }}
          >
            Manage Users
          </button>
          <button
            className={current == "support" ? style.current : ""}
            onClick={() => {
              (navigate("support"),
                localStorage.setItem("adminPage", "support"));
            }}
          >
            Support
          </button>
        </div>
        <div className={style.decor}>
          <div className={style.profile}></div>
          <div style={{ alignContent: "center" }}>Admin Name</div>
        </div>
      </div>
      <main className={style.content}>
        <Outlet />
      </main>
      {showMenu && <div className={style.menu}></div>}
    </div>
  );
}

export default AdminOutlet;
