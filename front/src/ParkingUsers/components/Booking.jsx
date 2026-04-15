import { useEffect, useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { Base_URL } from "../../config";
import style from "../styles/Booking.module.css";
function Booking() {
  const [spaces, setSpaces] = useState([]);
  const [lots, setLots] = useState([]);
  const [currentLot, setCurrentLot] = useState(0);
  const [end, setEnd] = useState(false);
  const [start, setStart] = useState(true);
  const next = () => {
    if (currentLot == lots.length - 1) {
      setEnd(true);
      return;
    } else {
      setCurrentLot(currentLot + 1);
      setStart(false);
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
  const getParkingLots = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingLots/getInfo/${34}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setSpaces(data);
      console.log(data);
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
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const filteredSpot = spaces.filter(
    (s) => s.level === lots[currentLot].lotName,
  );
  console.log(filteredSpot);
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
                <></>
              ) : (
                <button onClick={() => prev()}>
                  <MdArrowLeft size={30} />
                </button>
              )}
              {end ? (
                <></>
              ) : (
                <button onClick={() => next()}>
                  <MdArrowRight size={30} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={style.bookingForm}></div>
    </div>
  );
}
export default Booking;
