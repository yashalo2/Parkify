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
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import toast from "react-hot-toast";
import { MdArrowBack, MdArrowForward, MdPerson } from "react-icons/md";
import logo from "../../assets/logo.png";
import { Base_URL } from "../../config";
import style from "../styles/AdminPage.module.css";
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

function AdminPage() {
  const [paymentChart, setPaymentChart] = useState([]);
  const [booked, setBooked] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [available, setAvailable] = useState([]);
  const [reserved, setReserved] = useState([]);
  const [occupied, setOccupied] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [activeArea, setActiveArea] = useState([]);
  const [activeLot, setActiveLot] = useState([]);
  const [topGrossing, setTopGrossing] = useState([]);
  const [lessGrossing, setLessGrossing] = useState([]);
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
  const getBooked = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/getPendingBookings`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setBooked(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getCancelled = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/getCancelledBookings`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setCancelled(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const groupBooked = booked.reduce((acc, item) => {
    const day = new Date(item.date).toISOString().split("T")[0];
    acc[day] = (acc[day] || 0) + item.gross;
    return acc;
  }, {});
  const bookedLabels = Object.keys(groupBooked)
    .sort()
    .map((day) => {
      const d = new Date(day);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    });
  const bookedData = Object.keys(groupBooked)
    .sort()
    .map((day) => groupBooked[day]);
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
  const grouped = paymentChart.reduce((acc, item) => {
    const day = new Date(item.date).toISOString().split("T")[0];
    acc[day] = (acc[day] || 0) + item.gross;
    return acc;
  }, {});
  const labels = Object.keys(grouped)
    .sort()
    .map((day) => {
      const d = new Date(day);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    });
  const data = Object.keys(grouped)
    .sort()
    .map((day) => grouped[day]);
  const dataSet = {
    labels,
    datasets: [
      {
        label: "Payment Gross",
        data: data,
        borderColor: "#0b49f356",
        backgroundColor: "#1e3b8a6c",
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
  };
  const bookedSets = {
    labels: bookedLabels,
    datasets: [
      {
        label: "Booked Parkings",
        data: bookedData,
        borderColor: "#08ba08",
        backgroundColor: "#16cb28ab",
        fill: true,
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  };
  const cancelledSets = {
    labels: cancelledLabels,
    datasets: [
      {
        label: "Cancelled Bookings",
        data: cancelledData,
        borderColor: "#f30b0b",
        backgroundColor: "#f52715a1",
        fill: true,
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  };
  const getAvailableSpots = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingArea/getAvailableSpots`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setAvailable(data);
    } catch (err) {
      toast.error("Error Loading Page");
    }
  };
  const getReservedSpots = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingArea/getReservedSpots`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setReserved(data);
    } catch (err) {
      toast.error("Error Loading Page");
    }
  };
  const getOccupiedSpots = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingArea/getOccupiedSpots`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setOccupied(data);
    } catch (err) {
      toast.error("Error Loading Page");
    }
  };
  const getActiveArea = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingArea/getActiveParkingArea`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setActiveArea(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getActiveParkingLot = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingLots/getActiveParkingLot`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setActiveLot(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getTopGrossing = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/payment/getTopGrossing`, {
        method: "GET",
      });
      const data = await response.json();
      setTopGrossing(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getLessGrossing = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/payment/getLessGrossing`, {
        method: "GET",
      });
      const data = await response.json();
      setLessGrossing(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  useEffect(() => {
    getChart();
    getBooked();
    getCancelled();
    getAvailableSpots();
    getReservedSpots();
    getOccupiedSpots();
    getActiveArea();
    getActiveParkingLot();
    getTopGrossing();
    getLessGrossing();
  }, []);
  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.chart}>
          <Line
            data={dataSet}
            options={{ ...options, maintainAspectRatio: false }}
          />
        </div>
        <div className={style.more}>
          <div className={style.moreTop} style={{ alignContent: "end" }}>
            <Line
              data={bookedSets}
              options={{ ...options, maintainAspectRatio: true }}
            />
          </div>
          <div className={style.moreBottom} style={{ alignContent: "end" }}>
            <Line
              data={cancelledSets}
              options={{ ...options, maintainAspectRatio: true }}
            />
          </div>
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.left}>
          <div className={style.upper}>
            <div>
              <Bar
                data={{
                  labels: available.map((d) => d.area),
                  datasets: [
                    {
                      label: "Available Spots",
                      data: available.map((d) => d.number),
                      backgroundColor: "#02f5a4ff",
                      borderColor: "#000000ff",
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        callback: function (value, index) {
                          const label = this.getLabelForValue(value);
                          return label.length > 3
                            ? label.substring(0, 3) + "…"
                            : label;
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
                }}
              />
            </div>
            <div>
              <Bar
                data={{
                  labels: reserved.map((d) => d.area),
                  datasets: [
                    {
                      label: "Reserved Spots",
                      data: reserved.map((d) => d.number),
                      backgroundColor: "rgb(245, 160, 2)",
                      borderColor: "#000000ff",
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        callback: function (value, index) {
                          const label = this.getLabelForValue(value);
                          return label.length > 3
                            ? label.substring(0, 3) + "…"
                            : label;
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
                }}
              />
            </div>
            <div>
              <Bar
                data={{
                  labels: occupied.map((d) => d.area),
                  datasets: [
                    {
                      label: "Occupied Spots",
                      data: occupied.map((d) => d.number),
                      backgroundColor: "rgb(245, 2, 2)",
                      borderColor: "#000000ff",
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        callback: function (value, index) {
                          const label = this.getLabelForValue(value);
                          return label.length > 3
                            ? label.substring(0, 3) + "…"
                            : label;
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
                }}
              />
            </div>
          </div>
        </div>
        <div className={style.right}>
          <div
            className={`${style.lower} ${fullScreen ? style.fullScreen : ""}`}
          >
            <div className={style.label}>
              <div style={{ flex: "1", textAlign: "start" }}>
                Recent Payment
              </div>
              <div style={{ flex: "1", textAlign: "end" }}>
                {fullScreen ? (
                  <MdArrowBack
                    onClick={() => setFullScreen(!fullScreen)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <MdArrowForward
                    onClick={() => setFullScreen(!fullScreen)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>
            <div className={style.display}>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
              <div className={style.recent}>
                <div>
                  <div
                    style={{
                      width: "calc(40px - 0.3em)",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      alignContent: "center",
                      justifyItems: "end",
                      paddingLeft: "0.3em",
                    }}
                  >
                    <MdPerson size={30} />
                  </div>
                </div>
                <div>yasinshalo.astu@gmail.com</div>
                <div>Parking Area</div>
                <div>Level 2</div>
                <div>spot A20</div>
                <div>120 birr/r</div>
                <div>10hr</div>
                <div>1200 birr</div>
              </div>
            </div>
          </div>
          <div className={style.rightMore}>
            <div className={style.systemInfo}>
              <div className={style.parkings}>
                <div
                  style={{
                    height: "60px",
                    background: "#fff",
                    alignContent: "center",
                  }}
                >
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={logo}
                    alt=""
                  />
                </div>
                <div>
                  <p>Parkin Areas</p>
                  <p>20</p>
                </div>
                <div>
                  <p>Total Spots</p>
                  <p>200</p>
                </div>
              </div>
              <div
                style={{ background: "#fff", display: "flex", gap: "5px" }}
                className={style.topGross}
              >
                <div
                  style={{
                    height: "80px",
                    background: "none",
                    boxShadow: "none",
                  }}
                >
                  <Doughnut
                    data={{
                      labels: activeArea.map((d) => d.status),
                      datasets: [
                        {
                          label: "count",
                          data: activeArea.map((d) => d.number),
                          backgroundColor: ["red", "blue"],
                          BsBorderWidth: 1,
                          borderRadius: 5,
                          spacing: 2,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
                <div
                  className={style.description}
                  style={{ boxShadow: "none" }}
                >
                  <div style={{ width: "100%" }}>Parking Area Status Chart</div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    <p style={{ fontSize: "smaller", margin: "0" }}>
                      30 Parking Areas Are Giving service to users andd 40 are
                      out of service
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", gap: "5px" }}
                className={style.lessGross}
              >
                <div
                  className={style.description}
                  style={{ boxShadow: "none" }}
                >
                  <div
                    style={{ width: "calc(100% - 1em)", paddingLeft: "1em" }}
                  >
                    Parking Spot Status Chart
                  </div>

                  <div
                    style={{
                      width: "calc(100% - 1em)",
                      display: "flex",
                      paddingLeft: "1em",
                    }}
                  >
                    <p style={{ fontSize: "smaller", margin: "0" }}>
                      <span style={{ color: "red" }}>25 level</span> across all
                      parking areas are out of service while{" "}
                      <span style={{ color: "blue" }}>30 parking level </span>
                      are active and giving service
                    </p>
                  </div>
                </div>

                <div style={{ height: "80px", justifyItems: "end" }}>
                  <Doughnut
                    data={{
                      labels: activeLot.map((d) => d.status),
                      datasets: [
                        {
                          label: "count",
                          data: activeLot.map((d) => d.number),
                          backgroundColor: ["blue", "red"],
                          BsBorderWidth: 1,
                          borderRadius: 5,
                          spacing: 2,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <Line
                data={{
                  labels: topGrossing.map((d) => d.date),
                  datasets: [
                    {
                      label: "Gross",
                      data: topGrossing.map((d) => d.gross),
                      backgroundColor: "#02f5a4ff",
                      borderColor: "rgb(2, 245, 2)",
                      fill: true,
                    },
                  ],
                }}
                options={{ ...options, maintainAspectRatio: true }}
              />
            </div>
            <div>
              <Line
                data={{
                  labels: lessGrossing.map((d) => d.date),
                  datasets: [
                    {
                      label: "Gross",
                      data: lessGrossing.map((d) => d.gross),
                      backgroundColor: "#f54b02",
                      borderColor: "#990202",
                      fill: true,
                    },
                  ],
                }}
                options={{ ...options, maintainAspectRatio: true }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
