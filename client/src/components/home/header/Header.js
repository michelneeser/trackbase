import React from 'react';
import styled from 'styled-components';
import background from './header-bg.jpg';
import Octicon, { ChevronRight } from '@primer/octicons-react';

import { createNewStatAndRedirect } from '../../../utils/history';

class Header extends React.Component {
  render() {
    return (
      <StyledBackground>
        <StyledContent className="mx-auto shadow-lg">
          <div>
            <h1 className="text-center text-light">Track everything, everywhere</h1>
            <p className="lead text-center text-light">Log any data you want for free and with just one click.</p>
          </div>
          <div className="text-center mt-5 w-50 mx-auto">
            <StyledButton type="button" className="btn btn-secondary btn-block" onClick={createNewStatAndRedirect.bind(this)}>
              Start Tracking <StyledArrow><Octicon icon={ChevronRight} size="small" /></StyledArrow>
            </StyledButton>
          </div>
        </StyledContent>
      </StyledBackground>
    );
  }
}

// image source: https://unsplash.com/photos/uR6dIgDnt38
// backup image source: https://unsplash.com/photos/STzgkQQVRlw
const StyledBackground = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: 0% 40%;
  padding: 8rem 0;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    z-index: -1;
  }

  @media(max-width: 1200px) {
    padding: 4rem 0;
  }
`;

const StyledContent = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 6rem;
  width: 60rem;

  @media(max-width: 1200px) {
    padding: 3rem;
    width: 70%;
    overflow: hidden;
  }
`;

const StyledButton = styled.button`
  position: relative;
  background-color: #f0ad4e !important;

  &:hover {
    background-color: #fcefdc !important;
  }
`;

const StyledArrow = styled.span`
  position: absolute;
  right: 1rem;
  bottom: 0.9rem;
`;

export default Header;