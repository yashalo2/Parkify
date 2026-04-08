import { useNavigate } from "react-router-dom";
import style from "./Login-Registration.module.css";
import car from "./assets/carView.png";
function Registration() {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.logo}></div>
      <div className={style.top}>
        <button
          style={{ background: "blue", color: "#fff", borderRadius: "5px" }}
        >
          Get Started
        </button>
        <button style={{ borderRadius: "5px", border: "2px solid black" }}>
          Learn More
        </button>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            hic quisquam cum corrupti, esse est odit alias sed, minus enim aut
            perferendis ea nihil amet neque deserunt aspernatur vel. Saepe
            asperiores excepturi molestiae alias repellat esse facere dolorum
            est provident in. Provident, nostrum. Ut nulla sed, sint delectus
            expedita adipisci maxime animi recusandae itaque soluta. Culpa,
            dolorem doloremque? Voluptates odio libero accusamus accusantium
            voluptate maiores enim incidunt eveniet natus! Veniam eligendi
            laboriosam repellendus excepturi ipsum iusto, voluptatibus
            exercitationem modi totam ipsam ipsa nostrum, nobis nesciunt
            doloribus dolorem, est nam tempora soluta ab harum iste maiores
            aspernatur autem saepe? Harum, vero.
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              textAlign: "center",
              height: "max-content",
              width: "max-content",
              marginLeft: "20%",
            }}
          >
            <button onClick={() => navigate("user")}>Get Started</button>
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
      <footer></footer>
    </div>
  );
}
export default Registration;
