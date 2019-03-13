/// <reference path="./App.d.ts" />
import React, { Component } from 'react';
import './assets/styles/App.css';
import AppRouter from './router/Index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRouter />
      </div>
    );
  }
}

export default App;
