import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { MdBlock, MdFilterAlt, MdPerson, MdSend } from "react-icons/md";
import SockJS from "sockjs-client";
import { Base_URL } from "../../config";
import notifications from "../../Sounds/notification.mp3";
import style from "../styles/AdminSupport.module.css";
function AdminSupportPage() {
  const [content, setContent] = useState();
  const [client, setClient] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState();
  const [myId, setMyId] = useState();
  const [users, setUsers] = useState([]);
  const [fullName, setFullName] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const notification = new Audio(notifications);
  const textRef = useRef(null);
  const getNeedyUsers = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/message/needyUsers`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const search = async (user) => {
    if (user.length == 0) {
      getNeedyUsers();
      return;
    }
    try {
      const response = await fetch(
        `${Base_URL}/api/message/searchUser/${user}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const requestMessages = async () => {
    if (receiverId == null) {
      return;
    }
    try {
      const response = await fetch(
        `${Base_URL}/api/message/${receiverId}/messages`,
        {
          method: "GET",
          credentials: "include",
        },
      );
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
          requestMessages();
        });
      },
    });
    stompClient.activate();
    setClient(stompClient);
    getNeedyUsers();
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
    const user = sessionStorage.getItem("user");
    if (user) {
      const userI = JSON.parse(user);
      setMyId(Number(userI.id));
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.userContainer}>
        <div
          style={{
            width: "100%",
            height: "50px",
            textAlign: "center",
            alignContent: "center",
          }}
        >
          <h3>Support Center</h3>
        </div>
        <div className={style.filter}>
          <input
            type="text"
            onChange={(e) => search(e.target.value)}
            placeholder="search by first name ,last name or email"
          />
          <button>
            <MdFilterAlt size={25} />
          </button>
        </div>
        <div className={style.users}>
          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                onClick={() => {
                  (setReceiverId(user.id),
                    setFullName(user.firstName + " " + user.lastName),
                    setShowMessage(true),
                    requestMessages());
                }}
                key={index}
                className={style.user}
              >
                <div className={style.profile}>
                  <div className={style.img}>
                    <MdPerson size={50} />
                  </div>
                </div>
                <div className={style.info}>
                  <div>
                    {" "}
                    {user.firstName} {user.lastName}
                  </div>
                  <div> {user.email}</div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                width: "100%",
                height: "10%",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <h2>No User Found</h2>
            </div>
          )}
        </div>
      </div>
      {showMessage ? (
        <div className={style.messageContainer}>
          <div className={style.header}>
            <div className={style.receiver}>
              <div className={style.div}>
                <MdPerson size={25} />
              </div>
              <div className={style.name}>{fullName}</div>
            </div>
            <div className={style.action}>
              <button>
                <MdBlock />
              </button>
            </div>
          </div>
          <div className={style.body}>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={index}>
                  {message.senderId == myId ? (
                    <div className={style.message}>
                      <div
                        style={{
                          borderBottomRightRadius: "0px",
                          borderBottomLeftRadius: "20px",
                          color: "#fff",
                          background: "#303dfac9",
                        }}
                        className={style.messageContent}
                      >
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{ justifyContent: "flex-start" }}
                      className={style.message}
                    >
                      <div className={style.messageContent}>
                        {message.content}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
          <div className={style.input}>
            <div className={style.textarea}>
              <textarea
                ref={textRef}
                onChange={(e) => {
                  (handleInput(), setContent(e.target.value));
                }}
                value={content}
                type="text"
                placeholder="type message here ..."
              />
              <div className={style.button}>
                <button onClick={sendMessage}>
                  <MdSend />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.messageContainer}>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#0311786e",
              textAlign: "center",
              alignContent: "center",
            }}
          >
            <h1>Please Select User To Message</h1>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminSupportPage;
