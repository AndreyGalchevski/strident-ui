import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuthContext } from '../context/authContext';
import { LOGOUT_SUCCESS } from '../context/authActionTypes';

function Navbar(): ReactElement {
  const [authState, dispatch] = useAuthContext();

  function handleLogout(): void {
    dispatch({ type: LOGOUT_SUCCESS });
  }
  return (
    <nav>
      <span>Strident</span>
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/members">
            Members
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/songs">
            Songs
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/videos">
            Videos
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/gigs">
            Home
          </NavLink>
        </li>
      </ul>
      {authState.isAuthenticated && (
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
