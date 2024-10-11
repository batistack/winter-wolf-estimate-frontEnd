import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
// import Estimate from "./Pages/estimate";
import RegisterUser from "./Users/RegisterUser";
import Login from "./Users/Login";
import About from "./Pages/About";
import UserProfile from "./Users/UserProfile";
import { ContentWrapper } from "./style/HomeStyled";
import CreateAccEquip from "./Pages/CreateAccEquip";
import SemilEstimate from "./Pages/SemilEstimate";
import Finalestimate from "./Pages/Finalestimate";
import UpdateProfile from "./Users/UpdateProfile";
import OneEstimate from "./Pages/OneEstimate";
import AccesoriesAndEquipments from "./Pages/AccesoriesAndEquipments";
function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <Navbar user={user} onLogOff={logout} />
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oneEstimate/:id" element={<OneEstimate />} />
          {/* <Route path="/estimates" element={<Estimate />} /> */}
          <Route path="/accEquip" element={<CreateAccEquip />} />
          <Route
            path="/accesoriesAndEquiments"
            element={<AccesoriesAndEquipments />}
          />
          <Route path="/final_estimate" element={<Finalestimate />} />
          <Route path="/semi_estimate" element={<SemilEstimate />} />
          <Route path="/update_profile" element={<UpdateProfile />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <RegisterUser /> : <Navigate to="/" />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/profile/:id"
            element={
              user ? (
                <UserProfile onLogOff={logout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </ContentWrapper>
    </Router>
  );
}

export default App;
