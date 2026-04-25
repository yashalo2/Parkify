import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddParkingArea from "./Admin/coponenet/AddParkingArea.jsx";
import AdminOutlet from "./Admin/coponenet/AdminOutlet";
import AdminPage from "./Admin/coponenet/AdminPage.jsx";
import AdminSupportPage from "./Admin/coponenet/AdminSupport.jsx";
import ManageParkingArea from "./Admin/coponenet/ManageParkingArea.jsx";
import ManageUser from "./Admin/coponenet/ManageUser.jsx";
import "./App.css";
import Landing from "./Landing.jsx";
import Login from "./Login.jsx";
import Booking from "./ParkingUsers/components/Booking.jsx";
import History from "./ParkingUsers/components/HistoryPage.jsx";
import Home from "./ParkingUsers/components/Home";
import Message from "./ParkingUsers/components/Message.jsx";
import OutLet from "./ParkingUsers/components/outlet.jsx";
import PaymentPage from "./ParkingUsers/components/PaymentPage.jsx";
import Register from "./Register.jsx";
import Scanner from "./Scanner.jsx";
import Verify from "./Verification.jsx";
function App() {
  return (
    <Router>
      <Toaster />

      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="scanner" element={<Scanner />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="verify" element={<Verify />}></Route>
        <Route path="customer" element={<OutLet />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="payment" element={<PaymentPage />}></Route>
          <Route path="history" element={<History />}></Route>
          <Route path="support" element={<Message />}></Route>
          <Route path="booking" element={<Booking area={1} />}></Route>
        </Route>
        <Route path="admin" element={<AdminOutlet />}>
          <Route path="home" element={<AdminPage />}></Route>
          <Route path="newParkingLots" element={<AddParkingArea />}></Route>
          <Route path="manageParking" element={<ManageParkingArea />}></Route>
          <Route path="manageUser" element={<ManageUser />}></Route>
          <Route path="support" element={<AdminSupportPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
