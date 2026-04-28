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
import { Bar, Line } from "react-chartjs-2";
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
  const [areaName, setAreaName] = useState("");
  const [message, setMessage] = useState("No Parking Area found");
  const [gross, setGross] = useState([]);
  const [booked, setBooked] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [areaBooking, setAreaBooking] = useState([]);
  const [bookingMessage, setBookingMessage] = useState("No Booking Found!");
  const [areaId, setAreaId] = useState();
  const [loading, setLoading] = useState(false);
  const [topGrossing, setTopGrossing] = useState([]);
  const [lessGrossing, setLessGrossing] = useState([]);
  const [paymentChart, setPaymentChart] = useState([]);
  const [less, setLess] = useState([]);
  const [top, setTop] = useState([]);
  const [topArea, setTopArea] = useState({});
  const [lessArea, setLessArea] = useState({});
  const [allTime, setAllTime] = useState([]);
  const [showAddGate, setShowAddGate] = useState(false);
  const [addGateInfo, setAddGateInfo] = useState([]);
  const [toggleStatus, setToggleStatus] = useState(false);
  const getAddGateInfo = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingArea/getAddGateInfo/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      setAddGateInfo(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getChart = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/payment/getChartInfo`, {
        method: "GET",
      });
      const data = await response.json();
      setPaymentChart(data);
    } catch (err) {
      toast.error("Please check your network connection");
    }
  };
  const getTopArea = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/payment/getTopArea`, {
        method: "GET",
      });
      const data = await response.json();
      setTopArea(data);
    } catch (err) {
      toast.error("Please check your network connection");
    }
  };
  const getLessArea = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/payment/getLessArea`, {
        method: "GET",
      });
      const data = await response.json();
      setLessArea(data);
    } catch (err) {
      toast.error("Please check your network connection");
    }
  };
  const getLessCount = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/payment/getLessGrossingCount`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setLess(data);
    } catch (err) {
      toast.error("Please check your network connection");
    }
  };
  const getTopCount = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/payment/getTopGrossingCount`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setTop(data);
    } catch (err) {
      toast.error("Please check your network connection");
    }
  };
  const getAll = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/booking/getAllAreaCount`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setAllTime(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const groupedAll = paymentChart.reduce((acc, item) => {
    const day = new Date(item.date).toISOString().split("T")[0];
    acc[day] = (acc[day] || 0) + item.gross;
    return acc;
  }, {});
  const labelsAll = Object.keys(groupedAll)
    .sort()
    .map((day) => {
      const d = new Date(day);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    });
  const dataAll = Object.keys(groupedAll)
    .sort()
    .map((day) => groupedAll[day]);
  const dataSetAll = {
    labels: labelsAll,
    datasets: [
      {
        label: "Payment Gross",
        data: dataAll,
        borderColor: "#0b49f356",
        backgroundColor: "#1e3b8a6c",
        fill: true,
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  };
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
        ticks: {
          callback: function (value, index) {
            const label = this.getLabelForValue(value);
            return label.length > 3 ? label.substring(0, 3) + "…" : label;
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: true,
        },
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
        label: "Pending Bookings",
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
        label: "Cancelled Bookings",
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
  const getTopGrossing = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/payment/getTopGrossingAllTime`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setTopGrossing(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getLessGrossing = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/payment/getLessGrossingAllTime`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setLessGrossing(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  useEffect(() => {
    getAreas();
    getTopGrossing();
    getLessGrossing();
    getChart();
    getLessCount();
    getTopCount();
    getLessArea();
    getTopArea();
    getAll();
  }, []);
  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.div}>
          <div className={style.upperInfo}>
            <div style={{ display: "flex" }} className={style.labels}>
              Total Grossing
              <h3>All Parking Area Info</h3>
            </div>
            <div className={style.numbers}>
              {allTime.length > 0 &&
                allTime.map((top, index) => (
                  <div key={index}>
                    <div className={style.number}>
                      <h4 style={{ margin: "0px" }}>{top.total}</h4>
                      <p>{top.status}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className={style.lines}>
              <Bar
                data={{
                  labels: allTime.map((b) => b.status),
                  datasets: [
                    {
                      label: "Booking History",
                      data: allTime.map((b) => b.total),
                      backgroundColor: [
                        "rgba(59, 130, 246, 0.8)",
                        "rgba(245, 158, 11, 0.8)",
                        "rgba(205, 68, 239, 0.8)",
                      ],
                      borderRadius: 8,
                    },
                  ],
                }}
                options={{
                  indexAxis: "y",
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    x: { stacked: true, display: false },
                    y: { stacked: true, display: false },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
          <div className={style.lower}>
            <Line data={dataSetAll} options={options} />
          </div>
        </div>
        <div className={style.div}>
          <div className={style.upperInfo}>
            <div style={{ display: "flex" }} className={style.labels}>
              Top Grossing <h3>{topArea.name}</h3>
            </div>
            <div className={style.numbers}>
              {top.length > 0 &&
                top.map((top, index) => (
                  <div key={index}>
                    <div className={style.number}>
                      <h4 style={{ margin: "0px" }}>{top.total}</h4>
                      <p>{top.status}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className={style.lines}>
              <Bar
                data={{
                  labels: top.map((b) => b.status),
                  datasets: [
                    {
                      label: "Booking History",
                      data: top.map((b) => b.total),
                      backgroundColor: [
                        "rgba(59, 130, 246, 0.8)",
                        "rgba(245, 158, 11, 0.8)",
                        "rgba(205, 68, 239, 0.8)",
                      ],
                      borderRadius: 8,
                    },
                  ],
                }}
                options={{
                  indexAxis: "y",
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    x: { stacked: true, display: false },
                    y: { stacked: true, display: false },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
          <div className={style.lower}>
            <Line
              data={{
                labels: topGrossing.map((d) => d.date),
                datasets: [
                  {
                    label: "Less Grossing",
                    data: topGrossing.map((d) => d.gross),
                    backgroundColor: "#06f5069a",
                    borderColor: "#02991b",
                    fill: true,
                    pointRadius: 3,
                    tension: 0.3,
                  },
                ],
              }}
              options={{ ...options, maintainAspectRatio: false }}
            />
          </div>
        </div>{" "}
        <div className={style.div}>
          <div className={style.upperInfo}>
            <div style={{ display: "flex" }} className={style.labels}>
              Less Grossing <h3>{lessArea.name}</h3>
            </div>
            <div className={style.numbers}>
              {less.length > 0 &&
                less.map((top, index) => (
                  <div key={index}>
                    <div className={style.number}>
                      <h4 style={{ margin: "0px" }}>{top.total}</h4>
                      <p>{top.status}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className={style.lines}>
              <Bar
                data={{
                  labels: less.map((b) => b.status),
                  datasets: [
                    {
                      label: "Booking History",
                      data: less.map((b) => b.total),
                      backgroundColor: [
                        "rgba(59, 130, 246, 0.8)",
                        "rgba(245, 158, 11, 0.8)",
                        "rgba(205, 68, 239, 0.8)",
                      ],
                      borderRadius: 8,
                    },
                  ],
                }}
                options={{
                  indexAxis: "y",
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    x: { stacked: true, display: false },
                    y: { stacked: true, display: false },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
          <div className={style.lower}>
            <Line
              data={{
                labels: lessGrossing.map((d) => d.date),
                datasets: [
                  {
                    label: "Less Grossing",
                    data: lessGrossing.map((d) => d.gross),
                    backgroundColor: "#f54b02",
                    borderColor: "#990202",
                    fill: true,
                    pointRadius: 5,
                    tension: 0.3,
                  },
                ],
              }}
              options={{ ...options, maintainAspectRatio: false }}
            />
          </div>
        </div>
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
          <div className={style.parkings}>
            {areas.length > 0 ? (
              areas.map((area, index) => (
                <div key={index} className={style.parking}>
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
                    <button
                      onClick={() => {
                        (getInfo(area.id), setAreaName(area.name));
                      }}
                      style={{ background: "blue" }}
                    >
                      View More
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        (setShowAddGate(true),
                          getAddGateInfo(area.id),
                          setAreaName(area.name));
                      }}
                      style={{ background: "orange" }}
                    >
                      Add Gate
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        (setToggleStatus(true), setAreaName(area.name));
                      }}
                      style={{ background: "#f82626" }}
                    >
                      Close
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
          {showAddGate && (
            <div className={style.addGate}>
              <MdClose
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  color: "red",
                  cursor: "pointer",
                }}
                size={30}
                onClick={() => setShowAddGate(false)}
              />
              <div className={style.form}>
                <div className={style.parkingName}>
                  <h3>{areaName}</h3>
                </div>
                <div className={style.parkingLevelInfo}>
                  {addGateInfo.length > 0 ? (
                    <>
                      <div>
                        <p style={{ textAlign: "end" }}>Total Levels :</p>{" "}
                        <p
                          style={{
                            fontSize: "50px",
                            margin: "0px",
                            textAlign: "start",
                          }}
                        >
                          {addGateInfo[0].levels}
                        </p>
                      </div>
                      <div>
                        <p style={{ textAlign: "end" }}>Total Spots : </p>{" "}
                        <p
                          style={{
                            fontSize: "50px",
                            margin: "0px",
                            textAlign: "start",
                          }}
                        >
                          {addGateInfo[0].spots}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div>Parking Has No Levels</div>
                  )}
                </div>
                <form className={style.dataForm}>
                  <div>Fill Gate Info</div>
                  <div>
                    <input type="text" placeholder="Enter Gate Code" />
                    <input type="text" placeholder="Enter Gate Password" />
                    <select name="gateType" id="">
                      <option value="">select Gate Type</option>
                      <option value="Entrance">Entrance</option>
                      <option value="Exit">Exit</option>
                    </select>
                  </div>
                  <div>
                    <button>Add gate</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {toggleStatus && (
            <div className={style.closeOrOpen}>
              <MdClose
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  color: "red",
                  cursor: "pointer",
                }}
                size={30}
                onClick={() => setToggleStatus(false)}
              />
              <div className={style.confirm}>
                <div>
                  <h3 style={{ flex: "1" }}>
                    Area You Sure You want To close{" "}
                    <span style={{ color: "blue" }}>{areaName}</span>
                  </h3>
                </div>
                <div>
                  <button style={{ background: "#3acc0e" }}>Yes</button>
                  <button style={{ background: "#ec0303" }}>No</button>
                </div>
              </div>
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
                            {areaName}
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
