import { useRef } from "react";
import toast from "react-hot-toast";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "./config";
import "./Shared.css";
export default function Contact() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const send = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    try {
      const response = await fetch(`${Base_URL}/api/waiting/sendMessage`, {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      if (data == "Message Sent") {
        toast.success(data);
      } else {
        toast.error("Error Occurred");
      }
    } catch (err) {
      toast.error("Failed to send message. Please try again later.");
    }
  };
  return (
    <div className="page-container gradient-bg">
      <div
        onClick={() => navigate("/")}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        <MdArrowBack color="red" size={30} />
      </div>
      <h1>Contact Us</h1>
      <form ref={formRef} onSubmit={send} className="contact-form">
        <input type="text" required name="name" placeholder="Your Name" />
        <input type="email" required name="email" placeholder="Your Email" />
        <textarea name="message" required placeholder="Your Message"></textarea>
        <button type="submit">Send</button>
      </form>
      <div className="contact-info">
        <p>Email Us: support@parkify.com</p>
        <p>Location: Adama, Ethiopia</p>
      </div>
      <div className="info">
        <div className="logo"></div>
        <div className="socials">
          <div className="social-icon">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
            <div className="four"></div>
            <div className="five"></div>
            <div className="six"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
