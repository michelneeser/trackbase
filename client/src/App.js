import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Navigation from './components/Navigation';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Stat from './components/Stat';
import Showroom from './components/Showroom';

import { Container } from 'reactstrap';

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
          <Container>
            <Route
              exact
              path="/"
              component={Welcome} />
            <Route
              path="/stat/:statId"
              component={Stat} />
            <Route
              exact
              path="/showroom"
              component={Showroom} />
          </Container>
        </div>
      </Router >
    );
  }
}

export default App;