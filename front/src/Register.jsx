import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import { Base_URL } from "./config";
import style from "./Login.module.css";
function Register() {
  const [message, setMessage] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();
  const register = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    try {
      const response = await fetch(`${Base_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.text();
      console.log(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  return (
    <div className={style.body}>
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
          <form ref={formRef} onSubmit={register}>
            <input type="text" name="firstName" placeholder="firstName" />
            <input type="text" name="lastName" placeholder="lastName" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button type="submit">Register</button>
            <p>
              Already have an account?{" "}
              <span
                style={{
                  color: "blue",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
