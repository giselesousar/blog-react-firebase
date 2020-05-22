import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

export default function NavbarComponent() {
  return (
    <Navbar style={{
      backgroundColor: "#dc3545",
    }} expand="lg">
      <Container>
        <Navbar.Brand style={{color: "#fff"}} href="#home">Blog</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav style={{ width: "100%" }} className="mr-auto justify-content-end">
            <Nav.Link style={{color: "#fff"}} href="#home">Home</Nav.Link>
            <Nav.Link style={{color: "#fff"}} href="#link">About</Nav.Link>
            {/**<NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Tutorials</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Frontend</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Backend</NavDropdown.Item>
            </NavDropdown>*/}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}