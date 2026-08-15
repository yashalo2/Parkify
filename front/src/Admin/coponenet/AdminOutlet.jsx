import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  MdAdd,
  MdContactMail,
  MdDashboard,
  MdHeadphones,
  MdLogout,
  MdManageAccounts,
  MdOutlineLocalParking,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Base_URL } from "../../config";
import style from "../styles/AdminOutLet.module.css";
function AdminOutlet() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const isAuthenticated = !!sessionStorage.getItem("user");
  const [role, setRole] = useState("");
  const user = sessionStorage.getItem("user");
  const current = localStorage.getItem("adminPage") || "home";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showCancelForm, setShowCancelForm] = useState(false);
  const bookingRef = useRef(null);
  const paymentRef = useRef(null);
  const [email, setEmail] = useState("");
  const [rePay, setRePay] = useState({});
  const [cancel, setCancel] = useState({});
  const logout = () => {
    fetch(`${Base_URL}/api/users/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.text())
      .then((data) => {
        if (data == "Logged Out") {
          toast.success(data);
          sessionStorage.removeItem("user");
          navigate("/login");
        } else {
          toast.error(data);
        }
      });
  };
  const getRePayData = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/payment/getRePayData`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setRePay(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getCancelData = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/booking/getCancelData`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setCancel(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const updatePaymentTimeOut = async (e) => {
    e.preventDefault();
    const formData = new FormData(paymentRef.current);
    try {
      const response = await fetch(
        `${Base_URL}/api/payment/updatePaymentTimeOut`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );
      const data = await response.text();
      if (data == "Update Success") {
        toast.success(data);
        setShowCancelForm(false);
      } else {
        toast.error(data);
      }
    } catch (err) {
      toast.error("ErrorOccurred");
    }
  };
  const bookingTimeOut = async (e) => {
    e.preventDefault();
    const formData = new FormData(bookingRef.current);
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/updateBookingTimeOut`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );
      const data = await response.text();
      if (data == "Update Success") {
        toast.success(data);
        setShowCancelForm(false);
      } else {
        toast.error(data);
      }
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  useEffect(() => {
    if (user) {
      const userRole = JSON.parse(user);
      setRole(userRole.role);
      setFirstName(userRole.firstName);
      setLastName(userRole.lastName);
      setEmail(userRole.email);
    }
    getRePayData();
    getCancelData();
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated || (role && role !== "Admin")) {
      navigate("/login");
    }
  }, [isAuthenticated, role, navigate]);

  if (!isAuthenticated || role !== "Admin") {
    return null;
  }

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
        <div className={style.profile} onClick={() => setShowMenu(!showMenu)}>
          <MdPerson className={style.icon} size={40} />
        </div>
      </div>
      <div className={style.decor}>
        <div className={style.one}></div>
        <div className={style.two}></div>
      </div>
      <div className={style.leftPanel}>
        <div className={style.buttonContainer}>
          <button
            className={current == "home" ? style.current : ""}
            onClick={() => {
              (navigate("home"), localStorage.setItem("adminPage", "home"));
            }}
          >
            <MdDashboard /> Dashboard
          </button>
          <button
            className={current == "new" ? style.current : ""}
            onClick={() => {
              (navigate("newParkingLots"),
                localStorage.setItem("adminPage", "new"));
            }}
          >
            <MdAdd /> Add Parking Area
          </button>
          <button
            className={current == "manageArea" ? style.current : ""}
            onClick={() => {
              (navigate("manageParking"),
                localStorage.setItem("adminPage", "manageArea"));
            }}
          >
            <MdOutlineLocalParking /> Manage Parking Area
          </button>
          <button
            className={current == "manageUser" ? style.current : ""}
            onClick={() => {
              (navigate("manageUser"),
                localStorage.setItem("adminPage", "manageUser"));
            }}
          >
            <MdManageAccounts /> Manage Users
          </button>
          <button
            className={current == "support" ? style.current : ""}
            onClick={() => {
              (navigate("support"),
                localStorage.setItem("adminPage", "support"));
            }}
          >
            <MdHeadphones /> Support
          </button>
          <button
            className={`${style.contact} ${current == "contact" ? style.current : ""}`}
            onClick={() => {
              (navigate("contact"),
                localStorage.setItem("adminPage", "contact"));
            }}
          >
            <MdContactMail /> Contact
          </button>
        </div>

        <div
          className={style.decor}
          onClick={() => {
            (setShowCancelForm(!showCancelForm),
              getCancelData(),
              getRePayData());
          }}
        >
          <div>
            {" "}
            <MdSettings />{" "}
          </div>{" "}
          <div style={{ flex: "1", alignContent: "center" }}>Setting</div>
        </div>
      </div>
      {showCancelForm && (
        <div className={style.form}>
          <form ref={bookingRef} onSubmit={bookingTimeOut}>
            <h3>Cancel Booking</h3>
            <div>
              <input type="number" name="timeOut" placeholder="enter value" />
              <select name="type" id="">
                <option value="Minute">minutes</option>
                <option value="Day">days</option>
                <option value="Week">weeks</option>
              </select>
              <button>Edit</button>
            </div>
          </form>
          <form ref={paymentRef} onSubmit={updatePaymentTimeOut}>
            <h3>RePay</h3>
            <div>
              <input type="number" name="timeOut" placeholder="enter value " />
              <select name="type" id="">
                <option value="Minute">minutes</option>
                <option value="Day">days</option>
                <option value="Week">weeks</option>
              </select>
              <button>Edit</button>
            </div>
          </form>{" "}
          <div style={{ margin: "50px" }}>
            <div
              style={{
                padding: "0.5em",
                width: "100%",
                height: "60px",
                marginLeft: "0px",
                display: "flex",
              }}
            >
              <div style={{ display: "grid", flex: "1" }}>
                <h3 style={{ margin: "0px" }}>RePay</h3>
                <p>
                  {rePay.timeOut} {rePay.type}
                </p>
              </div>
              <div style={{ display: "grid" }}>
                <h3 style={{ margin: "0px" }}>Cancel Booking</h3>
                <p>
                  {cancel.timeOut} {cancel.type}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <main className={style.content}>
        <Outlet />
      </main>
      {showMenu && (
        <div className={style.menu}>
          <div className={style.profile}>
            <div className={style.img}>
              <MdPerson size={100} color="#fff" />
            </div>
          </div>
          <div className={style.name}>
            <h3>
              {firstName} {lastName}
            </h3>
            <h4>{email}</h4>
          </div>
          <div className={style.btns}>
            <button onClick={() => navigate("changePassword")}>
              Change Password
            </button>
            <button onClick={() => logout()}>
              Log-Out <MdLogout color="red" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOutlet;
