import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSearch } from "react-icons/md";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import marker from "../../assets/marker-icon-orange.png";
import shadow from "../../assets/marker-shadow.png";
import { Base_URL } from "../../config";
import style from "../styles/Home.module.css";
import Booking from "./Booking";

function Home() {
  const [position, setPosition] = useState([9.03, 38.74]);
  const [locations, setLocations] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedArea, setSelectedArea] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
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
    iconUrl: marker,
    shadowUrl: shadow,
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
  const search = async (search) => {
    if (search.length == 0) {
      getLocations();
      return;
    }
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingArea/searchArea/${search}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      if (data.length == 0) {
        toast.error("No Parking Area Found");
      }
      setLocations(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };

  return (
    <div className={style.container}>
      {!showBooking ? (
        <>
          <div className={style.search}>
            <MdSearch
              style={{
                height: "90%",
                width: "30px",
                marginLeft: "10px",
                marginTop: "2.5px",
                color: "#252525",
              }}
            />{" "}
            <input
              onChange={(e) => search(e.target.value)}
              type="text"
              placeholder="search parking area"
            />
          </div>
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
                          {selectedArea[0].minPrice} -{" "}
                          {selectedArea[0].maxPrice} birr/hr
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
                        <button onClick={() => setShowBooking(true)}>
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
                    <h2 style={{ flex: "1" }}>
                      Parking Area Is Out Of Service
                    </h2>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <Booking area={selectedArea[0].id} />
      )}
    </div>
  );
}

export default Home;
