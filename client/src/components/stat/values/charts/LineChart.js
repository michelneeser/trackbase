import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

import { format } from '../../../../utils/timestamp';

class LineChart extends Component {
  render() {
    const values = this.props.values;

    // chart data
    const chartLabels = values.map(val => format(val.created));
    const chartValues = values.map(val => val.value);

    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          data: chartValues,
          backgroundColor: 'rgba(23, 163, 184, 0.5)'
        }
      ]
    }

    // chart options
    const chartOptions = {
      legend: {
        display: false
      }
    };

    return (
      <Line
        data={chartData}
        options={chartOptions} />
    );
  }
}

LineChart.propTypes = {
  values: PropTypes.array.isRequired
}

export default LineChart;