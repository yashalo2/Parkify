import {
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
import { Bar, Line } from "react-chartjs-2";
import toast from "react-hot-toast";
import { MdArrowForward } from "react-icons/md";
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
  const getChart = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/payment/getChartInfo`, {
        method: "GET",
      });
      const data = await response.json();
      setPaymentChart(data);
      console.log(data);
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
  const formDate = (value) => {
    const data = new Date(value);
    return data.toDateString();
  };
  const chartData = {};
  paymentChart.forEach(({ gross, date }) => {
    const dateT = formDate(date);
    if (!chartData[dateT]) {
      chartData[dateT] = { gross: gross };
    }
    chartData[dateT].gross += gross;
  });
  const realChartData = Object.values(chartData).sort((a, b) => {
    new Date(a.date) - new Date(b.date);
  });
  const labels = () => {
    formDate(paymentChart);
  };
  const dataSet = {
    labels: paymentChart.map((d) => new Date(d.date).toDateString()),
    datasets: [
      {
        label: "Payment Gross",
        data: paymentChart.map((d) => d.gross),
        borderColor: "#e30a769e",
        backgroundColor: "#e30a769e",
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
  };
  booked.forEach(({ gross, date }) => {
    const dateT = formDate(date);
    if (!chartData[dateT]) {
      chartData[dateT] = { gross: dateT };
    }

    chartData[dateT] += gross;
  });
  const bookedChartData = Object.values(chartData).sort((a, b) => {
    new Date(a.date) - new Date(b.date);
  });
  const label = bookedChartData.map((d) => d.dateT);
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
  useEffect(() => {
    getChart();
    getBooked();
    getCancelled();
    getAvailableSpots();
    getReservedSpots();
    getOccupiedSpots();
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
              data={dataSet}
              options={{ ...options, maintainAspectRatio: true }}
            />
          </div>
          <div className={style.moreBottom} style={{ alignContent: "end" }}>
            <Line
              data={dataSet}
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
                options={{ maintainAspectRatio: false }}
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
                options={{ maintainAspectRatio: false }}
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
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.lower}>
            <div className={style.label}>
              <div style={{ flex: "1", textAlign: "start" }}>
                Recent Payment
              </div>
              <div style={{ flex: "1", textAlign: "end" }}>
                <MdArrowForward style={{ cursor: "pointer" }} />
              </div>
            </div>
            <div className={style.display}></div>
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
                style={{ background: "#fff" }}
                className={`${style.topGross} ${style.parkings}`}
              >
                <div
                  style={{ width: "60px", height: "60px", background: "none" }}
                >
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={logo}
                    alt=""
                  />
                </div>
                <div></div>
                <div></div>
              </div>
              <div className={style.lessGross}>
                <div style={{ width: "60px", height: "60px" }}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={logo}
                    alt=""
                  />
                </div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div>
              <Line
                data={dataSet}
                options={{ ...options, maintainAspectRatio: true }}
              />
            </div>
            <div>
              <Line
                data={dataSet}
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
