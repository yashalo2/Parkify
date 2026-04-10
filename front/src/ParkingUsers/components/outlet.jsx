import {
  MdHeadphones,
  MdHistory,
  MdHome,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import style from "../styles/OutLet.module.css";
function OutLet() {
  const navigate = useNavigate();
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
      <div className={style.bottomBar}>
        <button onClick={() => navigate("home")}>
          <MdHome size={24} />
        </button>
        <button>
          <MdSearch size={24} />
        </button>
        <button>
          <MdHistory size={24} />
        </button>
        <button>
          <MdSettings size={24} />
        </button>
        <button>
          <MdHeadphones size={24} />
        </button>
      </div>
    </div>
  );
}
export default OutLet;
