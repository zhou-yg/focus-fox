import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
