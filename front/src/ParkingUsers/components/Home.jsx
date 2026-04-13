import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Base_URL } from "../../config";
import style from "../styles/Home.module.css";
function Home() {
  const [position, setPosition] = useState([9.03, 38.74]);
  const [locations, setLocations] = useState([]);
  const getLocations = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/parkingArea/getLocations`, {
        method: "GET",
      });
      const data = await response.json();
      setLocations(data);
      toast.success("Parking areas loaded successfully!");
      console.log(data);
    } catch (err) {
      toast.error("Failed to fetch parking areas. Please try again.");
      console.log(err);
    }
  };
  const orangeIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.log(err);
      },
    );
    getLocations();
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
          <Marker position={position} icon={orangeIcon}>
            <Popup>
              <button
                style={{ background: "none", border: "none" }}
                onClick={() => alert("Hello")}
              >
                You Are Here
              </button>
            </Popup>
          </Marker>
          {locations.length > 0 &&
            locations.map((loc, index) => (
              <Marker key={index} position={[loc.latitude, loc.longitude]}>
                <Popup>
                  <button
                    style={{ background: "none", border: "none" }}
                    onClick={() => alert("Hello")}
                  >
                    {loc.locationName}
                  </button>
                </Popup>
              </Marker>
            ))}
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
