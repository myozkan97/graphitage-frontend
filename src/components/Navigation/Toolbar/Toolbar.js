import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


const toolbar = (props) =>  (
    <header className="Toolbar">
        <Navbar className="d-flex justify-content-between" bg="dark" variant="dark">
          <Nav>
            <Nav.Link onClick={() => props.searchClick()}>Search</Nav.Link>
          </Nav>
          <Navbar.Brand href="#home">GRAPHITAGE</Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => props.optionsClick()}>Options</Nav.Link>
          </Nav>
        </Navbar>
    </header>
)


export default toolbar;