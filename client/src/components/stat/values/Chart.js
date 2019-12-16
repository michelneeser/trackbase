import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

class Chart extends React.Component {
  render() {
    const values = this.props.values;
    const chartLabels = values.map(value => moment(value.created).format('MM/DD/YYYY, hh:mm:ss a'));
    const chartValues = values.map(value => value.value);

    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          data: chartValues,
          backgroundColor: 'rgba(23, 163, 184, 0.5)'
        }
      ]
    }

    return (
      <div>
        <Line
          data={chartData}
          options={chartOptions} />
      </div>
    )
  }
}

const chartOptions = {
  legend: {
    display: false
  }
};

export default Chart;