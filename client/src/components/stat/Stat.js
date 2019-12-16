import React from 'react';
import axios from 'axios';

import Title from '../common/Title';
import Subtitle from '../common/Subtitle';
import Info from './info/Info';
import Controls from './controls/Controls';
import Chart from './values/Chart';
import ValueList from './values/ValueList';
import Notification from './Notification';

class Stat extends React.Component {
  loading = true;

  constructor(props) {
    super(props);
    this.state = {
      stat: {},
      refresh: false,
      updatedValues: -1
    }
  }

  componentDidMount = async () => {
    this.loadStatData(false);
  }

  componentDidUpdate = (prevProps) => {
    if (this.state.refresh || (prevProps.match.params.statId !== this.props.match.params.statId)) {
      this.loadStatData(this.state.refresh);
    }
  }

  loadStatData = (isRefresh) => {
    const statId = this.props.match.params.statId;
    axios.get(`/api/stats/${statId}`)
      .then(res => {
        const stat = res.data;
        this.loading = false; // TODO better solution with async/await?
        this.setState(state => ({
          stat,
          refresh: false,
          updatedValues: (isRefresh ? stat.values.length - state.stat.values.length : -1)
        }));
      })
      .catch(err => {
        // TODO redirect to 404
        console.error(err);
        this.setState({ refresh: false });
      });
  }

  refresh = () => {
    this.setState({ refresh: true });
  }

  addValue = (value) => {
    const stat = this.state.stat;
    this.setState(state => (
      { stat: { ...state.stat, values: [value, ...stat.values] } }
    ));
  }

  setName = (name) => {
    this.setState(state => (
      { stat: { ...state.stat, name } }
    ));
  }

  render() {
    // update hint
    let updateHintText = '';
    if (this.state.updatedValues > -1) {
      const nrOfUpdates = this.state.updatedValues;
      updateHintText = (nrOfUpdates > 0 ? `${nrOfUpdates} new value${nrOfUpdates > 1 ? 's' : ''} added` : 'No updates available');
    }

    let content;
    if (this.loading) {
      content = (
        <div className="text-center mt-5">
          <div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    else {
      const stat = this.state.stat;
      content = (
        <div>
          <Title text={stat.name ? stat.name : 'Your stat'} />
          <Subtitle text="This is your very own stats page - enjoy!" />
          <Info
            statId={stat.statId}
            statName={stat.name}
            setName={this.setName}
            statCreated={stat.created} />

          <Controls
            statId={stat.statId}
            refreshStat={this.refresh}
            addValue={this.addValue} />

          <hr className="my-5" />
          <Chart values={stat.values} />

          <hr className="my-5" />
          <ValueList values={stat.values} />

          <div className="row mt-5">
            <div className="col">
              <button type="button" className="btn btn-danger btn-block">delete stat</button>
            </div>
          </div>

          <Notification text={updateHintText} onDismiss={() => this.setState({ updatedValues: -1 })} />
        </div >
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default Stat;