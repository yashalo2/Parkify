import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Shared.css";
export default function Contact() {
  const navigate = useNavigate();
  return (
    <div className="page-container gradient-bg">
      <div
        onClick={() => navigate("/")}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        <MdArrowBack color="red" size={30} />
      </div>
      <h1>Contact Us</h1>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send</button>
      </form>
      <div className="contact-info">
        <p>📧 support@parkify.com</p>
        <p>📍 Adama, Ethiopia</p>
      </div>
    </div>
  );
}
