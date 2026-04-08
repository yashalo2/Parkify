import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./ParkingUsers/components/Home";
import OutLet from "./ParkingUsers/components/outlet";
import Registration from "./Registration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />}></Route>
        <Route path="user" element={<OutLet />}>
          <Route path="home" element={<Home />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
