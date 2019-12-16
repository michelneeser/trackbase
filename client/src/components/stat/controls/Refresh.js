import React from 'react';
import Octicon, { CloudDownload } from '@primer/octicons-react';

class Refresh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <form className="form mt-4">
          <div className="row">
            <div className="col-10">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">REFRESH INTERVAL</span>
                </div>
                <select className="form-control">
                  <option>on request</option>
                  <option>every minute</option>
                  <option>every 5 minutes</option>
                  <option>every 15 minutes</option>
                  <option>every 30 minutes</option>
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

export default Refresh;