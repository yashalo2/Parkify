import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdArrowBack } from "react-icons/md";
import { Base_URL } from "../../config";
import style from "../styles/Contact.module.css";

function ContactAdmin() {
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState();
  const [subject, setSubject] = useState();
  const [content, setContent] = useState();
  const [email, setEmail] = useState();
  const [show, setShow] = useState(false);
  const [sending, setSending] = useState(false);
  const assign = (a, b, c, d) => {
    setEmail(a);
    setSubject(b);
    setContent(c);
    setId(d);
  };
  const send = async () => {
    if (subject == null || content == null || email == null) {
      toast.error("Error Occurred");
      return;
    }
    try {
      const response = await fetch(
        `${Base_URL}/api/waiting/sendMail/${email}/${subject}/${content}/${id}`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      const data = await response.text();
      if (data == "Mail sent") {
        toast.success(data);
        getAll();
        setShow(false);
      } else {
        toast.error(data);
      }
    } catch (err) {
      toast.error("Server Side Error");
    }
  };
  const getAll = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/waiting/getMessage`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setMessages(data.reverse());
      console.log(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <div className={style.pageWrapper}>
      {messages.length > 0 &&
        messages.map((msg, index) => (
          <div className={style.cardContainer} key={index}>
            <div className={style.headerSection}>
              <div className={style.avatar}>{msg.initials}</div>
              <div className={style.headerMeta}>
                <h2 className={style.userName}>{msg.name}</h2>
                <p className={style.receiveDate}>
                  Message received on {new Date(msg.created).toLocaleString()}
                </p>
              </div>
              <span
                className={style.statusBadge}
                style={{ color: "red", fontSize: "0.8rem" }}
              >
                {msg.replied == false && (
                  <span style={{ color: "green" }}>Waiting for reply</span>
                )}{" "}
                {msg.replied == true && (
                  <span style={{ color: "red" }}>Replied</span>
                )}
              </span>
            </div>

            <div className={style.sectionTitle}>
              <span className={style.icon}>👤</span> Contact Information
            </div>
            <div className={style.infoGrid}>
              <div className={style.infoBox}>
                <div className={style.infoIconWrapper}>✉</div>
                <div>
                  <div className={style.infoLabel}>Email Address</div>
                  <div className={style.infoValue}>{msg.email}</div>
                </div>
              </div>
              <div className={style.infoBox}>
                <div className={style.infoIconWrapper}>👤</div>
                <div>
                  <div className={style.infoLabel}>Full Name</div>
                  <div className={style.infoValue}>{msg.name}</div>
                </div>
              </div>
            </div>

            <div className={style.sectionTitle}>Message</div>
            <div className={style.messageQuoteBox}>
              <span className={style.quoteMarkTop}>“</span>
              <div className={style.messageBody}>
                <p>Hello,</p>
                <p>{msg.message}</p>
                <p>Thank you!</p>
                <p>
                  Best regards,
                  <br />
                  {msg.name}
                </p>
              </div>
              <span className={style.quoteMarkBottom}>”</span>
            </div>
            <button
              onClick={() => {
                (setEmail(msg.email), setId(msg.id), setShow(true));
              }}
              className={style.replyBtn}
            >
              <span className={style.icon}>➔</span> Reply
            </button>
          </div>
        ))}
      {show && (
        <div className={style.reply}>
          <MdArrowBack
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              cursor: "pointer",
            }}
            size={30}
            color="red"
            onClick={() => setShow(false)}
          />
          <div className={style.form}>
            <div>
              <h2>Yasin Shalo</h2>
            </div>
            <div>
              <input
                type="text"
                onChange={(e) => setSubject(e.target.value)}
                placeholder="subject"
              />
            </div>
            <div className={style.area}>
              <textarea
                name=""
                onChange={(e) => setContent(e.target.value)}
                id=""
                placeholder="Enter Message"
              ></textarea>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {sending ? (
                <button
                  style={{
                    width: "40%",
                    height: "80%",
                    border: "none",
                    background: "#14299e",
                    padding: "0.5em",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    color: "white",
                    borderRadius: "5px",
                  }}
                >
                  send ...
                </button>
              ) : (
                <button
                  style={{
                    width: "40%",
                    height: "80%",
                    border: "none",
                    background: "blue",
                    padding: "0.5em",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    color: "white",
                    borderRadius: "5px",
                  }}
                  onClick={() => send()}
                >
                  send
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactAdmin;
