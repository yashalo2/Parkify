import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import { Base_URL } from "./config";
import style from "./Login.module.css";
function Login() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const login = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    setLoading(true);
    try {
      const res = await fetch(`${Base_URL}/api/users/login`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.text();
      if (data === "Wrong Credentials") {
        toast.error("Invalid credentials.");
      } else {
        toast.success("Login successful!");
        navigate("/user/home");
      }
      console.log(data);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
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
        <form ref={formRef} onSubmit={login}>
          <input type="text" name="email" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          {loading ? (
            <button className={style.loginButton}>
              <div></div>
            </button>
          ) : (
            <button type="submit">Login</button>
          )}

          <p>
            Don't have an account?{" "}
            <span
              style={{
                color: "blue",
                textDecorationLine: "underline",
                cursor: "pointer",
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
