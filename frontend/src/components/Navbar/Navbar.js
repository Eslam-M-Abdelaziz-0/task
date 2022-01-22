import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../img/logo.png';

const Navbar = () => {
  return (
    <div>
      <header className='header__middle'>
        <div className='container'>
          {/* Add Logo */}
          <span className='header__middle_logo'>
            <NavLink exact activeClassName='is-active' to='/'>
              <img src={logo} alt='Logo' />
            </NavLink>
          </span>

          <div className='header__middle__menus'>
            <ul className='main-menu'>
              <li className='menu-item'>
                <NavLink exact activeClassName='is-active' to={'/'}>
                  Home
                </NavLink>
              </li>

              <li className='menu-item'>
                <NavLink exact activeClassName='is-active' to={'/about'}>
                  about
                </NavLink>
              </li>

              <li className='menu-item'>
                <NavLink exact activeClassName='is-active' to={'/contact'}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
