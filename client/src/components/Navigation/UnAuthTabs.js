import React from 'react'
import {NavbarNav, NavItem } from 'mdbreact';
import { Link } from 'react-router-dom'

const UnAuthTabs = () => (
  <React.Fragment>
    <NavbarNav right>
      <NavItem >
          <Link className="nav-link" to="/login">Login</Link>
      </NavItem>
      <NavItem>
          <Link className="nav-link" to="/signup">Signup</Link>
      </NavItem>
    </NavbarNav>
  </React.Fragment>
)

export default UnAuthTabs;
