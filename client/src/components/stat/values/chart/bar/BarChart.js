import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component {
  render() {
    const values = this.props.values.slice().reverse();

    // chart data
    const valuesMap = new Map();
    if (this.props.counting) {
      // one bar per day with accumulated occurrences
      values.forEach(val => {
        const key = moment(val.timestamp).format('L');
        if (!valuesMap.get(key)) valuesMap.set(key, 0);
        valuesMap.set(key, valuesMap.get(key) + 1);
      });
    } else {
      // one bar per value with accumulated occurrences
      values.forEach(val => {
        const key = val.value;
        if (valuesMap.has(key)) {
          valuesMap.set(key, parseInt(valuesMap.get(key)) + 1);
        } else {
          valuesMap.set(key, 1);
        }
      });
    }

    const chartLabels = Array.from(valuesMap.keys());
    const chartValues = Array.from(valuesMap.values());

    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          data: chartValues,
          backgroundColor: 'rgba(23, 163, 184, 0.5)',
          barPercentage: 0.8
        }
      ]
    }

    // chart options
    const chartOptions = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            stepSize: 1
          }
        }]
      }
    };

    return (
      <Bar
        data={chartData}
        options={chartOptions} />
    );
  }
}

BarChart.propTypes = {
  values: PropTypes.array.isRequired,
  counting: PropTypes.bool.isRequired
}

export default BarChart;