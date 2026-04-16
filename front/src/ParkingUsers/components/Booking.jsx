import { useEffect, useRef, useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import logo from "../../assets/logo.png";
import { Base_URL } from "../../config";
import style from "../styles/Booking.module.css";
function Booking({ area }) {
  const [spaces, setSpaces] = useState([]);
  const [lots, setLots] = useState([]);
  const [currentLot, setCurrentLot] = useState(0);
  const [end, setEnd] = useState(false);
  const [start, setStart] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState([]);
  const bookRef = useRef(null);
  const [img, setImg] = useState();
  const [showQR, setShowQR] = useState(false);
  const next = () => {
    if (currentLot == lots.length - 1) {
      setEnd(true);
      return;
    } else {
      setCurrentLot(currentLot + 1);
      setStart(false);
    }
  };
  const book = async (e) => {
    e.preventDefault();
    const formData = new FormData(bookRef.current);
    try {
      const response = await fetch(`${Base_URL}/api/booking/book`, {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      setShowQR(true);
      setImg(data);
      getParkingLots();
    } catch (err) {
      console.log(err);
    }
  };
  const getSpot = async (id) => {
    try {
      const response = await fetch(`${Base_URL}/api/spots/book/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      setSelectedSpot(data);
    } catch (err) {
      console.log(err);
    }
  };
  const prev = () => {
    if (currentLot == 0) {
      setCurrentLot(0);
      setStart(true);
    } else {
      setCurrentLot(currentLot - 1);
      setStart(false);
      setEnd(false);
    }
  };
  const getParkingLots = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingLots/getInfo/${area}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await response.json();
      setSpaces(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getLots = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingLots/getLots/${34}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setLots(data);
    } catch (err) {
      console.log(err);
    }
  };
  const filteredSpot = spaces.filter(
    (s) => s.level === lots[currentLot].lotName,
  );
  useEffect(() => {
    getParkingLots();
    getLots();
  }, []);
  return (
    <div className={style.container}>
      <div className={style.spotsContainer}>
        <div className={style.indicator}>
          <div>
            <button>
              <div style={{ background: "green" }}></div>Available
            </button>
            <button>
              <div style={{ background: "#db8514" }}></div>Reserved
            </button>
            <button>
              <div style={{ background: "#e20909" }}></div>Occupied
            </button>
          </div>
        </div>
        <div className={style.spots}>
          <div className={style.spot}>
            <div className={style.div}>
              {filteredSpot.length > 0 ? (
                filteredSpot.map((s, index) => (
                  <div key={index}>
                    {s.status == "Available" && (
                      <div
                        className={style.space}
                        style={{ background: "green" }}
                        onClick={() => getSpot(s.id)}
                      >
                        <p>{s.name}</p>
                      </div>
                    )}
                    {s.status == "Reserved" && (
                      <div
                        className={style.space}
                        style={{ background: "#db8514" }}
                      >
                        <p>{s.name}</p>
                      </div>
                    )}
                    {s.status == "Occupied" && (
                      <div
                        className={style.space}
                        style={{ background: "#e20909" }}
                      >
                        <p>{s.name}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <h2>No Parking Space</h2>
              )}
            </div>
          </div>
          <div className={style.btnContainer}>
            <div style={{ display: "flex", gap: "10px" }}>
              {start ? (
                <button style={{ background: "none" }}></button>
              ) : (
                <button onClick={() => prev()}>
                  <MdArrowLeft size={30} />
                </button>
              )}
              {end ? (
                <button style={{ background: "none" }}></button>
              ) : (
                <button onClick={() => next()}>
                  <MdArrowRight size={30} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={style.bookingForm}>
        {selectedSpot.length > 0 ? (
          <form ref={bookRef} onSubmit={book}>
            <div className={style.parkingName}>{selectedSpot[0].area}</div>
            <input type="hidden" name="price" value={selectedSpot[0].price} />
            <input type="hidden" name="spot" value={selectedSpot[0].id} />
            <div className={style.lotInfo}>
              <div>
                <p>Level {selectedSpot[0].level}</p>{" "}
                <p>{selectedSpot[0].price} /hr</p>
              </div>
            </div>
            <div className={style.selectedSpot}>
              <div>{selectedSpot[0].spotCode}</div>
            </div>
            <button>Book</button>
          </form>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              alignContent: "center",
            }}
          >
            <h2>Please Select Space To Book</h2>
          </div>
        )}
      </div>
      {showQR && (
        <div className={style.qr} onClick={() => setShowQR(false)}>
          <div>
            <div
              style={{
                width: "calc(100% + 3em)",
                height: "80px",
                background: "#8e2de2",
                position: "relative",
                marginLeft: "-2em",
                marginTop: "-2em",
                padding: "0em",
                display: "flex",
                gap: "10px",
                color: "#fff",
              }}
            >
              <div
                style={{
                  width: "75px",
                  height: "70px",
                  padding: "0em",
                  background: "#fff",
                  margin: "5px",
                }}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={logo}
                  alt=""
                />
              </div>
              <div
                style={{
                  width: "calc(100% - 90px)",
                  height: "100%",
                  padding: "0em",
                  background: "none",
                }}
              >
                <h2>Entrance Code</h2>
              </div>
            </div>
            <img src={`data:image/png;base64,${img}`} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
export default Booking;
