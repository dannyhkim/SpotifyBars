import React from "react";
import axios from 'axios';
import { FaBars } from 'react-icons/fa';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks
} from "./NavbarElements";

const Navbar = () => {

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            Spotify Bars
          </NavLogo>
          <MobileIcon>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="about">About</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="settings">Settings</NavLinks>
            </NavItem>
            <NavItem>
              <a href="http://localhost:4000/logout">Logout</a>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
