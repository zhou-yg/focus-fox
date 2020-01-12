import React from 'react';
import LeftNav from './LeftNav';
import routerConfig from '../../router/config';
import { Route } from "react-router-dom";

import logo from '../../assets/logo-wan.svg';

function Header() {
  return (
    <div className="navbar">
      <div className="logo-box">
        <img className="logo" src={logo} alt="" /> &nbsp;
        <span>
          糯米丸
        </span>
      </div>
      <div className="profile">
        <span className="avatar">
          Z
        </span>
        <span className="name">
          zhouyg
        </span>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="topbar">
      {/* <Header /> */}
      <Header />
      <div className="content">
        <div className="left-nav-box">
          {/* <LeftNav /> */}
          <LeftNav />
        </div>
        <div className="right-content">
          {routerConfig.leftNav.concat(routerConfig.game).map(l => {
            return (
              <Route key={l.href} path={l.href} component={l.component} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
