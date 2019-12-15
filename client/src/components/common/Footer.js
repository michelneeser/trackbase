import React from 'react';
import styled from 'styled-components';

class Footer extends React.Component {
  render() {
    return (
      <StyledFooter className="bg-dark text-light p-4">
        <div className="container text-muted">
          <div class="row">
            <div class="col-md-4">
              <p>&copy; 2020 ustats.io<br />Developed in Switzerland</p>
            </div>
            <div class="col-md-4">
              <p>
                <StyledLink>Link 1</StyledLink>
                <StyledLink>Link 2</StyledLink>
                <StyledLink>Link 3</StyledLink>
                <StyledLink>Link 4</StyledLink>
              </p>
            </div>
            <div class="col-md-4">
              <p>Some text</p>
            </div>
          </div>
        </div>
      </StyledFooter>
    )
  }
}

const StyledFooter = styled.footer`
  font-size: 0.8rem;
  margin-top: 5em;
  height: 200px;
`;

const StyledLink = styled.span`
  display: block;
`;

export default Footer;