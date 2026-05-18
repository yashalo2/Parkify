import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import style from "../styles/ChangePassword.module.css";
function ChangePassword() {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <MdArrowBack
        onClick={() => navigate("/admin/home")}
        className={style.back}
        color="red"
      />
      <div className={style.form}>
        <h2>Change Password</h2>
        <div>
          <label>Old Password</label>
          <input type="text" />
        </div>
        <div>
          <label>Old Password</label>
          <input type="text" />
        </div>
        <div>
          <label>Old Password</label>
          <input type="text" />
        </div>
        <div>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
}
export default ChangePassword;
