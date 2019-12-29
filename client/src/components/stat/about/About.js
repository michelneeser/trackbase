import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Name from './name/Name';
import Description from './description/Description';
import Links from './links/Links';
import Timestamp from '../../common/Timestamp'

class About extends React.Component {
  render() {
    return (
      <StyledWrapper className="border shadow-sm p-4">
        <h4 className="alert-heading">About</h4>
        <hr />
        <Name statId={this.props.statId} statUrl={this.props.statUrl} name={this.props.statName} setStatProperty={this.props.setStatProperty} />
        <Description statUrl={this.props.statUrl} description={this.props.statDescription} setStatProperty={this.props.setStatProperty} />
        <div className="mt-2">
          <span className="font-weight-bold">Created: </span>
          <Timestamp timestamp={this.props.statCreated} />
        </div>
        <hr />
        <Links publicUrl={this.props.uiUrl} apiUrl={this.props.statUrl} />
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  background-color: #fcefdc;

  @media(min-width: 1200px) {
    height: 18rem;
  }
`;

About.propTypes = {
  statId: PropTypes.string.isRequired,
  statUrl: PropTypes.string.isRequired,
  uiUrl: PropTypes.string.isRequired,
  statName: PropTypes.string.isRequired,
  statDescription: PropTypes.string.isRequired,
  setStatProperty: PropTypes.func.isRequired,
  statCreated: PropTypes.string.isRequired
}

export default About;