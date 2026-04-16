import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import logo from "../../assets/logo.png";
import { Base_URL } from "../../config";
import style from "../styles/HistoryPage.module.css";
function History() {
  const [bookings, setBookings] = useState([]);
  const [showBooking, setShowBooking] = useState(true);
  const [img, setImg] = useState();
  const [receipt, setReceipt] = useState([]);
  const getMyBooking = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/booking/getMyBooking`, {
        method: "GET",
      });
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getBook = async (id) => {
    try {
      const response = await fetch(`${Base_URL}/api/booking/getBooking/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      setReceipt(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getBookingQRCode = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/getEntrance/${id}`,
        {
          method: "GET",
        },
      );
      const data = await response.text();
      setImg(data);
    } catch (err) {
      console.log(err);
    } finally {
      setShowBooking(false);
    }
  };
  useEffect(() => {
    getMyBooking();
  }, []);
  return (
    <div className={style.container}>
      {showBooking ? (
        <div className={style.div}>
          <div>
            {bookings.length > 0 ? (
              bookings.map((b, index) => (
                <div
                  key={index}
                  style={{ marginBottom: "2,5px", marginTop: "2.5px" }}
                  className={style.book}
                  onClick={() => {
                    (getBook(b.id), getBookingQRCode(b.id));
                  }}
                >
                  <div className={style.info}>
                    <div>{new Date(b.date).toLocaleDateString()}</div>
                    {b.status == "Open" ? (
                      <div
                        style={{
                          textAlign: "end",
                          color: "#22b814",
                          fontWeight: "bold",
                        }}
                      >
                        {b.status}
                      </div>
                    ) : (
                      <div
                        style={{
                          textAlign: "end",
                          color: "#b81414",
                          fontWeight: "bold",
                        }}
                      >
                        {b.status}
                      </div>
                    )}
                  </div>
                  <div
                    className={style.info}
                    style={{ border: "none", marginTop: "5px" }}
                  >
                    <div>Parking Area</div>
                    <div style={{ textAlign: "end" }}>{b.area}</div>
                  </div>
                  <div className={style.info} style={{ border: "none" }}>
                    <div>Level</div>
                    <div style={{ textAlign: "end" }}>{b.level}</div>
                  </div>
                  <div className={style.info} style={{ border: "none" }}>
                    <div>Space</div>
                    <div style={{ textAlign: "end" }}>{b.spot}</div>
                  </div>
                  <div className={style.info} style={{ border: "none" }}>
                    <div>Price</div>
                    <div style={{ textAlign: "end" }}>{b.price} birr/hr</div>
                  </div>
                </div>
              ))
            ) : (
              <h2>No Booking Found</h2>
            )}
          </div>
        </div>
      ) : (
        <div className={style.showBooking}>
          <div
            style={{ width: "max-content" }}
            onClick={() => setShowBooking(true)}
          >
            <MdArrowBack color="red" size={24} />
          </div>
          <div className={style.qrCode}>
            <div
              className={style.label}
              style={{ display: "flex", gap: "10px" }}
            >
              <div style={{ width: "100px", height: "100px" }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={logo}
                  alt=""
                />
              </div>
              <div
                style={{
                  width: "calc(100% - 110px)",
                  height: "100px",
                }}
              >
                <h2>Parkify</h2>
                <p>
                  {receipt[0].area}{" "}
                  <span style={{ fontWeight: "bold" }}>Entrance</span>
                </p>
              </div>
            </div>
            <div className={style.code}>
              <img src={`data:image/png;base64,${img}`} alt="" />
            </div>
          </div>
          <div className={style.receiptContainer}>
            {receipt.length > 0 && (
              <div className={style.receipt}>
                <div className={style.logo}>
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={logo}
                      alt=""
                    />
                  </div>
                  <div>
                    <h2>Parkify</h2>
                    <p>{receipt[0].area} Booking Receipt</p>
                  </div>
                </div>
                <div className={style.body}>
                  <div
                    style={{
                      height: "max-content",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <p style={{ flex: "1" }}>Parking Area</p>
                    <p style={{ flex: "1", textAlign: "end" }}>
                      {receipt[0].area}
                    </p>
                  </div>
                  <div
                    style={{
                      height: "max-content",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <p style={{ flex: "1" }}>Level</p>
                    <p style={{ flex: "1", textAlign: "end" }}>
                      {receipt[0].level}
                    </p>
                  </div>
                  <div
                    style={{
                      height: "max-content",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <p style={{ flex: "1" }}>Spot</p>
                    <p style={{ flex: "1", textAlign: "end" }}>
                      {receipt[0].spot}
                    </p>
                  </div>
                  <div
                    style={{
                      height: "max-content",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <p style={{ flex: "1" }}>price</p>
                    <p style={{ flex: "1", textAlign: "end" }}>
                      {receipt[0].price} /hr
                    </p>
                  </div>
                  <div
                    style={{
                      height: "max-content",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <p style={{ flex: "1" }}>Duration</p>
                    <p style={{ flex: "1", textAlign: "end" }}>
                      {receipt[0].duration} hr
                    </p>
                  </div>
                  <div
                    style={{
                      height: "max-content",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <p style={{ flex: "1" }}>Total</p>
                    <p style={{ flex: "1", textAlign: "end" }}>
                      {receipt[0].total}
                    </p>
                  </div>
                </div>
                <div className={style.btnContainer}>
                  <button style={{ background: "blue" }}>Pay</button>
                  <button style={{ background: "red" }}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default History;
