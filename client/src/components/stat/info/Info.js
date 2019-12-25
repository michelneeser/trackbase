import React from 'react';
import PropTypes from 'prop-types';

import Name from './Name';
import Links from './links/Links';
import Timestamp from '../Timestamp'

class Info extends React.Component {
  render() {
    return (
      <div className="alert alert-warning p-3 mb-5 shadow">
        <h4 className="alert-heading">General Info</h4>
        <Name statId={this.props.statId} statUrl={this.props.statUrl} name={this.props.statName} setName={this.props.setName} />
        <Links publicUrl={this.props.uiUrl} apiUrl={this.props.statUrl} />
        <div className="mt-2">
          <span className="font-weight-bold">Created: </span>
          <Timestamp timestamp={this.props.statCreated} />
        </div>
      </div>
    )
  }
}

Info.propTypes = {
  statId: PropTypes.string.isRequired,
  statUrl: PropTypes.string.isRequired,
  uiUrl: PropTypes.string.isRequired,
  statName: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  statCreated: PropTypes.string.isRequired
}

export default Info;