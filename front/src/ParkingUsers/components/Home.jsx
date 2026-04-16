import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../../config";
import style from "../styles/Home.module.css";

function Home() {
  const [position, setPosition] = useState([9.03, 38.74]);
  const [locations, setLocations] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedArea, setSelectedArea] = useState([]);
  const navigate = useNavigate();
  const getLocations = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/parkingArea/getLocations`, {
        method: "GET",
      });
      const data = await response.json();
      setLocations(data);
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
  const getAreaInfo = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingArea/getAreaInfo/${id}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setSelectedArea(data);
      console.log(data);
    } catch (err) {
      toast.error("Error Occurred!");
    }
  };
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

  function RecenterMap() {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, 15);
      }
    }, [map, position]);
    return null;
  }

  return (
    <div className={style.container}>
      <div className={style.mapContainer}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%", zIndex: "1" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <RecenterMap />

          <Marker position={position} icon={orangeIcon}>
            <Popup>
              <button style={{ background: "none", border: "none" }}>
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
                    onClick={() => {
                      setShowInfo(true);
                      getAreaInfo(loc.id);
                    }}
                  >
                    {loc.locationName}
                  </button>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
        {showInfo && (
          <div className={style.info}>
            {selectedArea.length > 0 ? (
              <>
                <div className={style.topInfo}>
                  <div className={style.name} style={{ color: "#fff" }}>
                    <strong>{selectedArea[0].name}</strong>
                  </div>
                  <div className={style.price} style={{ color: "#fff" }}>
                    <span>
                      {selectedArea[0].minPrice} - {selectedArea[0].maxPrice}{" "}
                      birr/hr
                    </span>
                  </div>
                </div>
                <div className={style.bottomInfo}>
                  <div className={style.spotInfo}>
                    <strong>Available | {selectedArea[0].available}</strong>
                    <strong>Reserved | {selectedArea[0].reserved}</strong>
                    <strong>Occupied | {selectedArea[0].occupied}</strong>
                  </div>
                  <div className={style.viewInfo}>
                    <button onClick={() => navigate("/user/payment")}>
                      View Details
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  alignContent: "center",
                  display: "flex",
                }}
              >
                <h2 style={{ flex: "1" }}>Parking Area Is Out Of Service</h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
