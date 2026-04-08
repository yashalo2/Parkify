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
          <h1>Hello</h1>
        </div>
      </div>
    </div>
  );
}
export default Home;
