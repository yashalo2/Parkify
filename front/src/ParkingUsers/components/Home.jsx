import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import style from "../styles/Home.module.css";
function Home() {
  const [position, setPosition] = useState([9.03, 38.74]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.log(err);
      },
    );
  }, []);
  return (
    <div className={style.container}>
      <div className={style.mapContainer}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%", zIndex: "1" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>
              <button
                style={{ background: "none", border: "none" }}
                onClick={() => alert("Hello")}
              >
                You Are Here
              </button>
            </Popup>
          </Marker>
        </MapContainer>
        <div className={style.info}>
          <div className={style.topInfo}>
            <div className={style.name}>
              <strong>Area Name</strong>
            </div>
            <div className={style.price}>100 birr/hr</div>
          </div>
          <div className={style.bottomInfo}>
            <div className={style.spotInfo}>
              <strong style={{ color: "green" }}>Available | 23</strong>
              <strong style={{ color: "orange" }}>Reserved | 10</strong>
              <strong style={{ color: "red" }}>occupied | 15</strong>
            </div>
            <div className={style.viewInfo}>
              <button>View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
