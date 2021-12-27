import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

export default function Index() {
  return (
    <Navbar
      bg='transparent'
      collapseOnSelect={true}
      variant='ligth'
      expand='lg'
    >
      <Container>
        <Navbar.Brand to='/' as={Link}>
          <img
            src='/logo.png'
            alt='Rick And Morty'
            style={{ width: 200, height: "auto" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link to='/' as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to='/favorites' as={NavLink}>
              Favorites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
