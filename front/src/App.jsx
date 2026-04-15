import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddParkingArea from "./Admin/coponenet/AddParkingArea.jsx";
import AdminOutlet from "./Admin/coponenet/AdminOutlet";
import AdminPage from "./Admin/coponenet/AdminPage.jsx";
import "./App.css";
import Landing from "./Landing.jsx";
import Login from "./Login.jsx";
import Booking from "./ParkingUsers/components/Booking.jsx";
import Home from "./ParkingUsers/components/Home";
import OutLet from "./ParkingUsers/components/outlet.jsx";
import PaymentPage from "./ParkingUsers/components/PaymentPage.jsx";
import Register from "./Register.jsx";

function App() {
  return (
    <Router>
      <Toaster />

      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="user" element={<OutLet />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="payment" element={<PaymentPage />}></Route>
          <Route path="booking" element={<Booking />}></Route>
        </Route>
        <Route path="admin" element={<AdminOutlet />}>
          <Route path="dashboard" element={<AdminPage />}></Route>
          <Route path="newParkingLots" element={<AddParkingArea />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
