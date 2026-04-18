import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { MdArrowUpward } from "react-icons/md";
import SockJS from "sockjs-client";
import { Base_URL } from "../../config";
import style from "../styles/Support.module.css";
function Message({ senderId, receiverId }) {
  const [content, setContent] = useState();
  const [client, setClient] = useState("");
  const [messages, setMessages] = useState([]);
  const textRef = useRef(null);
  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () =>
        new SockJS(`${Base_URL}/ws`, null, { withCredentials: true }),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to webSocket");
        stompClient.subscribe(`/topic/message/${receiverId}`, (message) => {
          setMessages((prev) => [...prev, JSON.parse(message.body)]);
        });
      },
    });
    stompClient.activate();
    setClient(stompClient);
    return () => stompClient.deactivate();
  }, [receiverId]);
  const sendMessage = async () => {
    try {
      if (client && client.connected) {
        const msg = {
          senderId,
          receiverId,
          content,
        };
        client.publish({
          destination: "/app/chat",
          body: JSON.stringify(msg),
        });
        setContent("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleInput = (e) => {
    const el = textRef.current;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px"; // cap at 200px
  };
  return (
    <div className={style.container}>
      <h2>Chat with User {receiverId}</h2>
      <div className={style.contentContainer}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender.username || msg.senderId}:</strong>{" "}
            {msg.content}
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
