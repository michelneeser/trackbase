import React from 'react';
import PropTypes from 'prop-types';

import Config from './Config';
import AddValue from './add-value/AddValue';

class Controls extends React.Component {
  render() {
    return (
      <div>
        <Config
          statId={this.props.statId}
          statUrl={this.props.statUrl}
          showChart={this.props.showChart}
          refreshStat={this.props.refreshStat}
          setWithChart={this.props.setWithChart} />

        <AddValue
          statId={this.props.statId}
          valuesUrl={this.props.valuesUrl}
          setValues={this.props.setValues} />
      </div>
    );
  }
}

Controls.propTypes = {
  statId: PropTypes.string.isRequired,
  statUrl: PropTypes.string.isRequired,
  showChart: PropTypes.bool.isRequired,
  refreshStat: PropTypes.func.isRequired,
  valuesUrl: PropTypes.string.isRequired,
  setValues: PropTypes.func.isRequired,
  setWithChart: PropTypes.func.isRequired
}

export default Controls;