import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "../styles/PaymentPage.module.css";
function PaymentPage(parkingArea) {
  const navigate = useNavigate();
  if (parkingArea == null) {
    toast.error("Please Select Parking Lot For Payment");
    navigate("home");
  }
  const bookTicket = async (token) => {
    try {
    } catch (err) {
      toast.error("Error Occurred!");
    }
  };
  return (
    <h1 className={style.label}>
      <h1>Hello</h1>
    </h1>
  );
}
export default PaymentPage;
