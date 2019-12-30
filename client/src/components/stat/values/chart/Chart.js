import React from 'react';
import PropTypes from 'prop-types';

import LineChart from './line/LineChart';
import BarChart from './bar/BarChart';

class Chart extends React.Component {
  render() {
    return (
      <div>
        {(this.props.numeric || this.props.values.length === 0) ?
          <LineChart
            values={this.props.values} /> :
          <BarChart
            values={this.props.values}
            counting={this.props.counting} />}
      </div>
    );
  }
}

Chart.propTypes = {
  values: PropTypes.array.isRequired,
  numeric: PropTypes.bool.isRequired,
  counting: PropTypes.bool.isRequired
}

export default Chart;