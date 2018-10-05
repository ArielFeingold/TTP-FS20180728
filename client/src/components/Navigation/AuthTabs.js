import React from 'react'
import {NavbarNav, NavItem } from 'mdbreact';
import { Link } from 'react-router-dom'

const AuthTabs = () => (
  <React.Fragment>
    <NavbarNav left>
      <NavItem>
          <Link className="nav-link" to="/protfolio">Protfolio</Link>
      </NavItem>
      <NavItem>
          <Link className="nav-link" to="/transactions" disabled>Transactions</Link>
      </NavItem>

    </NavbarNav>
    <NavbarNav right>
      <NavItem>
        <Link className="nav-link" to="/logout">Logout</Link>
      </NavItem>
    </NavbarNav>
  </React.Fragment>
)

export default AuthTabs;
