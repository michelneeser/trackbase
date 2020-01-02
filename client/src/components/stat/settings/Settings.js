import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Octicon, { CloudDownload } from '@primer/octicons-react';

class Settings extends React.Component {
  intervalId = 0;

  constructor(props) {
    super(props);
    this.state = {
      public: props.public,
      chart: props.chart,
      showroom: props.showroom,
      refreshInterval: 'req'
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.statId !== this.props.statId) {
      this.intervalId = 0;
      this.setState({
        public: this.props.public,
        chart: this.props.chart,
        showroom: this.props.showroom,
        refreshInterval: 'req'
      });
    }
  }

  handleInputChange = async (event) => {
    const fieldName = event.target.id;

    try {
      const stat = (await axios.put(this.props.statUrl, { [fieldName]: event.target.checked })).data;
      this.props.setStatProperty(fieldName, stat[fieldName]);
      this.setState({ [fieldName]: stat[fieldName] });
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

        {/* show chart */}
        <OverlayTrigger
          placement="right"
          overlay={props => (
            <Tooltip {...props} show={props.show.toString()}>enables or disables the chart displayed below</Tooltip>)}>
          <div className="custom-control custom-switch mt-4">
            <input type="checkbox" className="custom-control-input" id="chart"
              checked={this.state.chart}
              onChange={this.handleInputChange} />
            <label className="custom-control-label" htmlFor="chart">show chart</label>
          </div>
        </OverlayTrigger>

        {/* publicly accessible */}
        <OverlayTrigger
          placement="right"
          overlay={props => (
            <Tooltip {...props} show={props.show.toString()}>if active, anyone is allowed to access this stat if the exact URL is known</Tooltip>)}>
          <div className="custom-control custom-switch mt-2">
            <input type="checkbox" className="custom-control-input" id="public"
              checked={this.state.public}
              onChange={this.handleInputChange} />
            <label className="custom-control-label" htmlFor="public">publicly accessible</label>
          </div>
        </OverlayTrigger>

        {/* display in showroom */}
        <OverlayTrigger
          placement="right"
          overlay={props => (
            <Tooltip {...props} show={props.show.toString()}>if active, this stat will be publicly displayed in the showroom</Tooltip>)}>
          <div className="custom-control custom-switch mt-2">
            <input type="checkbox" className="custom-control-input" id="showroom"
              checked={this.state.showroom}
              onChange={this.handleInputChange} />
            <label className="custom-control-label" htmlFor="showroom">display in showroom</label>
          </div>
        </OverlayTrigger>

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
      </StyledWrapper >
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
  public: PropTypes.bool.isRequired,
  chart: PropTypes.bool.isRequired,
  showroom: PropTypes.bool.isRequired,
  setStatProperty: PropTypes.func.isRequired,
  refreshStat: PropTypes.func.isRequired,
}

export default Settings;