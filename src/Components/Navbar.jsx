import React from "react";
import { Link } from "react-router-dom";
import {
  NavbarWrapper,
  Logo,
  NavLinksContainer,
  NavLink,
  LogOffButton,
} from "../style/NavBarStyled";

const Navbar = ({ user, onLogOff }) => {
  return (
    <NavbarWrapper>
      <NavLink to="/">
        <Logo>Winter Wolf QuoteMaster</Logo>
      </NavLink>
      <NavLinksContainer>
        {user ? (
          <>
            <NavLink to="/estimates">Estimates</NavLink>
            {/* <NavLink to="/equipments">Equipments</NavLink> */}
            <NavLink to="/accesoriesAndEquiments">Accesories and Equipments</NavLink>
            <NavLink to={`/profile/${user.id}`}>Profile</NavLink>
            <LogOffButton onClick={onLogOff}>Log Off</LogOffButton>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/about">About</NavLink>
          </>
        )}
      </NavLinksContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
