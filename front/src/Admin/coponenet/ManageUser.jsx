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
  useEffect(() => {
    getUsers();
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
                        data: data.map((d) => d.number),
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
                        data: data.map((d) => d.number),
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
                        data: [300, 150],
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
        <div className={style.topUsers}></div>
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
                onClick={() => setShowUserInfo(true)}
                key={index}
                className={style.user}
              >
                <div className={style.profile}>
                  <MdPerson size={25} />
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
                  <div> Yasin shalo</div>
                  <div> yasin2ashalo@gmail.com</div>
                  <div> Silver level</div>
                  <div
                    style={{
                      textAlign: "center",
                      border: "none",
                      alignContent: "center",
                    }}
                  >
                    {" "}
                    Active
                  </div>
                </div>
              </div>
              <div className={style.bookingInfo}>
                <div className={style.bookingStatus}>
                  <div>
                    <h2>Bookings</h2>
                  </div>
                  <div>100 total bookings</div>
                  <div>Currently Booked At</div>
                  <div>
                    <div>JID Parking Log</div>
                    <div>Spot A3 at 12/23/2026 18:31 AM</div>
                  </div>
                </div>
                <div className={style.bookingStatus}>
                  <div>
                    <h2>Used Bookings</h2>
                  </div>
                  <div>90 total bookings used</div>
                  <div>This week</div>
                  <div>
                    <div>10 bookings used</div>
                  </div>
                </div>
                <div className={style.bookingStatus}>
                  <div>
                    <h2>Cancelled Bookings</h2>
                  </div>
                  <div>10 total bookings cancelled</div>
                  <div>This week</div>
                  <div>
                    <div>5 bookings cancelled</div>
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
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                </div>
              </div>
              <div className={style.div}>
                <div style={{ color: "green" }} className={style.label}>
                  Used Bookings
                </div>
                <div className={style.display}>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                </div>
              </div>
              <div className={style.div}>
                <div style={{ color: "red" }} className={style.label}>
                  Cancelled Bookings
                </div>
                <div className={style.display}>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
                  <div className={style.booking}>
                    <div>12/12/2026</div>
                    <div>JID Parkings</div>
                    <div>Level 3</div>

                    <div>Spots A4</div>
                  </div>
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
