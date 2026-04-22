import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdLocalParking } from "react-icons/md";
import { Base_URL } from "../../config";
import style from "../styles/ManageParkingArea.module.css";
function ManageParkingArea() {
  const [areas, setAreas] = useState([]);
  const [message, setMessage] = useState("No Parking Area found");
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
              <div key={index} className={style.parking}>
                <div style={{ paddingLeft: "1em", textAlign: "start" }}>
                  <MdLocalParking color="green" />
                </div>
                <div>{area.name}</div>
                <div>
                  {area.status == "Closed" && (
                    <button style={{ background: "red" }}>{area.status}</button>
                  )}
                  {area.status == "Open" && (
                    <button
                      style={{
                        background: "#03e20a86",
                        boxShadow: "0px 0px 10px #03e20a86",
                      }}
                    >
                      {area.status}
                    </button>
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
    </div>
  );
}
export default ManageParkingArea;
