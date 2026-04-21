import { useNavigate } from "react-router-dom";
import style from "./Login-Registration.module.css";
import car from "./assets/carView.png";
function Landing() {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.logo}></div>
      <div className={style.top}>
        <button>About</button>
        <button>Contact</button>
        <button>Support</button>
        <button>Terms & Policy</button>
      </div>
      <div className={style.card}>
        <img src={car} alt="" />

        <div></div>
        <div className={style.div}></div>
        <div className={style.infoCard}>
          <p>
            <h3>Park smarter, not harder.</h3> Find your perfect parking spot
            with Parkify - the ultimate smart parking solution. Say goodbye to
            circling the block and hello to stress-free parking. With real-time
            availability, seamless navigation, and secure payments, Parkify
            makes parking a breeze. Join the parking revolution today and
            experience the future of parking!
          </p>
          <div className={style.buttons}>
            <button onClick={() => navigate("login")}>Get Started</button>
            <button
              style={{
                background: "none",
                color: "grey",
                border: "2px solid black",
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className={style.mobileCard}>
        <h3>Park smarter, not harder.</h3> Find your perfect parking spot with
        Parkify - the ultimate smart parking solution. Say goodbye to circling
        the block and hello to stress-free parking. With real-time availability,
        seamless navigation, and secure payments, Parkify makes parking a
        breeze. Join the parking revolution today and experience the future of
        parking!
        <div className={style.buttons}>
          <button
            onClick={() => navigate("login")}
            style={{ background: "blue", color: "white", border: "none" }}
          >
            Get Started
          </button>
          <button
            style={{
              background: "none",
              color: "grey",
              border: "2px solid black",
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
export default Landing;
