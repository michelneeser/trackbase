import React from 'react';
import axios from 'axios';
import config from 'react-global-configuration';

import Title from '../common/Title';
import Subtitle from '../common/Subtitle';
import StatCard from '../common/stat-card/StatCard';

class Showroom extends React.Component {
  loading = true;

  constructor(props) {
    super(props);
    this.state = {
      stats: null
    }
  }

  componentDidMount = async () => {
    const stats = (await axios.get(`${config.get('apiBaseUrl')}/stats`)).data;
    this.loading = false;
    this.setState({ stats });
  }

  render() {
    let content;
    if (this.loading) {
      content = (
        <div className="text-center mt-5">
          <div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      const statsToShow = this.state.stats
        .filter(stat => stat.showroom)
        .map(stat => (
          <StatCard
            key={stat.statId}
            stat={stat} />
        ));

      content = (
        <div>
          <Title text="Showroom" />
          <Subtitle text="See what others are tracking" />
          <div className="row">
            {statsToShow}
          </div>
        </div>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default Showroom;