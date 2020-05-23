import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NavbarComponent() {
  return (
    <Navbar fixed="top" style={{
      backgroundColor: "#8aa163",
    }} expand="lg">
      <Container>
        <Navbar.Brand style={{color: "#fff"}}> <Link className="links" to="/">Blog</Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav style={{ width: "100%" }} className="mr-auto justify-content-end">
            <Nav.Link style={{color: "#fff"}}><Link className="links" to="/">Home</Link></Nav.Link>
            <Nav.Link style={{color: "#fff"}}><Link className="links" to="/about">About</Link></Nav.Link>
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