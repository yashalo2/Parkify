import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import style from "../styles/OutLet.module.css";
function OutLet() {
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
          <div className={style.profile}></div>
          <div className={style.actions}>
            <button>Home</button>
            <button>Find Parking</button>
            <button>History</button>
            <button>Settings</button>
            <button>Support</button>
          </div>
        </div>
      </div>
      <main className={style.content}>
        <Outlet />
      </main>
    </div>
  );
}
export default OutLet;
