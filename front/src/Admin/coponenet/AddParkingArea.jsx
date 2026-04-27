import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import logo from "../../assets/logo.png";
import { Base_URL } from "../../config";
import style from "../styles/AddParkingArea.module.css";
function AddParkingArea() {
  const [position, setPosition] = useState([9.03, 38.74]);
  const [location, setLocation] = useState(null);
  const [showNameForm, setShowNameForm] = useState(false);
  const [locationId, setLocationId] = useState(0);
  const [name, setName] = useState("");
  const [locations, setLocations] = useState([]);
  const [showLocationInfo, setShowLocationInfo] = useState(false);
  const [parkingAreaId, setParkingAreaId] = useState(0);
  const lotRef = useRef(null);
  const [showAddLevelForm, setShowAddLevelForm] = useState(false);
  const [parkingArea, setParkingArea] = useState([]);
  const [lots, setLots] = useState([]);
  console.log(position);
  const getLocations = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/parkingArea/getLocations`, {
        method: "GET",
      });
      const data = await response.json();
      setLocations(data);
    } catch (err) {
      toast.error("Failed to fetch parking areas. Please try again.");
    }
  };
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
      },
    });
    return null;
  };
  const addLocation = async (name, lat, lng) => {
    try {
      const response = await fetch(`${Base_URL}/api/parkingArea/addArea`, {
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
      getLocations();
      getParkingArea(data);
    } catch (err) {
      toast.error("Failed to add location. Please try again.");
    }
  };
  const addLots = async (e) => {
    e.preventDefault();
    const formData = new FormData(lotRef.current);

    try {
      const response = await fetch(`${Base_URL}/api/parkingLots/addSpots`, {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      toast.success(data);
      getLots(parkingArea[0].id);
      setShowAddLevelForm(false);
    } catch (err) {
      toast.error("Failed to add lot please try again");
    }
  };
  const getParkingArea = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingArea/getArea/${id}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setParkingArea(data);
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  const getLots = async (id) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/parkingLots/getLots/${id}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setLots(data);
    } catch (err) {
      toast.error("Error Occurred");
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
  return (
    <div className={style.container}>
      <div
        className={style.mapContainer}
        onClick={() => setShowAddLevelForm(false)}
      >
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
          {locations.length > 0 &&
            locations.map((loc, index) => (
              <Marker key={index} position={[loc.latitude, loc.longitude]}>
                <Popup>
                  <button
                    style={{ background: "none", border: "none" }}
                    onClick={() => {
                      getParkingArea(loc.id);
                      getLots(loc.id);
                    }}
                  >
                    view {loc.locationName}
                  </button>
                </Popup>
              </Marker>
            ))}
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
              onClick={() => setShowNameForm(false)}
            />
            <div className={style.form}>
              <label htmlFor="name" style={{ color: "#fff" }}>
                Location Name
              </label>
              <input
                type="name"
                id="name"
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
      {showAddLevelForm && (
        <form
          ref={lotRef}
          style={{ color: "#fff" }}
          onSubmit={addLots}
          className={style.formContainer}
        >
          <div style={{ width: "100%", textAlign: "center" }}>
            <p>Add New Level to {parkingArea[0].name} Parking</p>
          </div>
          <div className={style.name}>
            <div>
              <label htmlFor="name">Levels:</label>
              <input type="number" style={{ color: "#fff" }} name="level" />
              <input
                type="hidden"
                name="parkingArea"
                value={parkingArea[0].id}
              />
            </div>
            <div>
              <label htmlFor="name">Price:</label>
              <input style={{ color: "#fff" }} type="number" name="price" /> /hr
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
                  color: "#fff",
                }}
              >
                <label htmlFor="number">Number of Spots:</label>
                <input type="number" name="spots" />
              </div>
              <button>Add Level</button>
            </div>
          </div>
        </form>
      )}
      <div className={style.info}>
        <div className={style.nameAndLogo}>
          <div className={style.logoContainer}>
            <img src={logo} />
          </div>
          <div style={{ textAlign: "start", alignContent: "center" }}>
            <h1>Parkify</h1>
            <p>Smart Parking</p>
          </div>
        </div>

        <div className={style.locationInfo}>
          <div className={style.infoItem}>
            {parkingArea.length > 0 ? (
              <>
                <h3>{parkingArea[0].name}</h3>
                <button
                  style={{
                    height: "max-content",
                    padding: " 1em 0.5em",
                    border: "none",
                    background: "blue",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                  onClick={() => setShowAddLevelForm(true)}
                >
                  Add level
                </button>
              </>
            ) : (
              <h3>Select Parking Area</h3>
            )}
          </div>
          <div className={style.levelsAndSpots}>
            {lots.length > 0 ? (
              lots.map((lot, index) => (
                <div key={index} style={{ display: "flex", gap: "10px" }}>
                  <p style={{ flex: "1" }}>Level {lot.lotName}</p>
                  <p style={{ flex: "1" }}>{lot.spots} spots</p>
                  <p style={{ flex: "1" }}>{lot.price} birr/hr</p>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>No Levels</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddParkingArea;
