import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import StatCard from '../../common/stat-card/StatCard';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: null
    }
  }

  componentDidMount = async () => {
    this.loadStatsData(this.state.refresh);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.collectionId !== this.props.collectionId) {
      this.loadStatsData(this.state.refresh);
    }
  }

  loadStatsData = async () => {
    // TODO add loading symbol
    const originStats = await Promise.all(
      this.props.stats.map(async stat => {
        return (await axios.get(stat.originUrl)).data;
      }));

    this.setState({ stats: originStats });
  }

  render() {
    const stats = this.state.stats;
    let statsToShow;
    if (stats) {
      statsToShow = stats.map(stat => (
        <StatCard
          key={stat.statId}
          stat={stat} />
      ));
    }

    return (
      <div className="row">
        {statsToShow}
      </div>
    );
  }
}

Stats.propTypes = {
  collectionId: PropTypes.string.isRequired,
  stats: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
}

export default Stats;