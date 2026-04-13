import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { Base_URL } from "../../config";
import style from "../styles/AddParkingArea.module.css";
function AddParkingArea() {
  const [position, setPosition] = useState([9.03, 38.74]);
  const [location, setLocation] = useState(null);
  const [showNameForm, setShowNameForm] = useState(false);
  const [locationId, setLocationId] = useState(0);
  const [name, setName] = useState("");

  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
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
  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLocation({ lat, lng });
        console.log("Clicked location:", lat, lng);
      },
    });
    return null;
  };
  const addLocation = async (name, lat, lng) => {
    try {
      const response = await fetch(`${Base_URL}/api/users/addArea`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          latitude: lat,
          longitude: lng,
          name: name,
          description: "This is a new parking area.",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLocationId(data);
      setShowNameForm(false);
      toast.success("Location added successfully!");
    } catch (err) {
      toast.error("Failed to add location. Please try again.");
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

          <ClickHandler />
          {location && (
            <Marker position={[location.lat, location.lng]} icon={orangeIcon}>
              <Popup>
                <button
                  style={{ background: "none", border: "none" }}
                  onClick={() => setShowNameForm(true)}
                >
                  Add Location
                </button>
              </Popup>
            </Marker>
          )}

          <Marker position={position} icon={redIcon}>
            <Popup>
              <div style={{ display: "grid", gap: "5px" }}>
                <button
                  style={{ background: "none", border: "none" }}
                  onClick={() => alert("Hello")}
                >
                  You Are Here
                </button>
                <button
                  style={{ background: "none", border: "none" }}
                  onClick={() => alert("Hello")}
                >
                  Add This Location
                </button>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
        {showNameForm && (
          <div className={style.locationName}>
            <MdClose
              size={30}
              color="red"
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            />
            <div className={style.form}>
              <input
                type="name"
                placeholder="Enter Parking Area Name"
                onChange={(e) => setName(e.target.value)}
              />
              <button
                onClick={() => addLocation(name, location.lat, location.lng)}
              >
                Save Location
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={style.formContainer}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <p>
            Add New Parking Location{" "}
            {location != null && `(${location.lat}, ${location.lng})`}{" "}
          </p>
        </div>
        <div className={style.name}>
          <div>
            <label htmlFor="name">Levels:</label>
            <input type="number" />
          </div>
          <div>
            <label htmlFor="name">Price:</label>
            <input type="number" /> /hr
          </div>
        </div>
        <div className={style.spots}>
          <div style={{ width: "100%", textAlign: "center" }}>
            Spots In each level
          </div>
          <div className={style.spot}>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                gap: "5px",
                width: "80%",
                marginLeft: "10%",
              }}
            >
              <label htmlFor="number">Number of Spots:</label>
              <input type="number" />
            </div>
            <button>Next</button>
          </div>
        </div>
      </div>
      <div className={style.info}></div>
    </div>
  );
}

export default AddParkingArea;
