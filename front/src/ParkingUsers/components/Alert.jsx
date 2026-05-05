import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdWarning } from "react-icons/md";
import { Base_URL } from "../../config";
import style from "../styles/Alert.module.css";
function Alert() {
  const [alerts, setAlerts] = useState([]);
  const getAlerts = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/parkingArea/getAlerts`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.length == 0) {
        return;
      }
      setAlerts(data.reverse());
    } catch (err) {
      toast.error("Error Occurred");
    }
  };
  useEffect(() => {
    getAlerts();
  }, []);
  return (
    <div className={style.container}>
      {alerts.length > 0 ? (
        alerts.map((alerts, index) => (
          <div key={index} className={style.content}>
            <div className={style.alertSign}>
              <MdWarning size={24} color="red" />
              <div>Warning</div>
            </div>
            <div className={style.message}>
              <p>{alerts.message}</p>
            </div>
            <div className={style.date}>
              {new Date(alerts.date).toDateString()}
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
          No Alerts Found
        </div>
      )}
    </div>
  );
}
export default Alert;
