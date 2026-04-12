import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import style from "./Login.module.css";
function Login() {
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
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
