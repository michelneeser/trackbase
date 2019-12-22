import React from 'react';
import PropTypes from 'prop-types';

import LineChart from './LineChart';
import BarChart from './BarChart';

class Chart extends React.Component {
  render() {
    return (
      <div>
        <hr className="my-5" />
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