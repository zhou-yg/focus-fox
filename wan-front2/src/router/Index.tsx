import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import routerConfig from './config';
import TopBar from '../components/layout/TopBar';

function AppRouter () {
  return (
    <Router>
      <Route to="/" component={TopBar} >
      </Route>
    </Router>
  );
}

export default AppRouter;
