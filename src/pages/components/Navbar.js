import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

export default function NavbarComponent(){
    return(
        <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Blog</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse>
  <Nav style={{ width: "100%" }} className="mr-auto justify-content-end">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">About</Nav.Link>
      <NavDropdown title="Category" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Tutorials</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Frontend</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Backend</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}