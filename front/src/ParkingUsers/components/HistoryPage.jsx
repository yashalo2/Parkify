import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdArrowBack, MdClose, MdFilterAlt } from "react-icons/md";
import logo from "../../assets/logo.png";
import { Base_URL } from "../../config";
import style from "../styles/HistoryPage.module.css";
function History() {
  const [bookings, setBookings] = useState([]);
  const [showBooking, setShowBooking] = useState(true);
  const [img, setImg] = useState();
  const [receipt, setReceipt] = useState([]);
  const [bookingId, setBookingId] = useState();
  const [showPayment, setShowPayment] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [status, setStatus] = useState("Open");
  const [history, setHistory] = useState("booking");
  const pay = async (booking, e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Base_URL}/api/payment/pay/${booking}`, {
        method: "POST",
      });
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getExit = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/payments/getExit`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.text();
      console.log(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getMyBooking = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/${history}/getMyBooking/${status}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (!response.ok) {
        toast.error("Please Login to book");
        return;
      }
      const data = await response.json();
      setBookings(data.reverse());
    } catch (err) {
      toast.error("Error Occurred");
    } finally {
      setShowMenu(false);
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
  }, [status, history]);
  return (
    <div className={style.container}>
      {showBooking ? (
        <>
          <div className={style.filterContainer}>
            {showMenu && (
              <div className={style.menu}>
                <h2>Filter Booking By</h2>
                <button onClick={() => setStatus("All")}>All Booking</button>
                <button onClick={() => setStatus("Open")}>Pending</button>
                <button onClick={() => setStatus("Used")}>Used </button>
                <button onClick={() => setStatus("Cancelled")}>
                  Cancelled
                </button>
              </div>
            )}

            <div>
              <div style={{ flex: "1", fontFamily: "fangsong" }}>
                Booking History
              </div>
              <div
                style={{ borderRadius: "10px", cursor: "pointer" }}
                onClick={() => setShowMenu(!showMenu)}
              >
                <MdFilterAlt color="orange" size={25} />
              </div>
            </div>
            <div className={style.buttons}>
              <button
                onClick={() => setHistory("booking")}
                style={
                  history === "booking"
                    ? { background: "#8e2de2", color: "#fff" }
                    : {}
                }
              >
                Entrance Code
              </button>
              <button
                style={
                  history === "payment"
                    ? { background: "#8e2de2", color: "#fff" }
                    : {}
                }
                onClick={() => setHistory("payment")}
              >
                Exit Code
              </button>
            </div>
          </div>
          <div className={style.div}>
            <div>
              {bookings.length > 0 ? (
                bookings.map((b, index) => (
                  <div
                    key={index}
                    className={style.book}
                    onClick={() => {
                      (getBook(b.id), getBookingQRCode(b.id));
                    }}
                  >
                    <div className={style.info}>
                      <div style={{ color: "black", fontWeight: "bold" }}>
                        {new Date(b.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        <span
                          style={{
                            fontSize: "smaller",
                            margin: "0px",
                            color: "grey",
                          }}
                        >
                          {new Date(b.date).toLocaleTimeString()}
                        </span>
                      </div>
                      {b.status == "Open" && (
                        <div
                          style={{
                            textAlign: "end",
                            color: "#22b814",
                            fontWeight: "bold",
                          }}
                        >
                          {b.status}
                        </div>
                      )}
                      {b.status == "Cancelled" && (
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
                      {b.status == "Used" && (
                        <div
                          style={{
                            textAlign: "end",
                            color: "#ffa600",
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
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  No {history} Found
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className={style.showBooking}>
          <div
            style={{
              width: "max-content",
              position: "absolute",
              top: "0",
              left: "10px",
              zIndex: "10",
            }}
            onClick={() => setShowBooking(true)}
          >
            <MdArrowBack onClick={() => getMyBooking()} color="red" size={24} />
          </div>
          <div className={style.qrCode}>
            <div className={style.code}>
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
                {receipt[0].duration < 0.31 ? (
                  <div className={style.btnContainer}>
                    <button
                      style={{ background: "blue" }}
                      onClick={() => setShowPayment(true)}
                    >
                      Pay
                    </button>
                    <button style={{ background: "red" }}>Cancel</button>
                  </div>
                ) : (
                  <div
                    style={{ display: "flex" }}
                    className={style.btnContainer}
                  >
                    <button
                      style={{ background: "blue", flex: "1" }}
                      onClick={() => setShowPayment(true)}
                    >
                      Pay
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {showPayment && (
            <div className={style.paymentForm}>
              <div
                style={{
                  left: "0",
                  width: "max-content",
                  borderRadius: "50%",
                  border: "1px solid #ffffff",
                  alignContent: "center",
                }}
                onClick={() => setShowPayment(false)}
              >
                <MdClose color="#fff" size={24} />
              </div>
              <div className={style.form}>
                <div>
                  <label>select payment method</label>
                  <select name="bank" id="">
                    <option value=""></option>
                    <option value="cbeBirr"> cbeBirr</option>
                    <option value="teleBirr"> telebirr</option>
                    <option value="Mpesa"> MPESA</option>
                  </select>
                </div>
                <div>
                  <label>Enter account number</label>

                  <input type="number" />
                </div>
                <div>
                  <label>Enter Amount</label>

                  <input type="number" />
                </div>
                <div>
                  <button>Pay</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default History;
