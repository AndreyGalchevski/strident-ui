import React, { ReactElement, useEffect, CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

import { PRIMARY_COLOR, ACCENT_COLOR } from '../utils/constants';

const styles = {
  nav: {
    backgroundColor: PRIMARY_COLOR,
  },
  brandLogo: {
    width: '3em',
    height: '1.9em',
  },
  leftLinks: {
    paddingLeft: '20em',
  },
  rightLinks: {
    paddingRight: '22em',
  },
  sideNav: {
    backgroundColor: PRIMARY_COLOR,
    // backgroundImage:
    // 'url("https://res.cloudinary.com/dqvimfd8b/image/upload/v1570892825/strident/metal-texture-4331005_960_720__01__01.jpg")',
  },
  link: {
    color: '#fff',
  },
  sideNavImage: {
    marginTop: '8vh',
    width: '65vw',
    height: '40vh',
  },
};

function Navbar(): ReactElement {
  const activeLinkStyle: CSSProperties = {
    fontWeight: 'bold',
    color: ACCENT_COLOR,
  };

  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    // @ts-ignore
    M.Sidenav.init(elems, {});
  }, []);

  return (
    <div>
      <div className="navbar-fixed">
        <nav style={styles.nav}>
          <div className="nav-wrapper">
            <img
              className="brand-logo center"
              src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1570799435/strident/20191011_160907.png"
              alt=""
              style={styles.brandLogo}
            />
            <a href="#0" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="left hide-on-med-and-down" style={styles.leftLinks}>
              <li>
                <NavLink exact to="/" activeStyle={activeLinkStyle}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/members" activeStyle={activeLinkStyle}>
                  Members
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/songs" activeStyle={activeLinkStyle}>
                  Songs
                </NavLink>
              </li>
            </ul>
            <ul className="right hide-on-med-and-down" style={styles.rightLinks}>
              <li>
                <NavLink exact to="/videos" activeStyle={activeLinkStyle}>
                  Videos
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/gigs" activeStyle={activeLinkStyle}>
                  Gigs
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/lyrics" activeStyle={activeLinkStyle}>
                  Lyrics
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <ul id="slide-out" className="sidenav" style={styles.sideNav}>
        <li>
          <NavLink
            exact
            to="/"
            className="sidenav-close"
            style={styles.link}
            activeStyle={activeLinkStyle}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/members"
            className="sidenav-close"
            style={styles.link}
            activeStyle={activeLinkStyle}
          >
            Members
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/songs"
            className="sidenav-close"
            style={styles.link}
            activeStyle={activeLinkStyle}
          >
            Songs
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/videos"
            className="sidenav-close"
            style={styles.link}
            activeStyle={activeLinkStyle}
          >
            Videos
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/gigs"
            className="sidenav-close"
            style={styles.link}
            activeStyle={activeLinkStyle}
          >
            Gigs
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/lyrics"
            className="sidenav-close"
            style={styles.link}
            activeStyle={activeLinkStyle}
          >
            Lyrics
          </NavLink>
        </li>
        <img
          style={styles.sideNavImage}
          src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1570907313/strident/1570907271835.png"
          alt=""
        />
      </ul>
    </div>
  );
}

export default Navbar;
