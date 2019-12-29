import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import Octicon, { CloudDownload } from '@primer/octicons-react';

class Settings extends React.Component {
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
      <StyledWrapper className="border shadow-sm mt-5 mt-xl-0 p-4">
        <h4 className="alert-heading">Settings</h4>
        <hr />
        <div className="custom-control custom-switch mt-4">
          <input type="checkbox" className="custom-control-input" id="keepPrivateToggle" />
          <label className="custom-control-label" htmlFor="keepPrivateToggle">keep private</label>
        </div>
        <div className="custom-control custom-switch mt-2">
          <input type="checkbox" className="custom-control-input" id="displayInShowroomToggle" />
          <label className="custom-control-label" htmlFor="displayInShowroomToggle">display in showroom</label>
        </div>
        <div className="custom-control custom-switch mt-2">
          <input type="checkbox" className="custom-control-input" id="showChartToggle"
            checked={this.state.showChart}
            onChange={this.handleShowChartChange} />
          <label className="custom-control-label" htmlFor="showChartToggle">show chart</label>
        </div>
        <hr />
        <div className="row mt-4">
          <div className="col-xl-8">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">REFRESH</span>
              </div>
              <select className="form-control"
                value={this.state.refreshInterval}
                onChange={this.handleIntervalChange}>
                <option value="req">only on request</option>
                <option value="60000">every minute</option>
                <option value="300000">every 5 minutes</option>
                <option value="600000">every 10 minutes</option>
                <option value="900000">every 15 minutes</option>
              </select>
            </div>
          </div>
          <div className="col-xl-4 mt-4 mt-xl-0">
            <button type="button" className="btn btn-dark btn-block"
              onClick={this.props.refreshStat}>
              <Octicon icon={CloudDownload} size="small" />
            </button>
          </div>
        </div>
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  background-color: #fafafa;

  @media(min-width: 1200px) {
    height: 18rem;
  }
`;

Settings.propTypes = {
  statId: PropTypes.string.isRequired,
  statUrl: PropTypes.string.isRequired,
  showChart: PropTypes.bool.isRequired,
  refreshStat: PropTypes.func.isRequired,
  setWithChart: PropTypes.func.isRequired
}

export default Settings;