import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
} from "reactstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <div className="container">
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">
          Minhas Series
        </NavbarBrand>

        <NavbarToggler onClick={toggleMenu} />
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/series">
                Séries
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/genres">
                Generos
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
