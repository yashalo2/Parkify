import { Outlet, useNavigate } from "react-router-dom";
import style from "../styles/AdminOutLet.module.css";
function AdminOutlet() {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.topBar}></div>
      <div className={style.leftPanel}>
        <button onClick={() => navigate("dashboard")}>Dashboard</button>
        <div className={style.decor}>
          <div className={style.one}></div>
          <div className={style.two}></div>
        </div>
      </div>
      <main className={style.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminOutlet;
