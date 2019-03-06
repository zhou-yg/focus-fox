import './TopBar.css';
import React from 'react';
import LeftNav from './LeftNav';
import routerConfig from '../../router/config';
import { Route, Link } from "react-router-dom";

function TopBar(props: any) {
  return (
    <div className="topbar">
      <div className="navbar">
        <div className="logo-box">
          <img className="logo" src="../../assets/logo-wan.svg" alt="" />
          <span>
            Fox Wan
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
      <div className="content">

        <div className="left-nav-box">
          <LeftNav />
        </div>
        <div className="right-content">
          {routerConfig.leftNav.map(l => {
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
