import React from 'react';
import PropTypes from 'prop-types';

import Refresh from './Refresh';
import AddValue from './AddValue';

class Controls extends React.Component {
  render() {
    return (
      <div>
        <Refresh statId={this.props.statId} refreshStat={this.props.refreshStat} />
        <AddValue statId={this.props.statId} valuesUrl={this.props.valuesUrl} setValues={this.props.setValues} />
      </div>
    );
  }
}

Controls.propTypes = {
  statId: PropTypes.string.isRequired,
  refreshStat: PropTypes.func.isRequired,
  valuesUrl: PropTypes.string.isRequired,
  setValues: PropTypes.func.isRequired
}

export default Controls;