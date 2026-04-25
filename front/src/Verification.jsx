import { useState } from "react";
import toast from "react-hot-toast";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import logo from "./assets/logo.png";
import { Base_URL } from "./config";
function Verify() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [code, setCode] = useState(0);
  const verify = async () => {
    if (code.length < 6) {
      toast.error("code must be 6 digit");
      return;
    } else if (code.length > 6) {
      toast.error("code must be 6 digit");
      return;
    } else {
      try {
        const response = await fetch(`${Base_URL}/api/users/verify/${code}`, {
          method: "POST",
          credentials: "include",
        });
        const data = await response.text();
        if (data == "User Successfully Verified") {
          toast.success(data);
        } else {
          toast.error(data);
        }
      } catch (err) {
        toast.error("Error Occurred");
      } finally {
        setLoading(true);
      }
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
          onClick={() => navigate("/register")}
        >
          <MdArrowBack size={24} color="red" />
        </div>
        <div className={style.logoContainer}>
          <img src={logo} alt="" />
        </div>
        <div
          style={{ background: "#fff", boxShadow: "0px 0px 4px #919191bb" }}
          className={style.formContainer}
        >
          <h2 style={{ color: "Orange" }}>Verify Email</h2>
          <div>
            <label htmlFor="code">Enter code sent to your email address</label>
            <input
              type="text"
              id="code"
              name="email"
              placeholder="enter code"
              style={{ textAlign: "center", width: "80%" }}
              onChange={(e) => setCode(e.target.value)}
            />
            {loading ? (
              <button
                className={`${style.loginButton} ${style.loading}`}
              ></button>
            ) : (
              <button
                onClick={() => verify()}
                type="submit"
                style={{ background: "orange" }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Verify;
