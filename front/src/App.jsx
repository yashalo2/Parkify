import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminOutlet from "./Admin/coponenet/AdminOutlet";
import AdminPage from "./Admin/coponenet/AdminPage.jsx";
import "./App.css";
import Home from "./ParkingUsers/components/Home";
import OutLet from "./ParkingUsers/components/outlet.jsx";
import Registration from "./Registration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />}></Route>
        <Route path="user" element={<OutLet />}>
          <Route path="home" element={<Home />}></Route>
        </Route>
        <Route path="admin" element={<AdminOutlet />}>
          <Route path="dashboard" element={<AdminPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
