import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import style from "./About.module.css";
import aboutImg6 from "./assets/image.png";
import aboutImg5 from "./assets/occupied.jpg";
import aboutImg4 from "./assets/payment.jpg";
import aboutImg1 from "./assets/select.jpg";
import aboutImg3 from "./assets/support.jpg";
import aboutImg2 from "./assets/waiting.jpg";
export default function About() {
  const navigate = useNavigate();
  return (
    <div className={`${style.pageContainer} ${style.gradientBg}`}>
      <div
        onClick={() => navigate("/")}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        <MdArrowBack color="red" size={30} />
      </div>
      <h1>About Parkify</h1>
      <p>
        Parkify is a smart parking solution designed to simplify urban mobility.
        It connects drivers, property owners, and administrators through a
        seamless digital platform that eliminates the frustration of searching
        for parking. With real-time monitoring, automated booking, and
        cancellation, Parkify ensures efficiency, transparency, and convenience.
      </p>

      <div className={style.gallery}>
        <div className={style.galleryItem}>
          <img src={aboutImg1} alt="Smart Map Integration" />
          <p>
            <strong>Smart Map Integration:</strong> Drivers can view available
            parking spots in real time on an interactive map, making navigation
            effortless.
          </p>
        </div>

        <div className={style.galleryItem}>
          <img src={aboutImg2} alt="Audit History" />
          <p>
            <strong>Audit History:</strong> Administrators can track every
            booking and cancellation with detailed logs for transparency and
            accountability.
          </p>
        </div>

        <div className={style.galleryItem}>
          <img src={aboutImg3} alt="Customer Chat Support" />
          <p>
            <strong>Customer Chat Support:</strong> Built-in communication tools
            allow users to get instant help and resolve issues quickly.
          </p>
        </div>

        <div className={style.galleryItem}>
          <img src={aboutImg4} alt="Secure Payment System" />
          <p>
            <strong>Secure Payment System:</strong> Integrated payment gateways
            ensure safe, fast, and reliable transactions for every booking.
          </p>
        </div>

        <div className={style.galleryItem}>
          <img src={aboutImg5} alt="Admin Dashboard" />
          <p>
            <strong>Real Time Spot Status:</strong> A modern, data-driven Spot
            Status Detection gives proper real time spot status for users to
            booking peking for their prefered and available Space growth.
          </p>
        </div>
        <div className={style.galleryItem}>
          <img src={aboutImg6} alt="Customer Chat Support" />
          <p>
            <strong>Alert:</strong> Built-in Alerts system that alert users for
            the error they made and correct them.
          </p>
        </div>
      </div>
    </div>
  );
}
