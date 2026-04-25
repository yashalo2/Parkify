import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { MdArrowForward, MdArrowUpward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import notifications from "../..//Sounds/notification.mp3";
import { Base_URL } from "../../config";
import style from "../styles/Support.module.css";
function Message() {
  const [content, setContent] = useState();
  const [client, setClient] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState();
  const [myId, setMyId] = useState();
  const navigate = useNavigate();
  const textRef = useRef(null);
  const notification = new Audio(notifications);
  const getMyMessage = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/message/getMyMessages`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };

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
        stompClient.subscribe(`/topic/message/${senderId}`, (message) => {
          setMessages((prev) => [...prev, JSON.parse(message.body)]);
          const mg = JSON.parse(message.body);
          notification.play();
          toast.success(mg.content);
          getMyMessage();
        });
      },
    });
    stompClient.activate();
    setClient(stompClient);
    getMyMessage();
    return () => stompClient.deactivate();
  }, [receiverId]);
  const sendMessage = async () => {
    try {
      if (client && client.connected) {
        const user = sessionStorage.getItem("user");
        const userI = JSON.parse(user);
        const senderId = userI.id;
        const date = new Date().toISOString();
        const msg = {
          senderId,
          receiverId,
          content,
          date,
        };
        client.publish({
          destination: "/app/chat",
          body: JSON.stringify(msg),
        });
        setMessages((prev) => [...prev, msg]);

        setContent("");
      }
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const handleInput = (e) => {
    const el = textRef.current;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
  };
  useEffect(() => {
    const getAdmin = async () => {
      try {
        const response = await fetch(`${Base_URL}/api/users/getSupport`, {
          method: "GET",
        });
        const data = await response.json();
        setReceiverId(data);
      } catch (err) {
        toast.error("Error Loading The Page");
      }
    };

    getAdmin();
  }, [receiverId]);
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const userI = JSON.parse(user);
      setMyId(Number(userI.id));
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.label}>
        Chat with User Support Group
        <MdArrowForward
          onClick={() => navigate("/customer/home")}
          style={{ position: "absolute", right: "5px", color: "black" }}
        />
      </div>
      <div className={style.contentContainer}>
        {messages.length > 0 &&
          messages.map((mes, index) => (
            <div key={index}>
              {mes.sender == myId ? (
                <div style={{ justifyItems: "end" }} className={style.content}>
                  <div
                    style={{
                      borderRadius: "20px",
                      borderBottomRightRadius: "0px",
                      color: "#fff",
                      background: "#303dfac9",
                    }}
                    className={style.text}
                  >
                    {mes.content}
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex" }} className={style.content}>
                  <div className={style.text}>{mes.content}</div>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className={style.inputContainer}>
        <textarea
          ref={textRef}
          type="text"
          value={content}
          onChange={(e) => {
            (setContent(e.target.value), handleInput());
          }}
          placeholder="Type your message..."
          style={{ flex: 1 }}
        />
        <div className={style.dev}>
          {" "}
          <button onClick={sendMessage}>
            <MdArrowUpward />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Message;
