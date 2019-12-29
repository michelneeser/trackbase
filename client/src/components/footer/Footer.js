import React from 'react';
import styled from 'styled-components';
import Octicon, { Heart } from '@primer/octicons-react';

class Footer extends React.Component {
  render() {
    return (
      <StyledFooter className="bg-dark text-light py-4">
        <div className="container text-muted">
          <div className="row">
            <div className="col-xl-4">
              <p>&copy; 2020 ustats.io</p>
              <p>Crafted with <Octicon icon={Heart} size="small" /> in Switzerland</p>
            </div>
            <div className="col-xl-4">
              <p>
                <StyledLink>Link 1</StyledLink>
                <StyledLink>Link 2</StyledLink>
                <StyledLink>Link 3</StyledLink>
                <StyledLink>Link 4</StyledLink>
              </p>
            </div>
            <div className="col-xl-4">
              <p>Some text</p>
            </div>
          </div>
        </div>
      </StyledFooter>
    )
  }
}

const StyledFooter = styled.footer`
  position: absolute;
  width: 100%;
  bottom: 0;
  font-size: 0.8rem;
  height: 10rem;

  @media(max-width: 1200px) {
    height: 15rem;
  }
`;

const StyledLink = styled.span`
  display: block;
`;

export default Footer;