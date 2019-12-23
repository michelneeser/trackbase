import React from 'react';
import PropTypes from 'prop-types';
import Octicon, { CloudDownload } from '@primer/octicons-react';

class Refresh extends React.Component {
  intervalId = 0;

  constructor(props) {
    super(props);
    this.state = {
      refreshInterval: 'req'
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.statId !== this.props.statId) {
      this.intervalId = 0;
      this.setState({ refreshInterval: 'req' });
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
        <form className="form mt-4">
          <div className="row">
            <div className="col-10">
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
            <div className="col-2">
              <button type="button" className="btn btn-dark btn-block" onClick={this.props.refreshStat}>
                <Octicon icon={CloudDownload} size="small" />
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

Refresh.propTypes = {
  statId: PropTypes.string.isRequired,
  refreshStat: PropTypes.func.isRequired
}

export default Refresh;