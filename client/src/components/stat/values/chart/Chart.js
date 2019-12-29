import React from 'react';
import PropTypes from 'prop-types';

import LineChart from './line/LineChart';
import BarChart from './bar/BarChart';

class Chart extends React.Component {
  render() {
    return (
      <div>
        {this.props.numeric ?
          <LineChart values={this.props.values} /> :
          <BarChart values={this.props.values} />}
      </div>
    );
  }
}

Chart.propTypes = {
  values: PropTypes.array.isRequired,
  numeric: PropTypes.bool.isRequired
}

export default Chart;