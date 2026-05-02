import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "./config";
import style from "./ScannerLogin.module.css";
function ScannerLogin() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const form = useRef(null);
  const login = async () => {
    if (code.length == 0 || password.length == 0) {
      toast.error("Please Fill In The Credentials");
      return;
    }
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingArea/entranceScanner`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: code, password: password }),
        },
      );
      const data = await response.text();
      if (data == "Login Success") {
        toast.success(data);
        navigate("/scanner");
      } else {
        toast.error(data);
      }
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <div className={style.logo}></div>
        <div className={style.div}>{/* <h1>Gate</h1> */}</div>
      </div>
      <div className={style.form}>
        <h3>Login</h3>
        <input
          type="text"
          onChange={(e) => setCode(e.target.value)}
          placeholder=" gate code"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" password"
        />

        <button onClick={() => login()}>
          <MdLogin /> Log-In
        </button>
      </div>
    </div>
  );
}
export default ScannerLogin;
