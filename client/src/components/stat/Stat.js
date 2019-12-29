import React from 'react';
import axios from 'axios';
import config from 'react-global-configuration';

import Title from '../common/Title';
import Subtitle from '../common/Subtitle';
import About from './about/About';
import Settings from './settings/Settings';
import AddValue from './add-value/AddValue';
import Chart from './values/chart/Chart';
import Values from './values/Values';
import Delete from './delete/Delete';
import Notification from '../common/Notification';

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

  setDescription = (description) => {
    this.setState(state => (
      { stat: { ...state.stat, description } }
    ));
  }

  setWithChart = (withChart) => {
    this.setState(state => (
      { stat: { ...state.stat, withChart } }
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

          <hr className="my-5" />
          <div className="row">
            <div className="col-xl-6">
              <About
                statId={stat.statId}
                statUrl={stat.url}
                uiUrl={stat.uiUrl}
                statName={stat.name}
                setName={this.setName}
                statDescription={stat.description}
                setDescription={this.setDescription}
                statCreated={stat.created} />
            </div>
            <div className="col-xl-6">
              <Settings
                statId={stat.statId}
                statUrl={stat.url}
                showChart={stat.withChart}
                refreshStat={this.refresh}
                setWithChart={this.setWithChart} />
            </div>
          </div>

          <hr className="my-5" />
          <AddValue
            statId={stat.statId}
            valuesUrl={stat.valuesUrl}
            setValues={this.setValues} />

          {stat.withChart ? (
            <div>
              <hr className="my-5" />
              <Chart
                values={stat.values.data}
                numeric={stat.values.numeric} />
            </div>
          ) : ''}

          <hr className="my-5" />
          <Values
            valuesUrl={stat.valuesUrl}
            values={stat.values.data}
            setValues={this.setValues} />

          <hr className="my-5" />
          <div className="mt-5">
            <Delete statUrl={stat.url} />
          </div>

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