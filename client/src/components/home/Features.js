import React from 'react';
import styled from 'styled-components';

class Features extends React.Component {
  render() {
    return (
      <div>
        <div className="row mt-3">
          <div className="col-xl-4 mt-4">
            <div className="card shadow">
              <div className="card-header">Feature 1</div>
              <div className="card-body">
                <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque habitant morbi tristique.</div>
                <button type="button" className="btn btn-outline-dark btn-sm mt-3">Show example</button>
              </div>
            </div>
          </div>
          <div className="col-xl-4 mt-4">
            <div className="card shadow">
              <div className="card-header">Feature 2</div>
              <div className="card-body">
                <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque habitant morbi tristique.</div>
                <button type="button" className="btn btn-outline-dark btn-sm mt-3">Show example</button>
              </div>
            </div>
          </div>
          <div className="col-xl-4 mt-4">
            <div className="card shadow">
              <div className="card-header">Feature 3</div>
              <div className="card-body">
                <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque habitant morbi tristique.</div>
                <button type="button" className="btn btn-outline-dark btn-sm mt-3">Show example</button>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <div className="row mt-3 px-5">
          <div className="col-lg-6">
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque habitant morbi tristique.</p>
          </div>
          <div className="col-lg-6">
            <Image className="mx-auto mt-4 mt-lg-0" src="https://place-hold.it/400" alt="placeholder" />
          </div>
        </div>
        <hr className="my-5" />
        <div className="row mt-3 px-5">
          <div className="col-lg-6">
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque habitant morbi tristique.</p>
          </div>
          <div className="col-lg-6">
            <Image className="mx-auto mt-4 mt-lg-0" src="https://place-hold.it/400" alt="placeholder" />
          </div>
        </div>
      </div>
    );
  }
}

const Image = styled.img`
  display: block;
`;

export default Features;