import React from 'react';
import axios from 'axios';
import config from 'react-global-configuration';

import Title from '../common/Title';
import Subtitle from '../common/Subtitle';
import Info from './info/Info';
import Controls from './controls/Controls';
import Chart from './values/charts/Chart';
import ValueList from './values/ValueList';
import Delete from './controls/Delete';
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

  loadStatData = async (isRefresh) => {
    try {
      const statId = this.props.match.params.statId;
      const stat = (await axios.get(`${config.get('apiBaseUrl')}/${statId}`)).data;
      stat.values = (await axios.get(stat.valuesUrl)).data;
      this.loading = false;
      this.setState(state => ({
        stat,
        refresh: false,
        updatedValues: (isRefresh ? stat.values.data.length - state.stat.values.data.length : -1)
      }));
    } catch (error) {
      console.error(error);
      this.setState({ refresh: false });
    }
  }

  refresh = () => {
    this.setState({ refresh: true });
  }

  setValues = (values) => {
    this.setState(state => {
      const stat = state.stat;
      return {
        stat: { ...stat, values }
      }
    });
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
            statUrl={stat.url}
            uiUrl={stat.uiUrl}
            statName={stat.name}
            setName={this.setName}
            statCreated={stat.created} />

          <Controls
            statId={stat.statId}
            valuesUrl={stat.valuesUrl}
            refreshStat={this.refresh}
            setValues={this.setValues} />

          <Chart
            values={stat.values.data}
            numeric={stat.values.numeric} />

          <hr className="my-5" />
          <ValueList
            valuesUrl={stat.valuesUrl}
            values={stat.values.data}
            setValues={this.setValues} />

          <Delete statUrl={stat.url} />

          <Notification text={updateHintText} onDismiss={() => this.setState({ updatedValues: -1 })} />
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

export default Stat;