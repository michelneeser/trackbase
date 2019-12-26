import React from 'react';
import styled from 'styled-components';
import background from './header-bg.jpg';

import createNewStatAndRedirect from '../../utils/history';

class Header extends React.Component {
  render() {
    return (
      <Background>
        <Content className="container shadow">
          <div>
            <h1 className="text-center text-light">Track everything, everywhere</h1>
            <p className="lead text-center text-light">Log any data you want for free and with just one click.</p>
          </div>
          <div className="text-center mt-5">
            <button type="button" className="btn btn-info" onClick={createNewStatAndRedirect.bind(this)}>Sounds great &mdash; Let's go!</button>
          </div>
        </Content>
      </Background>
    );
  }
}

// image source: https://unsplash.com/photos/STzgkQQVRlw
const Background = styled.div`
  background-image: url(${background});
  background-size: cover;
  padding: 5rem 0;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: -1;
  }
`;

const Content = styled.div`
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem 0;

  @media(max-width: 768px) {
    width: 90% !important;
    overflow: hidden;
  }
`;

export default Header;