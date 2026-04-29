import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import CalendarHeatMap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Doughnut } from "react-chartjs-2";
import toast from "react-hot-toast";
import { MdClose, MdPerson } from "react-icons/md";
import { Base_URL } from "../../config";
import style from "../styles/ManageUser.module.css";
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
function ManageUser() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("No User Registered Yet!");
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [used, setUsed] = useState({});
  const [cancelled, setCancelled] = useState({});
  const [total, setTotal] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [usedBookings, setUsedBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [counts, setCounts] = useState({});
  const [heatData, setHeatData] = useState([]);
  const [goldenUserBookings, setGoldenUserBookings] = useState([]);
  const [goldenUser, setGoldenUser] = useState([]);
  const getGoldenUserInfo = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/users/getGoldenUser`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setGoldenUser(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getGoldenUserBookingHistory = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/getGoldenUserBookingHistory`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      setGoldenUserBookings(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getGoldenUser = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/payment/getGoldenUser`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setHeatData(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getActiveUsers = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/getActiveBookingUsers`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setCounts(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const data = [
    {
      status: "Active",
      number: 200,
    },
    {
      status: "blocked",
      number: 300,
    },
  ];
  const getUsers = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/users/getUsers`, {
        method: "GET",
      });
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const searchUser = async (search) => {
    if (search.length == 0) {
      getUsers();
      return;
    }
    try {
      const response = await fetch(`${Base_URL}/api/users/search/${search}`, {
        method: "GET",
      });
      const data = await response.json();
      if (data.length == 0) {
        setMessage(`User ${search} Not Found `);
      }
      setUsers(data);
    } catch (err) {
      toast.error("Error Searching User");
    }
  };
  const groupedAll = heatData.reduce((acc, item) => {
    const day = new Date(item.date).toISOString().split("T")[0];
    acc[day] = (acc[day] || 0) + item.count;
    return acc;
  }, {});
  const result = Object.entries(groupedAll).map(([date, count]) => ({
    date,
    count,
  }));
  const getUserHistory = async (id) => {
    try {
      const response = await fetch(`${Base_URL}/api/booking/getHistory/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setTotal(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getUsedHistory = async (id) => {
    try {
      const response = await fetch(`${Base_URL}/api/booking/getUsed/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUsed(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getCancelledHistory = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/getCancelled/${id}`,
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
  const getUser = async (id) => {
    try {
      const response = await fetch(`${Base_URL}/api/users/getUser/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setSelectedUser(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getAllUserBookings = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/getAllUserBookings/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getAllUsedBookings = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/getAllUsedBookings/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      setUsedBookings(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getAllCancelledBookings = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/getAllCancelledBookings/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      setCancelledBookings(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getUserInfo = async (id) => {
    try {
      getCancelledHistory(id);
      getUsedHistory(id);
      getUserHistory(id);
      getUser(id);
      getAllCancelledBookings(id);
      getAllUsedBookings(id);
      getAllUserBookings(id);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  useEffect(() => {
    getUsers();
    getActiveUsers();
    getGoldenUser();
    getGoldenUserBookingHistory();
    getGoldenUserInfo();
  }, []);
  return (
    <div className={style.container}>
      <div className={style.boxContainer}>
        <div className={style.activity}>
          <div className={style.div}>
            <div>
              <div style={{ width: "80px", height: "80px" }}>
                <Doughnut
                  data={{
                    labels: data.map((d) => d.status),
                    datasets: [
                      {
                        label: "count",
                        data: [50, 100],
                        backgroundColor: ["#0a83e7", "#ededed"],
                        BsBorderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    // rotation: -90,
                    // circumference: 180,
                    // cutout: "70%",
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: true,
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <strong>Daily Users</strong>
                <p>
                  5% of the system users booked 1000 parking booking at 10
                  different parking areas
                </p>
              </div>
            </div>
          </div>
          <div className={style.div}>
            <div>
              <div style={{ width: "80px", height: "80px" }}>
                <Doughnut
                  data={{
                    labels: data.map((d) => d.status),
                    datasets: [
                      {
                        label: "count",
                        data: [counts.thisWeek, counts.total],
                        backgroundColor: ["#f8972089", "#ededed"],
                        BsBorderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: true,
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <strong>Weekly Users</strong>
                <p>
                  5% of the system users booked 1000 parking booking at 10
                  different parking areas
                </p>
              </div>
            </div>
          </div>
          <div className={style.div}>
            <div>
              <div style={{ width: "80px", height: "80px" }}>
                <Doughnut
                  data={{
                    labels: data.map((d) => d.status),
                    datasets: [
                      {
                        label: "count",
                        data: [counts.thisMonth, counts.total],
                        backgroundColor: ["#ededed", "#51f610ad"],
                        BsBorderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: true,
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <strong>Monthly Users</strong>
                <p>
                  5% of the system users booked 1000 parking booking at 10
                  different parking areas
                </p>
              </div>
            </div>
          </div>
          <div className={style.div}>
            <div>
              <div style={{ width: "80px", height: "80px" }}>
                <Doughnut
                  data={{
                    labels: data.map((d) => d.status),
                    datasets: [
                      {
                        label: "count",
                        data: [counts.total, counts.total],
                        backgroundColor: ["#e70ad5", "#ededed"],
                        BsBorderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: true,
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <strong>Annual Users</strong>
                <p>
                  5% of the system users booked 1000 parking booking at 10
                  different parking areas
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.topUsers}>
          <div className={style.leftUser}>
            <div className={style.goldenProfile}>
              <MdPerson size={100} />
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  color: "#dc7806",
                }}
              >
                Top User
              </div>
            </div>
            <div className={style.goldenInfo}>
              {goldenUser.length > 0 &&
                goldenUser.map((u, index) => (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: "0",
                      display: "grid",
                    }}
                    key={index}
                  >
                    <div>
                      {u.firstName} {u.lastName}
                    </div>
                    <div>{u.email}</div>
                    <div>
                      <button>send email</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={style.heatMapAndChart}>
            <div className={style.doughnut}>
              <div className={style.labels}>
                {goldenUserBookings.length > 0 &&
                  goldenUserBookings.map((b, index) => (
                    <div key={index}>
                      <h2>{b.total}</h2>
                      <p>{b.status}</p>
                    </div>
                  ))}
              </div>
              <div className={style.theChart}>
                <Doughnut
                  data={{
                    labels: goldenUserBookings.map((d) => d.status),
                    datasets: [
                      {
                        label: "count",
                        data: goldenUserBookings.map((d) => d.total),
                        backgroundColor: ["#0a83e7", "#10deed", "#e51ef0"],
                        BsBorderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    rotation: -90,
                    circumference: 180,
                    cutout: "70%",
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: true,
                  }}
                />
              </div>
            </div>
            <div className={style.heatMap}>
              <CalendarHeatMap
                startDate={new Date("2026-04-01")}
                endDate={new Date("2026-12-31")}
                values={result}
                gutterSize={1}
                horizontal={true}
                showMonthLabels={true}
                classForValue={(value) => {
                  if (!value || value.count === 0) return style["color-empty"];
                  if (value.count > 0) return style["color-selected"];
                  return style["color-scale-3"];
                }}
                tooltipDataAttrs={(value) => {
                  if (!value || !value.date) return null;
                  return {
                    "data-tip": `${value.date}: ${value.count} bookings`,
                  };
                }}
              />
              <select
                style={{
                  padding: "0px",
                  height: "max-content",
                  borderRadius: "0px",
                  marginTop: "5px",
                  border: "1px solid #ededed",
                  color: "grey",
                }}
                name="date"
                id=""
              >
                <option value="">2026</option>
                <option value="">2025</option>
                <option value="">2024</option>
                <option value="">2023</option>
                <option value="">2022</option>
                <option value="">2021</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={style.userContainer}>
        <div className={style.searchContainer}>
          <input
            type="text"
            placeholder="search user by Email,Fist Name or Last Name"
            onChange={(e) => searchUser(e.target.value)}
          />
        </div>
        <div className={style.users}>
          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                onClick={() => {
                  (setShowUserInfo(true), getUserInfo(user.id));
                }}
                key={index}
                className={style.user}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg , #0ecf4f, #0ecfc5, #039132",
                  }}
                  className={style.profile}
                >
                  <MdPerson size={24} color="#fff" />
                </div>
                <div className={style.info}>
                  {user.firstName} {user.lastName}
                </div>
                <div className={style.info}>{user.email}</div>
                <div className={style.info}>{user.userLevel}</div>
                <div className={style.info}>
                  {user.status == "Active" && (
                    <strong
                      style={{
                        background: "#0dee117d",
                        padding: "0.5em 1em",
                        borderRadius: "10px",
                        color: "#00b816",
                      }}
                    >
                      {user.status}
                    </strong>
                  )}
                  {user.status == "Blocked" && (
                    <strong
                      style={{
                        background: "#ee0d0d7d",
                        padding: "0.5em 1em",
                        borderRadius: "10px",
                        color: "#b80000",
                      }}
                    >
                      {user.status}
                    </strong>
                  )}
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
              <h2>{message}</h2>
            </div>
          )}
        </div>
      </div>
      {showUserInfo && (
        <div className={style.userInfoContainer}>
          <div className={style.userInfo}>
            <div
              style={{
                position: "absolute",
                right: "-5px",
                top: "-15px",
              }}
            >
              <MdClose
                onClick={() => setShowUserInfo(false)}
                size={20}
                color="red"
              />
            </div>
            <div className={style.desc}>
              <div className={style.userProfile}>
                <div className={style.profile}>
                  <MdPerson size={150} />
                </div>
                <div
                  className={style.infos}
                  style={{ textAlign: "center", display: "grid", gap: "2px" }}
                >
                  <div>
                    {" "}
                    {selectedUser.firstName} {selectedUser.lastName}
                  </div>
                  <div> {selectedUser.email}</div>
                  <div> {selectedUser.userLevel} level user</div>
                  <div
                    style={{
                      textAlign: "center",
                      border: "none",
                      alignContent: "center",
                    }}
                  >
                    {" "}
                    {selectedUser.status}
                  </div>
                </div>
              </div>
              <div className={style.bookingInfo}>
                <div className={style.bookingStatus}>
                  <div>
                    <h2 style={{ fontSize: "medium" }}>Total Bookings</h2>
                  </div>
                  <div>{total.total} total bookings</div>
                  <div>More Infos</div>
                  <div>
                    <div>{total.thisWeek} this week</div>
                    <div>{total.thisMonth} this month</div>
                  </div>
                </div>
                <div className={style.bookingStatus}>
                  <div>
                    <h2 style={{ fontSize: "medium" }}>Used Bookings</h2>
                  </div>
                  <div>{used.total} total bookings used</div>
                  <div>More Info</div>
                  <div>
                    <div>{used.thisWeek} this week</div>
                    <div>{used.thisMonth} this month</div>
                  </div>
                </div>
                <div className={style.bookingStatus}>
                  <div>
                    <h2 style={{ fontSize: "medium" }}>Cancelled Bookings</h2>
                  </div>
                  <div>{cancelled.total} total cancelled</div>
                  <div>More Info</div>
                  <div>
                    <div>{cancelled.thisWeek} this week</div>
                    <div>{cancelled.thisMonth} this month</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.userBookings}>
              <div className={style.div}>
                <div style={{ color: "blue" }} className={style.label}>
                  All Bookings
                </div>
                <div className={style.display}>
                  {bookings.length > 0 ? (
                    bookings.map((book, index) => (
                      <div key={index} className={style.booking}>
                        <div>
                          {new Date(book.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div>{book.name}</div>
                        <div>Level {book.level}</div>

                        <div>{book.spot}</div>
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
                      No Bookings Found
                    </div>
                  )}
                </div>
              </div>
              <div className={style.div}>
                <div style={{ color: "green" }} className={style.label}>
                  Used Bookings
                </div>
                <div className={style.display}>
                  {usedBookings.length > 0 ? (
                    usedBookings.map((book, index) => (
                      <div key={index} className={style.booking}>
                        <div>
                          {new Date(book.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div>{book.name}</div>
                        <div>Level {book.level}</div>

                        <div>{book.spot}</div>
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
                      No Used Bookings Found
                    </div>
                  )}
                </div>
              </div>
              <div className={style.div}>
                <div style={{ color: "red" }} className={style.label}>
                  Cancelled Bookings
                </div>
                <div className={style.display}>
                  {cancelledBookings.length > 0 ? (
                    cancelledBookings.map((book, index) => (
                      <div key={index} className={style.booking}>
                        <div>
                          {new Date(book.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div>{book.name}</div>
                        <div>Level {book.level}</div>

                        <div>{book.spot}</div>
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
                      No Cancelled Booking Found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ManageUser;
