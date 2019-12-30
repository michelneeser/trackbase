import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Name from '../../common/name/Name';
import Description from '../../common/description/Description';
import Links from '../../common/links/Links';
import Timestamp from '../../common/Timestamp'

class About extends React.Component {
  render() {
    return (
      <StyledWrapper className="border shadow-sm p-4">
        <h4 className="alert-heading">About</h4>

        <hr />
        <Name
          id={this.props.statId}
          updateUrl={this.props.statUrl}
          name={this.props.statName}
          setProperty={this.props.setStatProperty}
          modalTitle="Name your stat"
          modalDescription="Give your stat a nice name to identify it in the future" />

        <Description
          updateUrl={this.props.statUrl}
          description={this.props.statDescription}
          setProperty={this.props.setStatProperty}
          modalTitle="Describe your stat"
          modalDescription="Give your stat a nice description" />

        <div className="mt-2">
          <span className="font-weight-bold">Created: </span>
          <Timestamp timestamp={this.props.statCreated} />
        </div>
        <hr />
        <Links publicUrl={this.props.statUiUrl} apiUrl={this.props.statUrl} />
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
  statUiUrl: PropTypes.string.isRequired,
  statName: PropTypes.string.isRequired,
  statDescription: PropTypes.string.isRequired,
  setStatProperty: PropTypes.func.isRequired,
  statCreated: PropTypes.string.isRequired
}

export default About;