import React, { FunctionComponent, useEffect, CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

import { COLORS } from '../utils/constants';
import MenuIcon from '../components/icons/Menu';

const Nav = styled.nav({
  backgroundColor: COLORS.BLACK,
});

const LogoImage = styled.img({
  width: '3em',
  height: '1.9em',
});

const LeftLinks = styled.ul({
  paddingLeft: '15em !important',
});

const RightLinks = styled.ul({
  paddingRight: '17em',
});

const SideNav = styled.ul({
  backgroundColor: COLORS.BLACK,
});

interface SideNavLinkProps {
  path: string;
  text: string;
}
const SideNavLink: FunctionComponent<SideNavLinkProps> = ({ path, text }) => (
  <NavLink
    exact
    to={path}
    className="sidenav-close"
    style={{ color: COLORS.WHITE }}
    activeStyle={{ fontWeight: 'bold', color: COLORS.RED }}
  >
    {text}
  </NavLink>
);

const SideNavImage = styled.img({
  marginTop: '3vh',
  width: '65vw',
  height: '40vh',
});

const Navbar: FunctionComponent = () => {
  const activeLinkStyle: CSSProperties = {
    fontWeight: 'bold',
    color: COLORS.RED,
  };

  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    // @ts-ignore
    M.Sidenav.init(elems, {});
  }, []);

  return (
    <div>
      <div className="navbar-fixed">
        <Nav>
          <div className="nav-wrapper">
            <LogoImage
              className="brand-logo center"
              src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1570799435/strident/app/20191011_160907.png"
              alt=""
            />
            <a href="#0" data-target="slide-out" className="sidenav-trigger">
              <MenuIcon style={{ marginTop: 16 }} />
            </a>
            <LeftLinks className="left hide-on-med-and-down">
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
                <NavLink exact to="/videos" activeStyle={activeLinkStyle}>
                  Videos
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/songs" activeStyle={activeLinkStyle}>
                  Songs
                </NavLink>
              </li>
            </LeftLinks>
            <RightLinks className="right hide-on-med-and-down">
              <li>
                <NavLink exact to="/merch" activeStyle={activeLinkStyle}>
                  Merch
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
              <li>
                <NavLink exact to="/about" activeStyle={activeLinkStyle}>
                  About
                </NavLink>
              </li>
            </RightLinks>
          </div>
        </Nav>
      </div>
      <SideNav id="slide-out" className="sidenav">
        <li>
          <SideNavLink path="/" text="Home" />
        </li>
        <li>
          <SideNavLink path="/members" text="Members" />
        </li>
        <li>
          <SideNavLink path="/videos" text="Videos" />
        </li>
        <li>
          <SideNavLink path="/songs" text="Songs" />
        </li>
        <li>
          <SideNavLink path="/gigs" text="Gigs" />
        </li>
        <li>
          <SideNavLink path="/merch" text="Merch" />
        </li>
        <li>
          <SideNavLink path="/lyrics" text="Lyrics" />
        </li>
        <li>
          <SideNavLink path="/about" text="About" />
        </li>
        <li>
          <picture>
            <source
              srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571164676/strident/app/sidenav_ng.webp"
              type="image/webp"
            />
            <source
              srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571164625/strident/app/sidenav.png"
              type="image/jpeg"
            />
            <SideNavImage
              src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571164625/strident/app/sidenav.png"
              alt=""
            />
          </picture>
        </li>
      </SideNav>
    </div>
  );
};

export default Navbar;
