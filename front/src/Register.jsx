import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import style from "./Login.module.css";
function Register() {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <MdArrowBack size={24} color="red" />
      </div>
      <div className={style.logoContainer}>
        <img src={logo} alt="" />
      </div>
      <div className={style.formContainer}>
        <h2>Register</h2>
        <form>
          <input type="text" placeholder="firstName" />
          <input type="text" placeholder="lastName" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button type="submit">Register</button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Register;
