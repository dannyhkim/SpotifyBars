import React from "react";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavLinkCustom,
  NavBtn,
  NavBtnCustom,
} from "./NavbarElements";
import Cookies from "js-cookie";

const Navbar = () => {
  const isLoggedIn = () => {
    return Cookies.get("loggedIn");
  };

  const signOut = isLoggedIn() ? (
    <NavBtn>
      <NavBtnCustom href="http://localhost:4000/logout">Sign out</NavBtnCustom>
    </NavBtn>
  ) : null;

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">Spotify Bars</NavLogo>
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
            {signOut}
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
