import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

import Name from './Name';

class Info extends React.Component {
  render() {
    return (
      <div className="alert alert-warning p-3 mb-5 shadow">
        <h4 className="alert-heading">General Info</h4>
        <Name statId={this.props.statId} name={this.props.statName} setName={this.props.setName} />
        <div className="mt-2">
          <strong>URL: </strong>
          <span>{this.props.statUrl}</span>
          <StyledBadge className="badge badge-warning ml-2">copy</StyledBadge>
        </div>
        <div className="mt-2">
          <strong>Created: </strong>
          <span>{moment(this.props.statCreated).format('MMMM Do YYYY, hh:mm:ss a')}</span>
        </div>
      </div>
    )
  }
}

const StyledBadge = styled.span`
  cursor: pointer;
`;

export default Info;