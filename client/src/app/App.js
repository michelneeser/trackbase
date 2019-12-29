import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import Navigation from '../components/navigation/Navigation';
import Header from '../components/home/header/Header';
import Features from '../components/home/features/Features';
import Stat from '../components/stat/Stat';
import Collection from '../components/collection/Collection';
import Showroom from '../components/showroom/Showroom';
import Login from '../components/login/Login';
import Api from '../components/api/Api';
import Footer from '../components/footer/Footer';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <StyledApp className="app">
          <Route component={Navigation} />
          <Route
            exact
            path="/"
            component={Header} />
          <StyledContainer className="container">
            <Route
              exact
              path="/"
              component={Features} />
            <Route
              path="/stat/:statId"
              component={Stat} />
            <Route
              path="/collection/:collectionId"
              component={Collection} />
            <Route
              exact
              path="/showroom"
              component={Showroom} />
            <Route
              exact
              path="/login"
              component={Login} />
            <Route
              exact
              path="/api"
              component={Api} />
          </StyledContainer>
          <Route component={Footer} />
        </StyledApp>
      </Router>
    );
  }
}

const StyledApp = styled.div`
  position: relative;
  min-height: 100vh;
`;

const StyledContainer = styled.div`
  padding-bottom: 13rem;

  @media(max-width: 1200px) {
    padding-bottom: 18rem;
  }
`;

export default App;