import React from 'react';
import axios from 'axios';
import config from 'react-global-configuration';

import Title from '../common/Title';
import Subtitle from '../common/Subtitle';

class Showroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: null
    }
  }

  componentDidMount = async () => {
    const stats = (await axios.get(config.get('apiBaseUrl'))).data;
    this.setState({ stats });
  }

  render() {
    let statsToShow;
    if (this.state.stats) {
      statsToShow = this.state.stats.map(stat => (
        <div key={stat.statId} className="col-xl-4 mt-5">
          <div key={stat.statId} className="card shadow">
            <div className="card-header">{stat.name || stat.statId}</div>
            <div className="card-body">
              <div className="card-text">Created: {stat.created}</div>
              <a href={stat.uiUrl} target="_blank" rel="noopener noreferrer"
                className="btn btn-outline-dark btn-sm mt-3">Go to stat</a>
            </div>
          </div>
        </div>
      ));
    }

    return (
      <div>
        <Title text="Showroom" />
        <Subtitle text="See what others are tracking" />
        <div className="row">
          {statsToShow}
        </div>
      </div>
    );
  }
}

export default Showroom;