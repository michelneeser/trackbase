import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatPretty } from '../../../utils/timestamp';
import Name from './Name';

class Info extends React.Component {
  render() {
    return (
      <div className="alert alert-warning p-3 mb-5 shadow">
        <h4 className="alert-heading">General Info</h4>
        <Name statId={this.props.statId} statUrl={this.props.statUrl} name={this.props.statName} setName={this.props.setName} />
        <div className="mt-2">
          <strong>URL: </strong>
          <span>{this.props.statUrl}</span>
          <StyledBadge className="badge badge-warning ml-2">copy</StyledBadge>
        </div>
        <div className="mt-2">
          <strong>Created: </strong>
          <span>{formatPretty(this.props.statCreated)}</span>
        </div>
      </div>
    )
  }
}

const StyledBadge = styled.span`
  cursor: pointer;
`;

Info.propTypes = {
  statId: PropTypes.string.isRequired,
  statUrl: PropTypes.string.isRequired,
  statName: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  statCreated: PropTypes.string.isRequired
}

export default Info;