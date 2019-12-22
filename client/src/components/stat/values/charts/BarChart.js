import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component {
  render() {
    const values = this.props.values;

    // chart data
    const valuesMap = new Map();
    values.forEach(val => {
      const key = val.value;
      if (valuesMap.has(key)) {
        valuesMap.set(key, parseInt(valuesMap.get(key)) + 1);
      } else {
        valuesMap.set(key, 1);
      }
    });

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
  values: PropTypes.array.isRequired
}

export default BarChart;