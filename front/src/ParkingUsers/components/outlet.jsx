import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { MdHeadphones, MdHistory, MdHome, MdPerson } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import notifications from "../../Sounds/alert.mp3";
import logo from "../../assets/logo.png";
import { Base_URL } from "../../config";
import style from "../styles/OutLet.module.css";
function OutLet() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [client, setClient] = useState("");
  const [role, setRole] = useState("");
  const isAuthenticated = !!sessionStorage.getItem("user");
  const user = sessionStorage.getItem("user");
  const [loader, setLoader] = useState(false);
  const notification = new Audio(notifications);

  const them = localStorage.getItem("them") || "home";
  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () =>
        new SockJS(`${Base_URL}/ws`, null, { withCredentials: true }),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to webSocket");

        const user = sessionStorage.getItem("user");
        const userI = JSON.parse(user);
        const senderId = userI.id;
        console.log(senderId);

        stompClient.subscribe(`/topic/alert/${senderId}`, (message) => {
          console.log(message);
          notification.play();
          console.log(message.body);
        });
      },
    });
    stompClient.activate();
    setClient(stompClient);
    return () => stompClient.deactivate();
  }, []);

  useEffect(() => {
    if (user) {
      const userRole = JSON.parse(user);
      setRole(userRole.role);
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated || (role && role !== "Customer")) {
      navigate("/login");
    }
  }, [isAuthenticated, role, navigate]);

  if (!isAuthenticated || role !== "Customer") {
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
        <div className={style.profileAndActions}>
          <div className={style.profile} onClick={() => setShowMenu(!showMenu)}>
            <MdPerson className={style.icon} size={30} />
          </div>
          <div className={style.actions}>
            <button>Home</button>
            <button>Find Parking</button>
            <button>History</button>
            <button>Settings</button>
            <button onClick={() => navigate("support")}>Support</button>
          </div>
        </div>
      </div>
      <main className={style.content} onClick={() => setShowMenu(false)}>
        <Outlet />
      </main>
      <div className={style.bottomBar}>
        <button
          className={them == "history" ? style.current : ""}
          onClick={() => {
            (navigate("history"), localStorage.setItem("them", "history"));
          }}
        >
          <MdHistory size={24} />
        </button>
        <button
          className={them == "home" ? style.current : ""}
          onClick={() => {
            (navigate("home"), localStorage.setItem("them", "home"));
          }}
        >
          <MdHome size={24} />
        </button>

        <button
          className={them == "support" ? style.current : ""}
          onClick={() => {
            (navigate("support"), localStorage.setItem("them", "support"));
          }}
        >
          <MdHeadphones size={24} />
        </button>
      </div>
      {showMenu && <div className={style.menu}></div>}
    </div>
  );
}
export default OutLet;
