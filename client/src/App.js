import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/common/Navigation';
import Header from './components/home/Header';
import Features from './components/home/Features';
import Stat from './components/stat/Stat';
import Showroom from './components/showroom/Showroom';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route component={Navigation} />
          <Route
            exact
            path="/"
            component={Header} />
          <div className="container">
            <Route
              exact
              path="/"
              component={Features} />
            <Route
              path="/stat/:statId"
              component={Stat} />
            <Route
              exact
              path="/showroom"
              component={Showroom} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;