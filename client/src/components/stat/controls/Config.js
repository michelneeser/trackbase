import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Octicon, { CloudDownload } from '@primer/octicons-react';

class Config extends React.Component {
  intervalId = 0;

  constructor(props) {
    super(props);
    this.state = {
      showChart: props.showChart,
      refreshInterval: 'req'
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.statId !== this.props.statId) {
      this.intervalId = 0;
      this.setState({
        showChart: this.props.showChart,
        refreshInterval: 'req'
      });
    }
  }

  handleShowChartChange = async (event) => {
    try {
      const stat = (await axios.put(this.props.statUrl, { withChart: event.target.checked })).data;
      this.props.setWithChart(stat.withChart);
      this.setState({ showChart: stat.withChart });
    } catch (error) {
      console.error(error);
    }
  }

  handleIntervalChange = (event) => {
    clearInterval(this.intervalId);
    let interval = event.target.value;
    if (interval !== 'req') {
      interval = parseInt(interval);
      this.intervalId = setInterval(this.props.refreshStat, interval);
    }
    this.setState({ refreshInterval: interval });
  }

  render() {
    return (
      <div>
        <form className="form p-3 border shadow-sm">
          <div className="row">
            <div className="col-xl-2 pl-4 mt-2">
              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="showChartToggle"
                  checked={this.state.showChart}
                  onChange={this.handleShowChartChange} />
                <label className="custom-control-label" htmlFor="showChartToggle">show chart</label>
              </div>
            </div>
            <div className="col-xl-3 pl-4 mt-4 mt-xl-2">
              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="showTimestampsToggle" />
                <label className="custom-control-label" htmlFor="showTimestampsToggle">show timestamps</label>
              </div>
            </div>
            <div className="col-xl-5 mt-4 mt-xl-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">AUTO REFRESH</span>
                </div>
                <select className="form-control" value={this.state.refreshInterval} onChange={this.handleIntervalChange}>
                  <option value="req">only on request</option>
                  <option value="60000">every minute</option>
                  <option value="300000">every 5 minutes</option>
                  <option value="600000">every 10 minutes</option>
                  <option value="900000">every 15 minutes</option>
                </select>
              </div>
            </div>
            <div className="col-xl-2 mt-4 mt-xl-0">
              <button type="button" className="btn btn-dark btn-block" onClick={this.props.refreshStat}>
                <Octicon icon={CloudDownload} size="small" />
              </button>
            </div>
          </div>
        </form>
      </div >
    )
  }
}

Config.propTypes = {
  statId: PropTypes.string.isRequired,
  statUrl: PropTypes.string.isRequired,
  showChart: PropTypes.bool.isRequired,
  refreshStat: PropTypes.func.isRequired,
  setWithChart: PropTypes.func.isRequired
}

export default Config;