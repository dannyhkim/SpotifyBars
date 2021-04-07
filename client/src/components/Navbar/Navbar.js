import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>Bars</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/settings" activeStyle>
            Settings
          </NavLink>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavBtnLink to="/logout">Logout</NavBtnLink>
        </NavMenu>
        {/* <NavBtn>
          <NavBtnLink to="/logout">Logout</NavBtnLink>
        </NavBtn> */}
      </Nav>
    </>
  );
};

export default Navbar;
