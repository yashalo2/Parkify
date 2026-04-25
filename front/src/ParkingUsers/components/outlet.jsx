import { useEffect, useState } from "react";
import {
  MdHeadphones,
  MdHistory,
  MdHome,
  MdPerson,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import style from "../styles/OutLet.module.css";

function OutLet() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [role, setRole] = useState("");
  const isAuthenticated = !!sessionStorage.getItem("user");
  const user = sessionStorage.getItem("user");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      const userRole = JSON.parse(user);
      setRole(userRole.role);
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated || (role && role !== "Customer")) {
      navigate("/login");
    }
  }, [isAuthenticated, role, navigate]);

  if (!isAuthenticated || role !== "Customer") {
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
        <div className={style.profileAndActions}>
          <div className={style.profile} onClick={() => setShowMenu(!showMenu)}>
            <MdPerson className={style.icon} size={30} />
          </div>
          <div className={style.actions}>
            <button>Home</button>
            <button>Find Parking</button>
            <button>History</button>
            <button>Settings</button>
            <button onClick={() => navigate("support")}>Support</button>
          </div>
        </div>
      </div>
      <main className={style.content} onClick={() => setShowMenu(false)}>
        <Outlet />
      </main>
      <div className={style.bottomBar}>
        <button onClick={() => navigate("home")}>
          <MdHome size={24} />
        </button>
        <button>
          <MdSearch size={24} />
        </button>
        <button onClick={() => navigate("history")}>
          <MdHistory size={24} />
        </button>
        <button>
          <MdSettings size={24} />
        </button>
        <button onClick={() => navigate("support")}>
          <MdHeadphones size={24} />
        </button>
      </div>
      {showMenu && <div className={style.menu}></div>}
    </div>
  );
}
export default OutLet;
