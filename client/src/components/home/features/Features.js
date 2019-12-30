import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import graph from './graph.png';

class Features extends React.Component {
  render() {
    return (
      <div>
        <div className="row mt-3">
          <div className="col-xl-4 mt-4">
            <StyledCard className="card shadow">
              <div className="card-header bg-dark text-light">Track Your Data</div>
              <div className="card-body">
                <div className="card-text">
                  <p>Track anything you like, for example:</p>
                  <ul>
                    <li>your expenses</li>
                    <li>your sport activities</li>
                    <li>your coffee consumption</li>
                    <li>and everything you can imagine</li>
                  </ul>
                </div>
                <StyledLink to="/stat/nla8uq6qte6s" className="btn btn-outline-dark btn-sm mt-3">Show example</StyledLink>
              </div>
            </StyledCard>
          </div>
          <div className="col-xl-4 mt-4">
            <StyledCard className="card shadow">
              <div className="card-header bg-dark text-light">Create Collections</div>
              <div className="card-body">
                <div className="card-text">
                  <p>Organize your stats in collections and share them with your family and friends. This way, you can compare your achievements in sports, reading habits, and more.</p>
                </div>
                <StyledLink to="/collection/l4lsyz9ehp06" className="btn btn-outline-dark btn-sm mt-3">Show example</StyledLink>
              </div>
            </StyledCard>
          </div>
          <div className="col-xl-4 mt-4">
            <StyledCard className="card shadow">
              <div className="card-header bg-dark text-light">Connect To Our API</div>
              <div className="card-body">
                <div className="card-text">
                  <p>Use our easy-to-use API to connect your devices. Basically everything connected to the Internet is able to send data to your stats.</p>
                </div>
                <StyledLink to="/api" className="btn btn-outline-dark btn-sm mt-3">Read the docs</StyledLink>
              </div>
            </StyledCard>
          </div>
        </div>
        <hr className="my-5" />
        <div className="row mt-3 px-5">
          <div className="col-lg-6">
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque habitant morbi tristique.</p>
          </div>
          <div className="col-lg-6">
            <StyledImage className="mx-auto mt-4 mt-lg-0" src={graph} alt="placeholder" />
          </div>
        </div>
        <hr className="my-5" />
        <div className="row mt-3 px-5">
          <div className="col-lg-6">
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque habitant morbi tristique.</p>
          </div>
          <div className="col-lg-6">
            <StyledImage className="mx-auto mt-4 mt-lg-0" src={graph} alt="placeholder" />
          </div>
        </div>
      </div>
    );
  }
}

const StyledCard = styled.div`
  height: 18rem;
`;

const StyledLink = styled(Link)`
  position: absolute;
  bottom: 1.3rem;
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
`;

export default Features;