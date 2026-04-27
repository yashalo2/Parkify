import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import toast from "react-hot-toast";
import { MdClose, MdLocalParking, MdPerson } from "react-icons/md";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Base_URL } from "../../config";
import style from "../styles/ManageParkingArea.module.css";
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function ManageParkingArea() {
  const [areas, setAreas] = useState([]);
  const [position, setPosition] = useState([
    9.045140273532223, 38.74912261962891,
  ]);
  const [message, setMessage] = useState("No Parking Area found");
  const [gross, setGross] = useState([]);
  const [booked, setBooked] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [areaBooking, setAreaBooking] = useState([]);
  const [bookingMessage, setBookingMessage] = useState("No Booking Found!");
  const [areaId, setAreaId] = useState();
  const [loading, setLoading] = useState(false);
  const search = async (search) => {
    if (search.length == 0) {
      getAreas();
      return;
    }
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingArea/search/${search}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      if (data.length == 0) {
        setMessage(`Parking ${search} Not Found `);
      }
      setAreas(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getAreaInfo = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingArea/getAreaCoords/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      const lat = data[0].lat;
      const lon = data[0].lon;
      const coords = [lat, lon];
      setPosition(coords);
      setAreaId(id);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getAreas = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingArea/getManageArea`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      setAreas(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };

  const getAreaGross = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/payment/getAreaGross/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      setGross(data);
    } catch (err) {
      toast.error("Error Fetching Area Gross");
    }
  };
  const groupBooked = gross.reduce((acc, item) => {
    const day = new Date(item.date).toISOString().split("T")[0];
    acc[day] = (acc[day] || 0) + item.gross;
    return acc;
  }, {});
  const labels = Object.keys(groupBooked)
    .sort()
    .map((day) => {
      const d = new Date(day);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    });
  const data = Object.keys(groupBooked)
    .sort()
    .map((day) => groupBooked[day]);
  const dataset = {
    labels,
    datasets: [
      {
        label: "Payment Gross",
        data: data,
        borderColor: "#00a300de",
        backgroundColor: "#0bc2058a",
        fill: true,
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

  const getAreaBooking = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/getAreaBooking/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      setBooked(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getAreaCanceledBooking = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/getAreaCancelledBooking/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      setCancelled(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getAllAreaBooking = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/getAllAreaBooking/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      setAreaBooking(data.reverse());
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getInfo = async (id) => {
    setLoading(true);
    setShowInfo(true);

    try {
      (getAreaInfo(id),
        getAreaGross(id),
        getAreaBooking(id),
        getAllAreaBooking(id),
        getAreaCanceledBooking(id));
    } catch (err) {
      toast.error("Error Occurred");
    } finally {
      setLoading(true);
    }
  };
  const group = booked.reduce((acc, item) => {
    const day = new Date(item.date).toISOString().split("T")[0];
    acc[day] = (acc[day] || 0) + item.gross;
    return acc;
  }, {});
  const bookedLabels = Object.keys(group)
    .sort()
    .map((day) => {
      const d = new Date(day);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    });
  const bookedData = Object.keys(group)
    .sort()
    .map((day) => group[day]);
  const bookedDataSet = {
    labels: bookedLabels,
    datasets: [
      {
        label: "Payment Gross",
        data: bookedData,
        borderColor: "#0483009a",
        backgroundColor: "#0307ce6c",
        fill: true,
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  };
  const groupCancelled = cancelled.reduce((acc, item) => {
    const day = new Date(item.date).toISOString().split("T")[0];
    acc[day] = (acc[day] || 0) + item.gross;
    return acc;
  }, {});
  const cancelledLabels = Object.keys(groupCancelled)
    .sort()
    .map((day) => {
      const d = new Date(day);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    });
  const cancelledData = Object.keys(groupCancelled)
    .sort()
    .map((day) => groupCancelled[day]);
  const cancelledDataSet = {
    labels: cancelledLabels,
    datasets: [
      {
        label: "Payment Gross",
        data: cancelledData,
        borderColor: "#830000",
        backgroundColor: "#ce03036c",
        fill: true,
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  };
  const searchAreaBookings = async (email) => {
    if (email.length == 0) {
      getAllAreaBooking(areaId);
      return;
    }
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/searchAreaBooking/${areaId}/${email}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      setAreaBooking(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  useEffect(() => {
    getAreas();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.top}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={style.bottom}>
        <div className={style.searchContainer}>
          <input
            type="text"
            onChange={(e) => search(e.target.value)}
            placeholder="search parking by name"
          />
        </div>
        <div className={style.display}>
          {areas.length > 0 ? (
            areas.map((area, index) => (
              <div
                key={index}
                className={style.parking}
                onClick={() => getInfo(area.id)}
              >
                <div style={{ paddingLeft: "1em", textAlign: "start" }}>
                  <MdLocalParking color="green" />
                </div>
                <div>{area.name}</div>
                <div>
                  {area.status == "Closed" && (
                    <div style={{ background: "red" }}>{area.status}</div>
                  )}
                  {area.status == "Open" && (
                    <div
                      style={{
                        background: "#03e20a9a",
                        boxShadow: "0px 0px 10px #03e20a94",
                        color: "#007000",
                        cursor: "default",
                      }}
                    >
                      {area.status}
                    </div>
                  )}
                </div>
                <div className={style.text}>{area.name}</div>
                <div className={style.text}>Levels {area.levels}</div>

                <div>
                  <button style={{ background: "blue" }}>Add Level</button>
                </div>
                <div>
                  <button style={{ background: "orange" }}>
                    Add Entrance Gate
                  </button>
                </div>
                <div>
                  <button style={{ background: "orange" }}>
                    Add Exit Gate
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
      {showInfo && (
        <>
          {loading ? (
            <div className={style.infoContainer}>
              <MdClose
                onClick={() => setShowInfo(false)}
                color="red"
                size={24}
                style={{ position: "absolute", zIndex: "3" }}
              />
              <div className={style.parkingInfo}>
                <div className={style.map}>
                  <MapContainer
                    center={position}
                    zoom={13}
                    style={{
                      height: "100%",
                      width: "100%",
                      zIndex: "1",
                    }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position}>
                      <Popup>
                        <div style={{ display: "grid", gap: "5px" }}>
                          <button
                            style={{ background: "none", border: "none" }}
                          >
                            Parking Area Location
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <div className={style.chart}>
                  <Line data={dataset} options={options} />
                </div>
                <div className={style.more}>
                  <div>
                    <Line data={bookedDataSet} options={options} />
                  </div>
                  <div>
                    <Line data={cancelledDataSet} options={options} />
                  </div>
                </div>
              </div>
              <div className={style.recentPayment}>
                <div className={style.searchContainer}>
                  <input
                    type="text"
                    placeholder="search by email"
                    onChange={(e) => searchAreaBookings(e.target.value)}
                  />
                </div>
                <div className={style.displayContainer}>
                  {areaBooking.length > 0 ? (
                    areaBooking.map((booking, index) => (
                      <div key={index} className={style.booking}>
                        <div>
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              background:
                                "linear-gradient(135deg,#45e615,#15e67d,#15e6dc,#1592e6)",
                              borderRadius: "50%",
                              marginLeft: "10px",
                              color: "#fff",
                            }}
                          >
                            <MdPerson size={25} />
                          </div>
                        </div>
                        <div>{booking.email}</div>
                        <div>
                          {new Date(booking.bookingDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </div>
                        {booking.status == "Open" && (
                          <div style={{ color: "#ca8b03" }}>
                            {booking.status}
                          </div>
                        )}
                        {booking.status == "Used" && (
                          <div style={{ color: "#03ca13" }}>
                            {booking.status}
                          </div>
                        )}
                        {booking.status == "Cancelled" && (
                          <div style={{ color: "#ca0303" }}>
                            {booking.status}
                          </div>
                        )}
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
                      {bookingMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className={style.infoContainer} style={{ background: "back" }}>
              <h1>Hello</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default ManageParkingArea;
