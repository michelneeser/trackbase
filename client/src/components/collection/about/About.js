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
        <Name id={this.props.collectionId} updateUrl={this.props.collectionUrl} name={this.props.collectionName} setProperty={this.props.setCollectionProperty} />
        <Description updateUrl={this.props.collectionUrl} description={this.props.collectionDescription} setProperty={this.props.setCollectionProperty} />
        <div className="mt-2">
          <span className="font-weight-bold">Created: </span>
          <Timestamp timestamp={this.props.collectionCreated} />
        </div>
        <hr />
        <Links publicUrl={this.props.collectionUiUrl} apiUrl={this.props.collectionUrl} />
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
  collectionId: PropTypes.string.isRequired,
  collectionUrl: PropTypes.string.isRequired,
  collectionUiUrl: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionDescription: PropTypes.string.isRequired,
  setCollectionProperty: PropTypes.func.isRequired,
  collectionCreated: PropTypes.string.isRequired
}

export default About;