import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { slide as Menu } from 'react-burger-menu'

var searchMenuStyles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px',
      display: 'none'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }
  

const searchMenu = (props) => (
    <Menu onClose={() => props.searchClosed()} isOpen={props.search} styles={searchMenuStyles}>
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Paper Name</Form.Label>
        <Form.Control type="email" placeholder="Paper Name" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Author</Form.Label>
        <Form.Control type="password" placeholder="Author" />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
</Button>
    </Form>
  </Menu>
);


export default searchMenu;